/*global
 debug
*/
/* Merge
 *
 * Copyright (c) 20023 Jeff Coster
 * Licensed under the MIT (MIT-LICENSE.txt) licence.
 */

import {jsonPath} from "./jsonpath.js"

import {extFunctions} from "./merger-extensions.js"

export var dbgConsole = {
   info : function (str) {
      "use strict";
      // eslint-disable-next-line no-console
      console.info(str);
   },
   warn : function (str) {
      "use strict";
      // eslint-disable-next-line no-console
      console.warn(str);
   },
   error : function (str) {
      "use strict";
      // eslint-disable-next-line no-console
      console.error(str);
   }
}


function calcStartEndIndices(dataSources, collectionMap, srcCollection) {
// set requested start and end index to be used to process srcCollection
   var start, end;

   var path = collectionMap.startDataSrcJpath;
   start = 0;
   if (path !== undefined && path !== null && 0 < path.length) {
      start = jsonPath(dataSources, path, null)[0];
      if (start !== undefined && start !== null && !start.isNan) {
         if (start >= srcCollection.length) {
            start = 0;
         }
      }
   }
   path = collectionMap.maxToShowDataSrcJpath;
   end = srcCollection.length;
   if (path !== undefined && path !== null && 0 < path.length) {
      end = jsonPath(dataSources, path, null)[0];
      if (end !== undefined && end !== null && !end.isNan) {
         end = start + end;
         if (end > srcCollection.length) {
            end = srcCollection.length;
         }
      }
   }

   return {start,end}
}

function elementFill(tgtElement, srcObj, srcJpath, functSelector) {
   "use strict";
   var srcVal;

   srcVal = srcObj;

   if (srcJpath !== null && 0 < srcJpath.length) {

      //where jpath null or empty use all of the src object to fill element text value
      srcVal = jsonPath(srcObj, srcJpath, null)[0];
   }
   if (srcVal === undefined || srcVal === null) {
      if (debug) {dbgConsole.info("elementFill: src value not found"); }
   } else if (functSelector !== undefined && functSelector !== null
         && 0 < functSelector.length) {
      // do function to format src value
      tgtElement.innerHTML = extFunctions.doFunction(functSelector, srcVal, tgtElement.innerHTML);
   } else {
      tgtElement.innerHTML = srcVal;
   }
}

function attributeFill(tgtElement, tgtAttrName, srcObj, srcJpath, functSelector) {
   "use strict";
   var srcVal;

   srcVal = srcObj;
   if (srcJpath !== null && 0 < srcJpath.length) {
      //where jpath null or empty use all of the src object to fill element text value
      srcVal = jsonPath(srcObj, srcJpath, null)[0];
   }

   if (srcVal === undefined || srcVal === null) {
      if (debug) {
         dbgConsole.info("attributeFill: src value not found");
      }
   } else if (functSelector !== undefined && functSelector !== null
         && 0 < functSelector.length) {
      // do function to format src value
      const processedSrcVal = extFunctions.doFunction(functSelector, srcVal, tgtElement.getAttribute(tgtAttrName));
      tgtElement.setAttribute(tgtAttrName, processedSrcVal);
   } else {
      tgtElement.setAttribute(tgtAttrName, srcVal);
   }
}

function attributeFills(tgtElement, attrToFillDefs, dataSrc) {
   "use strict";

   if (attrToFillDefs !== undefined && attrToFillDefs !== null && 0 < attrToFillDefs.length) {
      for (var j = 0; j < attrToFillDefs.length; j = j + 1) {

         const attrValueSrcJpath = attrToFillDefs[j].srcJpath;
         if (attrValueSrcJpath !== undefined) {

            // attr value needs to be filled
            attributeFill(tgtElement, attrToFillDefs[j].tgtAttrName, dataSrc,
                          attrValueSrcJpath, attrToFillDefs[j].functionSel)
         }
      }
   }
}

function elementFills(src2targetMap, tgtBlock, elementFillMapJpath, dataSources, srcObj) {
   "use strict";

   const elementFillArr = jsonPath(src2targetMap, elementFillMapJpath, null)[0];


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
            if (tgtElement === undefined || tgtElement === null) {
               if (debug) {
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
         dbgConsole.info("No element source to tearget Defs for: " + elementFillMapJpath);
      }
   }

}

