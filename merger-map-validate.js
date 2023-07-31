/* Merger
 *
 * Copyright (c) 20023 Jeff Coster
 * Licensed under the MIT (MIT-LICENSE.txt) licence.
 * see https://github.com/JeffCoster/merger
 */

/*
  validate mergeMap is valid json using merger schema
*/

import {
   mergerSchema
} from "./schema/merger-schema.js"

import Ajv from "ajv"

export function validateMergeMapToSchema(mergerMap) {
   // validate merge map json
//   const Ajv = window.ajv2019;
   const ajv = new Ajv({
      schemas: [mergerSchema]
   });

   const validate = ajv.compile(mergerSchema);

   const valid = validate(mergerMap);
   if (!valid) {
      console.log(validate.errors);
   } else {
      console.log("schema is valid");
   }
}
