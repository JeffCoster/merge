/*global
 debug
*/

/* Merger
 *
 * Copyright (c) 20023 Jeff Coster
 * Licensed under the MIT (MIT-LICENSE.txt) licence.
 * see https://github.com/JeffCoster/merger
 * 
 * Merger as template engine for node js express server, which prefers to import an __express function.
 */

import {compose} from "./merger-functions.js"
import jsdom from "jsdom";
import * as fs from "fs";
import { validateMergeMapToSchema } from "./merger-map-validate.js";

export function __express(filePath: string, options: any, callback: (msg: any, rendered?:string) => void) { // define the template engine

    fs.readFile(filePath, (err, mappingJson) => {
        if (err) return callback(err);
        console.log(mappingJson);
        const mergeMap4View = JSON.parse(mappingJson.toString());
        const htmlTemplatePath = mergeMap4View.templatePath;
        
        const {JSDOM} = jsdom;
        var dom = JSDOM.fromFile(htmlTemplatePath, {
        includeNodeLocations: true
        }).then(dom => {
            //validateMergeMapToSchema(mergeMap4View);
            var document = dom.window.document;
            compose(mergeMap4View, options.dataSources, document);
 
            // regression test
            // TODO regressionTest(dom, baselineRenderedHtmlPath)
            return callback(null, dom.serialize());
        });
    });
 };
