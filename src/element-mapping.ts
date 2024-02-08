/* Merger
 *
 * Copyright (c) 20024 Jeff Coster
 * Licensed under the Apache-2.0 licence.
 * see https://github.com/JeffCoster/merger
 * 
 * Class for Element mapping objects, each object maps one html element to its content, 
 * and optionally maps any number of itsAttributes
 * 
 **/

import { jsonPath } from "./jsonpath.js"
import { extFunctions } from "./merger-extensions.js"
import { Type, Property } from '@dipscope/type-manager';
import { AttributeMapping } from "./attribute-mapping.js";
import { error } from "console";

@Type()
export class ElementMapping
{
   // css to the target element
   @Property(String) public elementTgtCss: string;

   // jsonPath to content to use to fill the target element. Relative to the content source object in context, unless $ (root) prepended
   // if not defined or null the whole src object is used for the fill content
   @Property(String) public elementValueSrcJpath?: string;

   // optional, defined name used to select the registered data formatting function to use on this element fill   
   @Property(String) public functionSel?: string;
       
   // optional, attribute mappings for this element
   @Property(Array, [AttributeMapping]) public itsAttributes?: Array<AttributeMapping>;

    
    public constructor(elementTgtCss: string, elementValueSrcJpath?: string, functionSel?: string, itsAttributes?: [AttributeMapping]) {
        this.elementTgtCss = elementTgtCss;
        this.elementValueSrcJpath = elementValueSrcJpath;
        if (functionSel !== undefined) this.functionSel = functionSel;
        if (itsAttributes !== undefined) this.itsAttributes = new Array<AttributeMapping>;
        return;
    }

    addAttributeMapping(attrMapping: AttributeMapping): Array<AttributeMapping> {
      if (this.itsAttributes === undefined) {
         this.itsAttributes = new Array<AttributeMapping>;
      }
      this.itsAttributes.push(attrMapping);
      return this.itsAttributes;
    }

    removeAttributeMappingAt(index: number): Array<AttributeMapping> {
      if (index <= (this.itsAttributes.length -1)) {
         this.itsAttributes.splice(index, 1);
         if (this.itsAttributes.length == 0) {
            delete this.itsAttributes;
         }
      }
      return this.itsAttributes;
    }

   fillAttributes(tgtElement: Element, dataSrc: any) {
   
      if (this.itsAttributes !== undefined) {

         this.itsAttributes.forEach(function (attrMap) {
               attrMap.fillAttribute(tgtElement, dataSrc);
         })
      }
   }

   fillElementValue(tgtElement: Element, srcContentObj: object) {

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

   fillElementValueInTargetBlock(tgtBlock: Element, srcContent: object) {
      // tgtBlock can be Document OR target instance html block OR a section of html
      // the css mapping of this object finds the target element to fill
      // TODO heck out scoping and use with document
      try {
         const tgtElement = tgtBlock.querySelector(this.elementTgtCss);
         if (tgtElement !== undefined && tgtElement !== null) {
            this.fillElementValue(tgtElement, srcContent);
         } else if (debug) {
            console.error("elementFill error: target element not found for CSS: "
                                    + this.elementTgtCss);
         }
      } catch (err) {
         // invalid css
         if (debug) console.error(err);
      }

   }

}



