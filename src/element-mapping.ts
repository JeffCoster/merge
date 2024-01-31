/* Merger
 *
 * Copyright (c) 20024 Jeff Coster
 * Licensed under the Apache-2.0 licence.
 * see https://github.com/JeffCoster/merger
 * 
 * Class for Element mapping objects
 * 
 **/

import {jsonPath} from "./jsonpath.js"
import {extFunctions} from "./merger-extensions.js"
import {Type, Property} from '@dipscope/type-manager';
import { AttributeMapping } from "./attribute-mapping.js";

@Type()
export class ElementMapping
{
   // css to the target element
   @Property(String) public elementTgtCss: string;
   // jsonPath to content to use to fill the target element. Relative to the content source object in context, unless #prepended
   @Property(String) public elementValueSrcJpath: string;
   // optional, defined name used to select the registered data formatting function to use on this element fill   
   @Property(String) public functionSel: string;    
   // optional, attribute mappings for this element
   @Property(Array, [AttributeMapping]) public itsAttributes: Array<AttributeMapping>;

    
    public constructor(elementTgtCss: string, elementValueSrcJpath: string, functionSel?: string) {
        this.elementTgtCss = elementTgtCss;
        this.elementValueSrcJpath = elementValueSrcJpath;
        this.functionSel = functionSel;
        //this.itsAttributes = new Array<AttributeMapping>;

        return;
    }

    addAttributeMapping(attrMapping: AttributeMapping): Array<AttributeMapping> {
      if (this.itsAttributes == undefined) {
         this.itsAttributes = new Array<AttributeMapping>;
      }
      this.itsAttributes.push(attrMapping);
      return this.itsAttributes;
    }

    removeAttributeMappingAt(index: number): Array<AttributeMapping> {
      if (index <= (this.itsAttributes.length -1)) {
         this.itsAttributes.splice(index, 1);
         if (this.itsAttributes.length == 0) {
            this.itsAttributes = undefined;
         }
      }
      return this.itsAttributes;
    }

    fillElement(tgtElement: Element, srcContentObj: object) {

      var srcVal: any;
      var newContent: any;
      const oldContent = tgtElement.innerHTML;
   
      if (this.elementValueSrcJpath !== null && 0 < this.elementValueSrcJpath.length) {
         // use jpath target value from srcObj
         srcVal = jsonPath(this.elementValueSrcJpath, this.elementValueSrcJpath, null)[0];
      } else {
         //where jpath null or empty use all of the src object to fill attribute text value
         srcVal = srcContentObj;
      }
      if (srcVal === undefined || srcVal === null) {
         if (debug) {
            console.info("elementFill: src value not found for srcJpath: " +this.elementValueSrcJpath
                               +" and element:" +tgtElement.tagName
                               +" and srcObject:" +srcContentObj);
         }
         return;
      } else if (this.functionSel !== undefined && this.functionSel !== null
            && 0 < this.functionSel.length) {
            // do function to format src value
            tgtElement.innerHTML = extFunctions.doFunction(this.functionSel, srcVal, oldContent);
      } else {
         tgtElement.innerHTML = srcVal;
      }
      if (debug) {
         console.info("Filled Element[" +tgtElement.tagName +" " +tgtElement.id
                           +"]\n\t with new content[" +tgtElement.innerHTML
                           +"]\n\t using source value[" +srcVal
                           +"]\n\t where originalContent was[" +oldContent
                           +"]\n\t using transform function[" +this.functionSel +"]") ;
      }
   }
}


