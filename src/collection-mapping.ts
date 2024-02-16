/* Merger
 *
 * Copyright (c) 20024 Jeff Coster
 * Licensed under the Apache-2.0 licence.
 * see https://github.com/JeffCoster/merger
 * 
 * Class for Collection mapping objects
 * 
 **/

import { jsonPath } from "./jsonpath.js"
import { extFunctions } from "./merger-extensions.js"
import { Type, Property } from '@dipscope/type-manager';
import { InstanceMapping } from "./instance-mapping.js";

class Bounds {
    start: number;
    qty: number;
}

@Type()
export class CollectionMapping {
    // json path to content source object used to instantiate and fill collection
    @Property(String) public dataSrcJpath: string;
    // json path relative to src instance of the id value to use for each instance id
    @Property(String) public srcIdPath?: string;
    // json path to optional variable used as start index point into content collection, zero is first
    @Property(String) public startDataSrcJpath?: string;
    // json path to optional variable used as max number of instances to create and fill
    @Property(String) public maxToShowDataSrcJpath?: string;
    // id of the html section template for this collection
    @Property(String) public templateId?: string;
    // class list of template to use instead of id. Use this instead of id for child collections, to ensure unique IDs
    @Property(String) public templateClassList?: string;
    // optional function selector to insert required content before the template, when data source collection is empty
    @Property(String) public mtCollectionSel?: string

    // mapping for each instantiated object of collection
    @Property(InstanceMapping) public instanceMapping: InstanceMapping;

    public constructor(dataSrcJpath: string, instanceMapping: InstanceMapping, srcIdPath?: string, templateId?: string, templateClassList?: string,
        functionSel?: string, startDataSrcJpath?: string, maxToShowDataSrcJpath?: string, mtCollectionSel?: string) {

        this.dataSrcJpath = dataSrcJpath;
        this.instanceMapping = instanceMapping;

        if (srcIdPath !== undefined) this.srcIdPath = srcIdPath;

        if (templateId !== undefined) this.templateId = templateId;
        if (templateClassList !== undefined) this.templateClassList = templateClassList;

        if (startDataSrcJpath !== undefined) this.startDataSrcJpath = startDataSrcJpath;
        if (maxToShowDataSrcJpath !== undefined) this.maxToShowDataSrcJpath = maxToShowDataSrcJpath;

        if (mtCollectionSel !== undefined) this.mtCollectionSel = mtCollectionSel;

        return;
    }

    private getTemplate(doc: Document, parentElement?: Element): Element {

        var msg: string;
        var template: Element;

        if (this.templateId !== undefined && this.templateId !== null && 0 < this.templateId.length) {
            template = doc.getElementById(this.templateId);
            msg = "for ID: " + this.templateId;
        } else if (this.templateClassList !== undefined && this.templateClassList !== null && 0 < this.templateClassList.length) {
            msg = "for Class List: " + this.templateClassList;

            if (parentElement !== undefined) {
                const matchList: HTMLCollection = parentElement.getElementsByClassName(this.templateClassList);
                if (matchList !== undefined) {
                    if (1 === matchList.length) {
                        template = matchList[0];
                    } else {
                        msg = "As Class List: " + this.templateClassList + "matched " + matchList.length + " templates";
                    }
                }
            } else {
                msg = "As No Parent Element defined for Class List:" + this.templateClassList;
            }
        }
        if (debug) {
            if (template === undefined) {
                console.error("No template found: " + msg);
            } else {
                console.info("Processing html template:" + msg);
            }
        }
        return template;
    }

