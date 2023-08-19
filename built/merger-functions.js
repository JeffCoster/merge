"use strict";
/*global
 debug
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.compose = exports.dbgConsole = void 0;
/* Merger
 *
 * Copyright (c) 20023 Jeff Coster
 * Licensed under the MIT (MIT-LICENSE.txt) licence.
 * see https://github.com/JeffCoster/merger
 */
var jsonpath_js_1 = require("./jsonpath.js");
var merger_extensions_js_1 = require("./merger-extensions.js");
exports.dbgConsole = {
    info: function (str) {
        "use strict";
        // eslint-disable-next-line no-console
        console.info(str);
    },
    warn: function (str) {
        "use strict";
        // eslint-disable-next-line no-console
        console.warn(str);
    },
    error: function (str) {
        "use strict";
        // eslint-disable-next-line no-console
        console.error(str);
    }
};
function calcStartEndIndices(dataSources, collectionMap, srcCollection) {
    // set requested start and end index to be used to process srcCollection
    var start, end;
    var path = collectionMap.startDataSrcJpath;
    start = 0;
    if (path !== undefined && path !== null && 0 < path.length) {
        start = (0, jsonpath_js_1.jsonPath)(dataSources, path, null)[0];
        if (start !== undefined && start !== null && !start.isNan) {
            if (start >= srcCollection.length) {
                start = 0;
            }
        }
        else if (debug) {
            exports.dbgConsole.error("start index variable not found or not a number for jsonpath: " + jsonpath_js_1.jsonPath
                + " and collection: " + collectionMap.dataSrcJpath);
        }
    }
    path = collectionMap.maxToShowDataSrcJpath;
    end = srcCollection.length;
    if (path !== undefined && path !== null && 0 < path.length) {
        end = (0, jsonpath_js_1.jsonPath)(dataSources, path, null)[0];
        if (end !== undefined && end !== null && !end.isNan) {
            end = start + end;
            if (end > srcCollection.length) {
                end = srcCollection.length;
            }
        }
        else if (debug) {
            exports.dbgConsole.error("end index variable not found or not a number for jsonpath: " + jsonpath_js_1.jsonPath
                + " and collection: " + collectionMap.dataSrcJpath);
        }
    }
    if (debug) {
        exports.dbgConsole.info("collection start index=" + start + " end index=" + end
            + "for collections size=" + srcCollection.length);
    }
    return { start: start, end: end };
}
function elementFill(tgtElement, srcObj, srcJpath, functSelector) {
    "use strict";
    var srcVal;
    //where jpath null or empty use all of the src object to fill element text value
    srcVal = srcObj;
    if (srcJpath !== null && 0 < srcJpath.length) {
        // use jpath target value from srcObj
        srcVal = (0, jsonpath_js_1.jsonPath)(srcObj, srcJpath, null)[0];
    }
    if (srcVal === undefined || srcVal === null) {
        if (debug) {
            exports.dbgConsole.info("elementFill: src value not found for srcJpath: " + srcJpath
                + " and element:" + tgtElement.tagName
                + " and srcObject:" + srcObj);
        }
        return;
    }
    else if (functSelector !== undefined && functSelector !== null
        && 0 < functSelector.length) {
        // do function to format src value
        tgtElement.innerHTML = merger_extensions_js_1.extFunctions.doFunction(functSelector, srcVal, tgtElement.innerHTML);
    }
    else {
        tgtElement.innerHTML = srcVal;
    }
    if (debug) {
        exports.dbgConsole.info("Filled Element:" + tgtElement.tagName
            + " with source value:" + srcVal
            + " and transform function:" + functSelector);
    }
}
function attributeFill(tgtElement, tgtAttrName, srcObj, srcJpath, functSelector) {
    "use strict";
    var srcVal;
    //where jpath null or empty use all of the src object to fill attribute text value
    srcVal = srcObj;
    if (srcJpath !== null && 0 < srcJpath.length) {
        // use jpath target value from srcObj
        srcVal = (0, jsonpath_js_1.jsonPath)(srcObj, srcJpath, null)[0];
    }
    if (srcVal === undefined || srcVal === null) {
        if (debug) {
            exports.dbgConsole.info("attributeFill: src value not found for srcJpath: " + srcJpath
                + " and element: " + tgtElement.tagName
                + " for attribute: " + tgtAttrName
                + " and srcObject:" + srcObj);
        }
        return;
    }
    else if (functSelector !== undefined && functSelector !== null
        && 0 < functSelector.length) {
        // do function to format src value
        var processedSrcVal = merger_extensions_js_1.extFunctions.doFunction(functSelector, srcVal, tgtElement.getAttribute(tgtAttrName));
        tgtElement.setAttribute(tgtAttrName, processedSrcVal);
    }
    else {
        tgtElement.setAttribute(tgtAttrName, srcVal);
    }
    if (debug) {
        exports.dbgConsole.info("Filled Attribute:" + tgtAttrName + " for element:" + tgtElement.tagName
            + " with source value:" + srcVal
            + " and transform function:" + functSelector);
    }
}
function attributeFills(tgtElement, attrToFillDefs, dataSrc) {
    "use strict";
    if (attrToFillDefs !== undefined && attrToFillDefs !== null && 0 < attrToFillDefs.length) {
        for (var j = 0; j < attrToFillDefs.length; j = j + 1) {
            var attrValueSrcJpath = attrToFillDefs[j].srcJpath;
            if (attrValueSrcJpath !== undefined) {
                // attr value needs to be filled
                attributeFill(tgtElement, attrToFillDefs[j].tgtAttrName, dataSrc, attrValueSrcJpath, attrToFillDefs[j].functionSel);
            }
        }
    }
}
function elementFills(src2targetMap, tgtBlock, elementFillArr, dataSources, srcObj) {
    "use strict";
    for (var n = 0; n < elementFillArr.length; n = n + 1) {
        var elementFillDirs = elementFillArr[n];
        var dataSrc = srcObj;
        if (srcObj === undefined || srcObj === null) {
            var dataSrcJpath = elementFillDirs.dataSrcJpath;
            dataSrc = (0, jsonpath_js_1.jsonPath)(dataSources, dataSrcJpath, null)[0];
        }
        var elementsToDo = elementFillDirs.elementsToDo;
        if (elementsToDo !== undefined && elementsToDo !== null && 0 < elementsToDo.length) {
            for (var i = 0; i < elementsToDo.length; i = i + 1) {
                var tgtElement = tgtBlock.querySelector(elementsToDo[i].elementTgtCss);
                if (debug) {
                    if (tgtElement === undefined || tgtElement === null) {
                        exports.dbgConsole.error("elementFill error: target element not found for CSS: "
                            + elementsToDo[i].elementTgtCss);
                    }
                }
                var elementValueSrcJpath = elementsToDo[i].elementValueSrcJpath;
                if (elementValueSrcJpath !== undefined) {
                    // element text value needs to be filled
                    elementFill(tgtElement, dataSrc, elementValueSrcJpath, elementsToDo[i].functionSel);
                }
                // for element being filled, fill required attributes
                attributeFills(tgtElement, elementsToDo[i].itsAttributes, dataSrc);
            }
        }
        else if (debug) {
            exports.dbgConsole.info("No element source to target Defs for: " + elementFillArr[n].dataSrcJpath);
        }
    }
}
function getCollectionTemplate(collectionMap, tgtBlock) {
    "use strict";
    var templateId = collectionMap.templateId;
    var msg, template;
    if (templateId !== undefined && templateId !== null && 0 < templateId.length) {
        template = tgtBlock.getElementById(templateId);
        msg = "ID:" + templateId;
    }
    else {
        var templateClassList = collectionMap.templateClassList;
        template = tgtBlock.getElementsByClassName(templateClassList)[0];
        msg = "Class List:" + templateClassList;
    }
    if (debug) {
        if (template === undefined) {
            exports.dbgConsole.error("No template found for: " + msg);
        }
        else {
            exports.dbgConsole.info("Processing html template with:" + msg);
        }
    }
    return template;
}
function getIdForInstance(instanceHtml, instanceSrc, collectionMap, parentId) {
    "use strict";
    var dataSrcId = instanceSrc; // default to using instance value as the instance Id
    var dataSrcIdPath = collectionMap.srcIdPath;
    if (dataSrcIdPath !== undefined && dataSrcIdPath !== null && 0 < dataSrcIdPath.length) {
        //set cloned instance id, to be concat of parentId_classname_srcobjectID
        dataSrcId = (0, jsonpath_js_1.jsonPath)(instanceSrc, dataSrcIdPath, null)[0];
        if (dataSrcId === undefined || dataSrcId === null) {
            dataSrcId = ""; // set to safe value of empty string
            if (debug) {
                exports.dbgConsole.warn("no ID  found for jpath:" + dataSrcIdPath + " in instance:" + instanceSrc);
            }
        }
    }
    var mainClass = instanceHtml.classList[0];
    dataSrcId = mainClass.concat("_" + dataSrcId);
    if (parentId !== undefined && parentId !== null && 0 < parentId.length) {
        dataSrcId = parentId + "_" + dataSrcId;
    }
    instanceHtml.id = dataSrcId;
    if (debug) {
        exports.dbgConsole.info("ID to use for instance is:" + dataSrcId + " where parent ID is:" + parentId);
    }
    return dataSrcId;
}
function removeTemplateClassFromInstance(instanceHtml) {
    var classStr = instanceHtml.className;
    classStr = classStr.replace("template", "");
    classStr = classStr.trim();
    instanceHtml.className = classStr;
    return instanceHtml;
}
function collectionInstantiate(collectionMap, tgtBlock, dataSources, instanceDataSrc, parentId) {
    "use strict";
    var template = getCollectionTemplate(collectionMap, tgtBlock);
    if (template === undefined || template === null || 1 > template.length)
        return;
    // handle empty source collection with optional registered function
    if (instanceDataSrc === undefined || instanceDataSrc === null || 1 > instanceDataSrc.length) {
        var mtCollectionSel = collectionMap.mtCollectionFunctSel;
        if (mtCollectionSel !== undefined && mtCollectionSel !== null && 0 < mtCollectionSel.length) {
            // handle case of no istance in data src, default is to do nothing which could be valid
            merger_extensions_js_1.extFunctions.doFunction(mtCollectionSel, instanceDataSrc, tgtBlock);
        }
        return;
    }
    // modify collection start and end index, if vars specified in mapping
    var bounds = calcStartEndIndices(dataSources, collectionMap, instanceDataSrc);
    // create clone instances and fill them
    for (var i = bounds.start; i < bounds.end; i = i + 1) {
        //each instantiation of template
        var templateClone = template.cloneNode(true);
        // set Id for html instance
        var dataSrcId = getIdForInstance(templateClone, instanceDataSrc[i], collectionMap, parentId);
        templateClone.id = dataSrcId;
        // remove template class from html instance
        templateClone = removeTemplateClassFromInstance(templateClone);
        var elementFillArr = collectionMap.instanceFill.elementFills;
        if (elementFillArr !== undefined && elementFillArr !== null && 0 < elementFillArr.length) {
            elementFills(collectionMap, templateClone, elementFillArr, dataSources, instanceDataSrc[i]);
        }
        //for each collection sub map and sub array data source
        var collectionSubMaps = collectionMap.instanceFill.collections;
        if (collectionSubMaps !== undefined && collectionSubMaps !== null && 0 < collectionSubMaps.length) {
            for (var j = 0; j < collectionSubMaps.length; j = j + 1) {
                var subSrcJpath = collectionSubMaps[j].dataSrcJpath;
                var dataSrcSubObj = (0, jsonpath_js_1.jsonPath)(instanceDataSrc[i], subSrcJpath, null)[0];
                collectionInstantiate(collectionSubMaps[j], templateClone, dataSources, dataSrcSubObj, dataSrcId);
            }
        }
        template.parentNode.insertBefore(templateClone, template);
    }
}
/* exported compose */
function compose(src2targetMap, dataSources, document) {
    "use strict";
    var instanceDataSource, collectionsArrMap, i, dataSrcJpath;
    //top level
    var elementFillArr = src2targetMap.elementFills;
    if (elementFillArr !== undefined && elementFillArr !== null && 0 < elementFillArr.length) {
        if (debug)
            exports.dbgConsole.info("Processing top level element Fills: for mapping.elementFills[]");
        elementFills(src2targetMap, document, elementFillArr, dataSources, null);
    }
    // start at top level but recursive build lower levels where defined and data src demands
    collectionsArrMap = src2targetMap.collections;
    if (collectionsArrMap !== undefined && collectionsArrMap !== null && 0 < collectionsArrMap.length) {
        // collections to process
        for (i = 0; i < collectionsArrMap.length; i = i + 1) {
            if (debug)
                exports.dbgConsole.info("Processing Collection[" + i + "]");
            // each collection map
            dataSrcJpath = collectionsArrMap[i].dataSrcJpath;
            instanceDataSource = (0, jsonpath_js_1.jsonPath)(dataSources, dataSrcJpath, null)[0];
            if (instanceDataSource === null || instanceDataSource === undefined) {
                if (debug) {
                    exports.dbgConsole.info("Processing Collection[" + i
                        + "] but dataSource not found for jpath:" + dataSrcJpath);
                }
            }
            else if (debug) {
                exports.dbgConsole.info("Processing Collection[" + i + "] with dataSource:" + dataSrcJpath);
            }
            collectionInstantiate(collectionsArrMap[i], document, dataSources, instanceDataSource, null);
        }
    }
}
exports.compose = compose;
