// validate mergeMap is valid json using merge schema

import {
   mergeSchema
} from "./schema/merge-schema.js"
import {
   elementFillsSchema
} from "./schema/element-fills-schema.js"
import {
   collectionsSchema
} from "./schema/collections-schema.js"

import Ajv from "ajv"

export function validateMergeMapToSchema(mergeMap) {
   // validate merge map json
//   const Ajv = window.ajv7;
   const ajv = new Ajv({
      schemas: [mergeSchema, elementFillsSchema, collectionsSchema]
   });

   const validate = ajv.compile(mergeSchema);

   const valid = validate(mergeMap);
   if (!valid) {
      console.log(validate.errors);
   } else {
      console.log("schema is valid");
   }
}
