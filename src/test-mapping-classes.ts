import { AttributeMapping }  from "./attribute-mapping.js";
import { ElementMapping }  from "./element-mapping.js";
import { RootMapping } from "./root-mapping.js";
import { TypeManager } from '@dipscope/type-manager';
import * as fs from "fs"

const attrMappingObject = new AttributeMapping("id", "srcId");
const attrMappingObjectSer = TypeManager.serialize(AttributeMapping, attrMappingObject);
const attrMappingObjectJson = JSON.stringify(attrMappingObjectSer);
console.info(attrMappingObjectJson);
const attrFill: any = TypeManager.deserialize(AttributeMapping, attrMappingObjectSer);

attrFill instanceof AttributeMapping; // True.

const elementMappingObj = new ElementMapping("eTgtCssString", "eSrcJpath");
//elementMappingObj.itsAttributes.push(attrFill);
var eMappingObjectSer = TypeManager.serialize(ElementMapping, elementMappingObj);
var eMappingObjJson = JSON.stringify(eMappingObjectSer);
console.info("element no attrs");
console.info(eMappingObjJson);

elementMappingObj.addAttributeMapping(attrFill);

eMappingObjectSer = TypeManager.serialize(ElementMapping, elementMappingObj);
eMappingObjJson = JSON.stringify(eMappingObjectSer);
console.info("element with attr");
console.info(eMappingObjJson);

const eFill: any = TypeManager.deserialize(ElementMapping, eMappingObjectSer);

elementMappingObj.removeAttributeMappingAt(0);
console.info("element with attrs removed");
console.info(elementMappingObj);

eFill instanceof ElementMapping;

let jsonMapping = fs.readFileSync('examples/product-list/pl-merger-map.merger', 'utf-8');

const pojo = JSON.parse(jsonMapping);

console.info("original JSON" +jsonMapping);

const mappingGraph: any = TypeManager.deserialize(RootMapping, pojo);

const pojoAfter = TypeManager.deserialize(RootMapping, mappingGraph);

console.warn("Back to json string" +JSON.stringify(pojoAfter));

