/* Merger
 *
 * Copyright (c) 20023 Jeff Coster
 * Licensed under the MIT (MIT-LICENSE.txt) licence.
 * see https://github.com/JeffCoster/merger
 */

/*  
   Regression Test renderedHtml matches a baseline html file. 
   Baseline, captured and saved using an earlier version of Merger
   to render the same view using same test data and mapping.
*/

import * as fs from "fs";
import chalk from 'chalk';
import { Command, InvalidArgumentError } from '@commander-js/extra-typings';
import { ChangeObject, HtmlDiffer } from '@markedjs/html-differ';
import * as diffLogger from '@markedjs/html-differ/lib/logger.js';
import { defaults, presets } from '@markedjs/html-differ/lib/defaults.js';
import { __express } from './merger-template-engine.js';
 
function parseIntOpt(value, _dummyPrevious): number {
  const parsedValue: number = parseInt(value, 10);
  if (isNaN(parsedValue)) {
    throw new InvalidArgumentError('Not a number.');
  }
  return parsedValue;
}

async function doDiff(baselineHtml: string, renderedHtml: string, baselineHtmlPath: string, charsAroundDiff: any) {

  const htmlDiffer = new HtmlDiffer(defaults);
  const isEqual = await htmlDiffer.isEqual(baselineHtml, renderedHtml);
  if (isEqual) {
    // @ts-ignore
    // console.log("PASS: Baseline html: " +baselineHtmlPath +" equals html rendered by Merger");
    console.log(chalk.green("PASS: Baseline html: " +baselineHtmlPath +" equals html rendered by Merger"));
    process.exit(1);
  } else {
    console.log(chalk.red("FAIL: Baseline html: " +baselineHtmlPath +" differs with html rendered by Merger"));
    const loggerOptions = {
      // @ts-ignore
      charsAroundDiff: charsAroundDiff
    }
    const diff = await htmlDiffer.diffHtml(renderedHtml, baselineHtml);
    if (!diffLogger.logDiffText(diff, loggerOptions)) {
      process.exit(1);
    }
  }
}

//async function act(mappingJsonPath, baselineHtmlPath, options, command) { 
async function act() { 

  const options = this.opts();
  const mappingJsonPath: string = this.args[0];
  const baselineHtmlPath: string = this.args[1];
  const dataSourcesPath: string = this.args[2];

  // @ts-ignore
  global.debug = options.debug;

  if (debug) {
    console.log("Options: debug: %s, charsAroundDiff: %s, customFunctionsPath: %s", 
      options.debug, options.charsAroundDiff, options.customFunctionsPath);
    console.log("mappingJsonPath: %s", mappingJsonPath);
    console.log("baselineHtmlPath: %s", baselineHtmlPath);
    console.log("dataSourcesPath: %s", dataSourcesPath);
  }

  // get baselineHtml
  const baselineHtml = fs.readFileSync(baselineHtmlPath, 'utf8');
  
  // get dataSources object which defines all data sources used for content rendering
  const moduleDs = await import(dataSourcesPath);
  const dataSources4View = moduleDs.dataSources;

  // import and set customFuctions, when declared
  var customFunctions = null;
  if (options.customFunctionsPath) {
    const moduleCf = await import(options.customFunctionsPath);
    customFunctions = moduleCf.customFunctions;
  }
     
  // @ts-ignore
  __express(mappingJsonPath, {dataSources4View, customFunctions}, function (err, renderedHtml ) {
    if (err) {
      console.error("Error rendering:" + err);
    } else {
      // compare baseline vs rendered
      doDiff(baselineHtml, renderedHtml, baselineHtmlPath, options.charsAroundDiff);
    }
  });
}

export async function main(argv: any) {

  const program = new Command();

  program
    .name(argv[0])
    .description('Regression test: Compares merger rendered HTML, with a previously rendered baseline HTML')
    .version(process.env.npm_package_name +" " +process.env.npm_package_version)
    .allowExcessArguments(false)
    .argument('<mappingJsonPath>', 'Path to merger mapping [.merger] file, controlling rendering.')
    .argument('<baselineHtmlPath>', 'Path to the baseline html file. From a previous tested OK render.')
    .argument('<dataSourcesPath>', 'Path to the dataSources object which defines all data sources used to render content')
    .option('-d,--debug','output extra debugging', false)
    .option('-a,--chars-around-diff <charsAroundDiff>', 'The number of characters around the diff', parseIntOpt, 20)
    .option('-c,--custom-functions-path <customFunctionsPath>', 'Path to custom functions to import', null)
    .action(act);

    await program.parseAsync(argv);
  }
