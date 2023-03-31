/* Merger
 *
 * Copyright (c) 20023 Jeff Coster
 * Licensed under the MIT (MIT-LICENSE.txt) licence.
 */

export const mergerSchema = {
   "$schema": "https://json-schema.org/draft/2019-09/schema",
   "$id": "merger-schema.json",
   "title": "Merge Mappings",
   "description": "Mapping of Data Source values to html content positiions",
   "type": "object",
   "anyOf": [
      {
         "type": "object",
         "description": "mapping of datasource values to target elements, for an instantiation from the collections template",
         "additionalProperties": {
            "$ref": "#/$defs/elementFills"
         }
      },
      {
         "type": "object",
         "additionalProperties": {
            "$ref": "#/$defs/collections"
         },
         "description": "a collection may include child collections"
      }
   ],

   "$defs": {
      "elementFills": {
         "type": "array",
         "items": {
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
                                 }
                              },
                              "required": [
                                 "tgtAttrName",
                                 "srcJpath"
                              ]
                           }
                        }
                     }
                  }
               }
            },
            "required": ["dataSrcJpath", "elementsToDo"]
         }
      },

      "collections": {
         "title": "Array of Source value to Element Fill mappings",
         "description": "Mapping of Data Source objects to html section instances",
         "type": "array",
         "items": {
            "type": "object",
            "properties": {
               "dataSrcJpath": {
                  "description": "jsonPath to the data source collection within dataSources. Drives instantiations of the html template",
                  "type": "string"
               },
               "templateId": {
                  "description": "html element ID of the html template used to seed instances for this collection",
                  "type": "string"
               },
               "templateClassList": {
                  "description": "list of classes of the html template used to seed instances for this collection, one class will be 'template'",
                  "type": "string"
               },
               "srcIdPath": {
                  "description": "jsonPath to select the id from the data source used to identify the instances of the collection",
                  "type": "string"
               },
               "startDataSrcJpath": {
                  "description": "path within Data Sources, to variable used to indicate start index into source collection",
                  "type": "string"
               },
               "maxToShowDataSrcJpath": {
                  "description": "path within Data Sources, to variable used to indicate max qty to show from source collection",
                  "type": "string"
               },
               "action": {
                  "description": "TODO: create instances - the default, update instances, or replace by delete then create",
                  "enum": ["create", "update", "replace"]
               },
               "mtCollectionFunctSel": {
                  "description": "name that selects the registered function to use for additional processing when source data collection is empty",
                  "type": "string"
               },
               "instanceFill": {
                  "type": "object",
                  "anyOf": [
                     {
                        "type": "object",
                        "properties": {
                           "elementFills": {
                              "description": "mapping of datasource values to target elements, for an instantiation from the collections template",
                              "$ref": "#/$defs/elementFills"
                           }
                        }
                     },
                     {
                        "type": "object",
                        "properties": {
                           "collections": {
                              "description": "this collection may include child collections",
                              "$ref": "#/$defs/collections"
                           }
                        }
                     }
                  ]
               }
            }
         },
         "minItems": 1,
         "uniqueItems": true
      }
   }
};
