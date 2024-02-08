/* Merger
 *
 * Copyright (c) 20024 Jeff Coster
 * Licensed under the Apache-2.0 licence.
 * see https://github.com/JeffCoster/merger
 * 
 * Class for mapping an Instance of a Collection
 * 
 **/

import {Type, Property} from '@dipscope/type-manager';
import { ElementMapping } from "./element-mapping.js";
import { CollectionMapping } from "./collection-mapping.js";

@Type()
export class InstanceMapping
{
    // json path relative to src instance of the id value to use for each instance id
    @Property(String) public srcIdPath?: string;
    // optional: elements to map for each instance 
    @Property(ElementMapping) public elementMappings?: Array<ElementMapping>;
    // optional: child collections to map for each instance 
    @Property(Array, [CollectionMapping]) public collectionMappings?: Array<CollectionMapping>;

    public constructor(srcIdPath?: string, elementMappings?: Array<ElementMapping>, collectionMappings?: Array<CollectionMapping> ) {
    
        this.srcIdPath = srcIdPath;
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
        if (index <= (this.elementMappings.length -1)) {
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
          if (index <= (this.elementMappings.length -1)) {
             this.collectionMappings.splice(index, 1);
             if (this.collectionMappings.length == 0) {
                delete this.collectionMappings;
             }
          }
          return this.collectionMappings;
        }

        fillElements(src2targetMap, tgtBlock, elementFillArr, dataSources, srcObj) {

            if (this.elementMappings !== undefined && this.elementMappings !== null) {
                this.elementMappings.forEach(function(elementMap) {
                    elementMap.fillElementValue()
                })
            }
            for (var n = 0; n < elementFillArr.length; n = n + 1) {
               const elementFillDirs = elementFillArr[n];
               var dataSrc = srcObj;
         
               if (srcObj === undefined || srcObj === null) {
                  const dataSrcJpath = elementFillDirs.dataSrcJpath;
                  dataSrc = jsonPath(dataSources, dataSrcJpath, null)[0];
               }
         
               const elementsToDo = elementFillDirs.elementsToDo;
               if (elementsToDo !== undefined && elementsToDo !== null && 0 < elementsToDo.length) {
                  for (var i = 0; i < elementsToDo.length; i = i + 1) {
         
                     const tgtElement = tgtBlock.querySelector(elementsToDo[i].elementTgtCss);
                     if (debug) {
                        if (tgtElement === undefined || tgtElement === null) {
                           dbgConsole.error("elementFill error: target element not found for CSS: "
                                             + elementsToDo[i].elementTgtCss);
                        }
                     }
                     const elementValueSrcJpath = elementsToDo[i].elementValueSrcJpath;
                     if (elementValueSrcJpath !== undefined) {
         
                        // element text value needs to be filled
                        elementFill(tgtElement,
                           dataSrc, elementValueSrcJpath, elementsToDo[i].functionSel);
                     }
         
                     // for element being filled, fill required attributes
                     attributeFills(tgtElement, elementsToDo[i].itsAttributes, dataSrc);
                  }
               } else if (debug) {
                  dbgConsole.info("No element source to target Defs for: " + elementFillArr[n].dataSrcJpath);
               }
            }
         
         }
  
}