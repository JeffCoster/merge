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
} from "../schema/merger-schema.js"

//import Ajv from "ajv"
import Ajv2019 from "ajv/dist/2019.js"
//import _Ajv2019 from "ajv";

//import Ajv, {JSONSchemaType} from "ajv"
//import _Ajv from "ajv";

// const Ajv = _Ajv as unknown as typeof _Ajv.default;

export function validateMergeMapToSchema(mergerMap) {
   // validate merge map json
   try {
   const ajv = new Ajv2019({
      schemas: [mergerSchema]
   });

   const validate = ajv.compile(mergerSchema);

   const valid = validate(mergerMap);
   if (!valid) {
      console.error(validate.errors);
   } else {
      console.log("merger map validates with merger schema");
   }
   } catch (e) {
      console.error("Program Exception while validating schema: " +e);
   }
}
