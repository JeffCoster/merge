/* Merge
 *
 * Copyright (c) 20023 Jeff Coster
 * Licensed under the MIT (MIT-LICENSE.txt) licence.
 */

export const mergerSchema = {
   "$schema": "http://json-schema.org/draft-07/schema#",
   "$id": "merge-schema.json",
   "title": "Merge Mappings",
   "description": "Mapping of Data Source values to html content positiions",
   "type": "object",
   "anyOf": [
      {
         "type": "object",
         "properties": {
            "elementFills": {
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
};
