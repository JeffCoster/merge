/* Merger
 *
 * Copyright (c) 20024 Jeff Coster
 * Licensed under the Apache-2.0 licence.
 * see https://github.com/JeffCoster/merger
 * 
 * Class for mapping an Instance of a Collection
 * 
 **/

// import { Type, Property } from '@dipscope/type-manager';
import { ElementMapping } from "./element-mapping.js";
import { CollectionMapping } from "./collection-mapping.js";
import { ExtFunctions } from "./merger-extensions.js"
import * as tm from '@dipscope/type-manager';
const {Type, Property} = tm;

@Type()
export class InstanceMapping {
    // json path relative to src instance of the id value to use for each instance id
    @Property(String) public srcIdPath?: string;
    // optional: elements to map for each instance 
    @Property(ElementMapping) public elementMappings?: Array<ElementMapping>;
    // optional: child collections to map for each instance 
    @Property(Array, [CollectionMapping]) public collectionMappings?: Array<CollectionMapping>;

    public constructor(srcIdPath?: string, elementMappings?: Array<ElementMapping>, collectionMappings?: Array<CollectionMapping>) {

        if (srcIdPath !== undefined) this.srcIdPath = srcIdPath;
        if (elementMappings !== undefined) this.elementMappings = elementMappings;
        if (collectionMappings !== undefined) this.collectionMappings = collectionMappings;

        return;
    }

    addElementMapping(elementMapping: ElementMapping): Array<ElementMapping> {
        if (this.elementMappings == undefined) {
            this.elementMappings = new Array<ElementMapping>;
        }
        this.elementMappings.push(elementMapping);
        return this.elementMappings;
    }

    removeElementMappingAt(index: number): Array<ElementMapping> {
        if (index <= (this.elementMappings.length - 1)) {
            this.elementMappings.splice(index, 1);
            if (this.elementMappings.length === 0) {
                delete this.elementMappings;
            }
        }
        return this.elementMappings;
    }

    addCollectionMapping(collectionMapping: CollectionMapping): Array<CollectionMapping> {
        if (this.collectionMappings == undefined) {
            this.collectionMappings = new Array<CollectionMapping>;
        }
        this.collectionMappings.push(collectionMapping);
        return this.collectionMappings;
    }

    removeCollectionMappingAt(index: number): Array<CollectionMapping> {
        if (index <= (this.elementMappings.length - 1)) {
            this.collectionMappings.splice(index, 1);
            if (this.collectionMappings.length == 0) {
                delete this.collectionMappings;
            }
        }
        return this.collectionMappings;
    }

    fillChildElements(tgtBlock: Element, srcObj: any, extFunctions: ExtFunctions) {

        if (this.elementMappings !== undefined && this.elementMappings !== null) {
            this.elementMappings.forEach(function (elementMap) {
                elementMap.fillElementInTargetBlock(tgtBlock, srcObj, extFunctions );
            })
        } else if (debug) {
                console.info("No element mappings for instance: " + this.srcIdPath);
        }
    }

    fillChildCollections (doc: Document, dataSources: object, srcObj: any, extFunctions: ExtFunctions, parentElement?: Element) {
        if (this.collectionMappings !== undefined && this.collectionMappings !== null) {
            this.collectionMappings.forEach(function (collectionMap) {
                collectionMap.instantiateAndFill(doc, dataSources, srcObj, parentElement );
            })
        } else if (debug) {
                console.info("No child collection mappings for instance: " + this.srcIdPath);
        }
    }

}