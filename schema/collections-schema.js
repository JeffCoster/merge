/* Merge
 *
 * Copyright (c) 20023 Jeff Coster
 * Licensed under the MIT (MIT-LICENSE.txt) licence.
 */

export const collectionsSchema = {
   "$id": "collections-schema.json",
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
            "description": "create instances - the default, update instances, or replace by delete then create",
            "enum": ["create", "update", "replace"]
         },
         mtCollectionFunctSel: {
            "description": "name that selects the registered function to use for additional processing when source data collection is empty",
            "type": "string"
         },
         "instance-fill": {
            "type": "object",
            "anyOf": [
               {
                  "type": "object",
                  "properties": {
                     "element-fills": {
                        "description": "mapping of datasource values to target elements, for an instantiation from the collections template",
                        "$ref": "element-fills-schema.json",
                     },
                  },
               },
               {
                  "type": "object",
                  "properties": {
                     "collections": {
                        "description": "this collection may include child collections",
                        "$ref": "collections-schema.json",
                     },
                  },
               }
            ]
         }
      },
      "oneOf": [
         {
            "required": [
               "dataSrcJpath",
               "templateId"
            ]
         },
         {
            "required": [
               "dataSrcJpath",
               "templateClassList"
            ]
         }
      ],

   },
   "minItems": 1,
   "uniqueItems": true,
};