    private getIdForInstance(instanceHtml: Element, instanceSrc: object, parentId?: string): string {

        var dataSrcId: string = instanceSrc.toString(); // default to using instance content as the instance Id

        if (this.srcIdPath !== undefined && this.srcIdPath !== null && 0 < this.srcIdPath.length) {
            //set cloned instance id, to be concat of parentId_classname_srcobjectID
            dataSrcId = jsonPath(instanceSrc, this.srcIdPath, null)[0];
            if (dataSrcId === undefined || dataSrcId === null) {
                dataSrcId = ""; // set to safe value of empty string
                if (debug) {
                    console.warn("no ID  found for jsonpath:" + this.srcIdPath + " in instance:" + instanceSrc);
                }
            }
        }

        const mainClass = instanceHtml.classList[0];
        dataSrcId = mainClass.concat("_" + dataSrcId);
        if (parentId !== undefined && parentId !== null && 0 < parentId.length) {
            dataSrcId = parentId + "_" + dataSrcId;
        }

        if (debug) {
            console.info("ID to use for instance is:" +dataSrcId + " where parent ID is:" +parentId);
        }

        return dataSrcId;
    }
     
    private removeTemplateClassFromInstance(instanceHtml: Element) {
        var classStr = instanceHtml.className;
        classStr = classStr.replace("template", "");
        classStr = classStr.trim();
        instanceHtml.className = classStr;
        return instanceHtml;
    }

    private calcStartEndIndices(dataSources: object, srcCollection:object[]): Bounds {
        // set requested start and end index to be used to process srcCollection
        var bounds = new Bounds ();

        bounds.start = 0;
        if (this.startDataSrcJpath !== undefined && this.startDataSrcJpath !== null && 0 < this.startDataSrcJpath.length) {
            bounds.start = jsonPath(dataSources, this.startDataSrcJpath, null)[0];
            if (bounds.start !== undefined && bounds.start !== null) {
                if (bounds.start >= srcCollection.length) {
                    bounds.start = 0;
                }
            } else if (debug) {
                console.error("start index variable not found or not a number for jsonpath: " + jsonPath
                    + " and collection: " + this.dataSrcJpath);
            }
        }
        bounds.qty = srcCollection.length;
        if (this.maxToShowDataSrcJpath !== undefined && this.maxToShowDataSrcJpath !== null && 0 < this.maxToShowDataSrcJpath.length) {
            bounds.qty = jsonPath(dataSources, this.maxToShowDataSrcJpath, null)[0];
            if (bounds.qty !== undefined && bounds.qty !== null) {
                bounds.qty = bounds.start + bounds.qty;
                if (bounds.qty > srcCollection.length) {
                    bounds.qty = srcCollection.length;
                }
            } else if (debug) {
                console.error("end index variable not found or not a number for jsonpath: " + jsonPath
                    + " and collection: " + this.dataSrcJpath);
            }
        }
        return bounds
    }

    public instantiateAndFill(doc: Document, dataSources: object, instanceDataSrc: object[], parentElement ?: Element) {

    const template: Element = this.getTemplate(doc, parentElement);

    if (template === undefined || template === null) return;

    // handle empty source collection with optional registered function
    if (instanceDataSrc === undefined || instanceDataSrc === null || 1 > instanceDataSrc.length) {
        if (this.mtCollectionSel !== undefined && this.mtCollectionSel !== null) {
            // handle case of empty data src collection, default is to do nothing which could be valid
            // function can return content to place before the template
            extFunctions.doFunction(this.mtCollectionSel, instanceDataSrc, template.innerHTML);
        }
        return;
    }

    // modify collection start and end index, if vars specified in mapping
    const bounds: Bounds = this.calcStartEndIndices(dataSources, instanceDataSrc);

    // create clone instances and fill them
    for (var i = bounds.start; i < bounds.qty; i = i + 1) {

        //each instantiation of template
        var templateClone: Node = template.cloneNode(true);
        var templateCloneElement: Element = templateClone as Element;

        // set Id for html instance
        const instanceId: string = this.getIdForInstance(templateCloneElement, instanceDataSrc[i], parentElement.id);
    
        templateCloneElement.id  = instanceId;

        // remove template class from html instance
        templateCloneElement = this.removeTemplateClassFromInstance(templateCloneElement);

        this.instanceMapping.fillChildElements(parentElement, instanceDataSrc[i], extFunctions);

        this.instanceMapping.fillChildCollections(doc, dataSources, instanceDataSrc[i], extFunctions, parentElement );

        template.parentNode.insertBefore(templateCloneElement, template);
    }

}
}