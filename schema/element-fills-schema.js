/* Merge
 *
 * Copyright (c) 20023 Jeff Coster
 * Licensed under the MIT (MIT-LICENSE.txt) licence.
 */

export const elementFillsSchema = {
   "$id": "element-fills-schema.json",
   "title": "Array of Source value to Element Fill mappings",
   "description": "Mapping of Data Source values to html elements",
   "type": "array",
   "minItems": 1,
   "uniqueItems": true,
   "items": {
      "description": "source value to target element content mappings, for a single data source",
      "type": "object",
      "properties": {
         "dataSrcJpath": {
            "description": "The string 'instance' for a collection instance, or a jsonPath to data source to use to obtain values to insert into target elements",
            "type": "string"
         },
         "elementsToDo": {
            "description": "for this data source, source value to target element and attribute mappings",
            "type": "array",
            "minItems": 1,
            "uniqueItems": true,
            "items": {
               "description": "single source value to single target element mapping",
               "type": "object",
               "properties": {
                  "elementTgtCss": {
                     "description": "CSS path to a target element. May be Relative to the document or target collection instance",
                     "type": "string"
                  },
                  "srcJpath": {
                     "description": "jsonPath to data value to use to fill the target element, when that is needed. Relative to the data source",
                     "type": "string"
                  },
                  "functionSel": {
                     "description": "where required, defined name used to select the registered data formatting function to use on this element fill",
                     "type": "string"
                  },
                  "itsAttributes": {
                     "description": "For this element, the required source value to target attribute mappings",
                     "type": "array",
                     "minItems": 1,
                     "uniqueItems": true,
                     "items": {
                        "description": "For this element, single source value to single target attribute mapping",
                        "type": "object",
                        "properties": {
                           "tgtAttrName": {
                              "description": "Name of the target attribute",
                              "type": "string"
                           },
                           "srcJpath": {
                              "description": "jsonPath to data value to use to fill the target attribute. Relative to the data source",
                              "type": "string"
                           },
                           "functionSel": {
                              "description": "where required, defined name used to select the registered data formatting function to use on this attribute fill",
                              "type": "string"
                           },
                        },
                        "required": [
                           "tgtAttrName",
                           "srcJpath"
                        ],
                     },
                  },
               },
               "required": [
                  "elementTgtCss"
               ],
            },
         },
      },
      "required": [
         "dataSrcJpath",
         "elementsToDo"
      ],
   }
};
