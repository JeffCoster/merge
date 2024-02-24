/* Merger
 *
 * Copyright (c) 20024 Jeff Coster
 * Licensed under the Apache-2.0 licence.
 * see https://github.com/JeffCoster/merger
 * 
 * Class for Attribute mapping objects
 * 
 **/

import {jsonPath} from "./jsonpath.js"
import { ExtFunctions } from "./merger-extensions.js";
import { Property, Type} from '@dipscope/type-manager';
//import * as tm from '@dipscope/type-manager';
//const {Type, Property} = tm;

@Type()
export class AttributeMapping
{
   // Identifying Name of the target attribute, for parent element
    @Property(String) public tgtAttrName: string; 
    // jsonPath to content to use to fill the target attribute value. Relative to the source content object in context, unless $ prepended for 'root'
    @Property(String) public srcJpath: string;
    // where required, defined name used to select corresponding formatting function to use on this attribute fill       
    @Property(String) public functionSel?: string;

    public constructor(tgtAttrName: string, srcJpath: string, functionSel?: string) {
        this.tgtAttrName = tgtAttrName;
        this.srcJpath = srcJpath;
        if (functionSel !== undefined) this.functionSel = functionSel;
        return;
    }

    public fillAttribute(tgtElement: Element, srcContentObj: object, extFunctions: ExtFunctions) {

        var srcVal: any;
        const oldContent: string = tgtElement.getAttribute(this.tgtAttrName);
     
        if (this.srcJpath !== null && 0 < this.srcJpath.length) {
           // use jpath target value from srcObj
           srcVal = jsonPath(srcContentObj, this.srcJpath, null)[0];
        } else {
           //where jpath null or empty use all of the src object to fill attribute text value
           srcVal = srcContentObj;
        }
        if (srcVal === undefined || srcVal === null) {
           if (debug) {
              console.info("attributeFill: src value not found for srcJpath: " +this.srcJpath
                                 +" and element: " +tgtElement.tagName
                                 +" for attribute: " +this.tgtAttrName
                                 +" and srcObject:" +srcContentObj);
           }
           return;
        } else if (this.functionSel !== undefined && this.functionSel !== null
              && 0 < this.functionSel.length) {
           // do function to format src value 
           tgtElement.setAttribute(this.tgtAttrName, (extFunctions.doFunction(this.functionSel, srcVal, oldContent)));
        } else {
           tgtElement.setAttribute(this.tgtAttrName, srcVal);
        }
        if (debug) {
           console.info("Filled Attribute[" +this.tgtAttrName 
                             +"]\n\t for element[" +tgtElement.tagName +" " +tgtElement.id
                             +"]\n\t with new content[" +tgtElement.getAttribute(this.tgtAttrName)
                             +"]\n\t using source value[" +srcVal
                             +"]\n\t where originalContent was[" +oldContent
                             +"]\n\t using transform function[" +this.functionSel +"]");
        }
     }
}
