"use strict";
/* Merger
 *
 * Copyright (c) 20023 Jeff Coster
 * Licensed under the MIT (MIT-LICENSE.txt) licence.
 * see https://github.com/JeffCoster/merger
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMergeMapToSchema = void 0;
/*
  validate mergeMap is valid json using merger schema
*/
var merger_schema_js_1 = require("./schema/merger-schema.js");
var ajv_1 = require("ajv");
function validateMergeMapToSchema(mergerMap) {
    // validate merge map json
    var ajv = new ajv_1.default({
        schemas: [merger_schema_js_1.mergerSchema]
    });
    var validate = ajv.compile(merger_schema_js_1.mergerSchema);
    var valid = validate(mergerMap);
    if (!valid) {
        console.log(validate.errors);
    }
    else {
        console.log("schema is valid");
    }
}
exports.validateMergeMapToSchema = validateMergeMapToSchema;