function getCollectionTemplate(collectionMap, tgtBlock) {
   "use strict";

   const templateId = collectionMap.templateId;
   var msg, template;

   if (templateId !== undefined && templateId !== null && 0 < templateId.length) {
      template = tgtBlock.getElementById(templateId);
      msg = "ID:" +templateId;
   } else {
      const templateClassList = collectionMap.templateClassList;
      template = tgtBlock.getElementsByClassName(templateClassList)[0];
      msg = "Class List:" +templateClassList;
   }
   if (template === undefined) {
      dbgConsole.error("No template found for: " + msg);
   }
   return template;
}

function getIdForInstance(instanceHtml, instanceSrc, collectionMap, parentId) {
   "use strict";

   var dataSrcId = instanceSrc; // default to using instance value as the instance Id
   const dataSrcIdPath = collectionMap.srcIdPath;
   if (dataSrcIdPath !== undefined && dataSrcIdPath !== null && 0 < dataSrcIdPath.length) {
      //set cloned instance id, to be concat of parentId_classname_srcobjectID
      dataSrcId = jsonPath(instanceSrc, dataSrcIdPath, null);
   }

   const mainClass = instanceHtml.classList[0];
   dataSrcId = mainClass.concat("_" + dataSrcId);
   if (parentId !== undefined && parentId !== null && 0 < parentId.length) {
      dataSrcId = parentId + "_" + dataSrcId;
   }
   instanceHtml.id = dataSrcId;

   return dataSrcId;
}

function  removeTemplateClassFromInstance(instanceHtml) {
   var classStr = instanceHtml.className;
   classStr = classStr.replace("template", "");
   classStr = classStr.trim();
   instanceHtml.className = classStr;
   return instanceHtml;
}

function collectionInstantiate(collectionMap, tgtBlock, dataSources, instanceDataSrc, parentId) {
   "use strict";

   const template = getCollectionTemplate(collectionMap, tgtBlock);
   if (template === undefined || template === null || 1 > template.length) return;

   // handle empty source collection with optional registered function
   if (instanceDataSrc === undefined || instanceDataSrc === null || 1 > instanceDataSrc.length) {
      const mtCollectionSel = collectionMap.mtCollectionFunctSel;
      if (mtCollectionSel !== undefined && mtCollectionSel !== null && 0 < mtCollectionSel.length) {
         extFunctions.doFunction(mtCollectionSel, instanceDataSrc, tgtBlock);
      }
      return;
   }

   const bounds = calcStartEndIndices(dataSources, collectionMap, instanceDataSrc);

   // create clone instances and fill them
   for (var i = bounds.start; i < bounds.end; i = i + 1) {

      //each instantiation of template
      var templateClone = template.cloneNode(true);

      // set Id for html instance
      const dataSrcId = getIdForInstance(templateClone, instanceDataSrc[i], collectionMap, parentId);
      templateClone.id = dataSrcId;

      // remove template class from html instance
      templateClone = removeTemplateClassFromInstance(templateClone);

      elementFills(collectionMap, templateClone, "instanceFill.elementFills", dataSources, instanceDataSrc[i]);

      //for each collection sub map and sub array data source
      const collectionSubMap = jsonPath(collectionMap, "instanceFill.collections", null)[0];
      if (collectionSubMap !== undefined && collectionSubMap !== null && 0 < collectionSubMap.length) {
         for (var j = 0; j < collectionSubMap.length; j = j + 1) {
            const subSrcJpath = collectionSubMap[j].dataSrcJpath;
            const dataSrcSubObj = jsonPath(instanceDataSrc[i], subSrcJpath, null)[0];
            collectionInstantiate(collectionSubMap[j], templateClone, dataSources, dataSrcSubObj, dataSrcId);
         }
      }
      template.parentNode.insertBefore(templateClone, template);
   }
}

/* exported compose */
export function compose(src2targetMap, dataSources, document) {
   "use strict";
   var instanceDataSource, collectionsArrMap, i, dataSrcJpath;
   //top level
   elementFills(src2targetMap, document, "elementFills", dataSources, null);

   // start at top level but recursive build lower levels where defined and data src demands
   collectionsArrMap = jsonPath(src2targetMap, "collections", null)[0];
   if (collectionsArrMap !== undefined && collectionsArrMap !== null && 0 < collectionsArrMap.length) {
      // collections to process
      for (i = 0; i < collectionsArrMap.length; i = i + 1) {
         // each collection map
         dataSrcJpath = collectionsArrMap[i].dataSrcJpath;
         instanceDataSource = jsonPath(dataSources, dataSrcJpath, null)[0];

         collectionInstantiate(collectionsArrMap[i], document, dataSources, instanceDataSource, null);
      }
   }
}
