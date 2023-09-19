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

import {compose} from "./merger-functions.js";
import {JSDOM} from "jsdom";
import * as fs from "fs";
import { validateMergeMapToSchema } from "./merger-map-validate.js";

export function __express(filePath: string, options: any, callback: (msg: any, rendered?:string) => void) { // define the template engine

    fs.readFile(filePath, (err, mappingJson) => {
        if (err) return callback(err);

        //TODO make robust and add debug for all 4 statements
        const mergeMap4View = JSON.parse(mappingJson.toString());
        if (!mergeMap4View) {
            return callback("invalid Json mapping");
        }
        const htmlTemplatePath = mergeMap4View.templatePath;
        if (!htmlTemplatePath) {
            return callback("no valid html template path obtained");
        }
        const dataSources =  options.dataSources4View;
        if (!dataSources) {
            return callback("no dataSources found");
        }
        const customFunctions = options.customFunctions; // undefined is valid case for no custom functions

        
        //const {JSDOM} = jsdom;
        var dom = JSDOM.fromFile(htmlTemplatePath, {
        includeNodeLocations: true
        }).then(dom => {
            //validateMergeMapToSchema(mergeMap4View);
            var document = dom.window.document;
            compose(mergeMap4View, dataSources, document, customFunctions);
 
            // regression test
            // TODO regressionTest(dom, baselineRenderedHtmlPath)
            return callback(null, dom.serialize());
        });
    });
 };
