/*global
 debug
*/

/* Merger
 *
 * Copyright (c) 20023 Jeff Coster
 * Licensed under the MIT (MIT-LICENSE.txt) licence.
 * see https://github.com/JeffCoster/merger
 */

/* Node only: 
   Regression Test renderedHtml matches a baseline html file 
   Baseline, captured and saved using an earlier version of Merger
   to render the same view using same test data and mapping.
*/

import {JSDOM} from "jsdom";
import pkg from "dom-compare" ;
import {dbgConsole} from "./merger-functions.js";

export function test(renderedHtml: string, baselineHtmlFilePath: string, callback: (answer: string) => void) {

    var baselineHtml: string;
    var reporter = pkg.GroupingReporter;
    const ok: string = "NO DIFFERNCES FOUND";

    const options = {
        stripSpaces: true,
        compareComments: false,
        collapseSpaces: false,
        normalizeNewlines: false
    };
    
    var baselineDom = JSDOM.fromFile(baselineHtmlFilePath, {
        includeNodeLocations: true
    }).then(function (baselineDom) {
        var renderedDom = new JSDOM(baselineHtml, {
            includeNodeLocations: true
        });
        // regression test
        const result = pkg.compare(renderedDom.window.document, baselineDom.window.document, options);
        // get all differences
        const diff = result.getDifferences(); // array of diff-objects

        if (diff && diff.length > 0) {
 
            // differences, grouped by node XPath
            var groupedDiff = reporter.getDifferences(result); // object, key - node XPATH, value - array of differences (strings)
 
            dbgConsole.error(reporter.report(result));
            return callback(reporter.report(result));
        } else {
            dbgConsole.info(result);
            return callback(ok);
        }
    });
 };