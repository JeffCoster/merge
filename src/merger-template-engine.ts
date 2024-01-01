/* Merger
 *
 * Copyright (c) 20023 Jeff Coster
 * Licensed under the Apache-2.0 licence.
 * see https://github.com/JeffCoster/merger
 * 
 *  Merger as template engine for Node.js express server, which prefers to import an __express function.
 * 
 */

import {compose} from "./merger-functions.js";
import {JSDOM} from "jsdom";
import * as fs from "fs";
import {validateMergeMapToSchema} from "./merger-map-validate.js";
import * as path from "path";

export function __express(filePath: string, options: any, callback: (msg: any, rendered?:string) => void) { // define the template engine

    const originalCwd: string  = process.cwd(); // working dir

    fs.readFile(filePath, (err, mappingJson) => {
        if (err) return callback(err);

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

        
        // change current work dir to same as mapping file as template should be relative to that file
        const mapFileDir: string = path.dirname(filePath);
        process.chdir(mapFileDir);

        var dom = JSDOM.fromFile(htmlTemplatePath, {
        includeNodeLocations: true
        }).then(dom => {
            if(debug) {
                validateMergeMapToSchema(mergeMap4View);
            }
            var document = dom.window.document;
            compose(mergeMap4View, dataSources, document, customFunctions);
            
            process.chdir(originalCwd);
            return callback(null, dom.serialize());
        }).catch(
            (e) => {
            console.error(e.message);
            process.chdir(originalCwd);
            return callback(e);
        });
    
    });
}

