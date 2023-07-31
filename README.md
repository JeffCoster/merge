# merger
Merging dynamic source content to html templates by data configuration (mapping)

## Objectives:
- keep html separate from any code: so that it easier to understand and maintain
- keep content separate from the html
- keep content separate from the code
- render dynamic web pages with minimal coding
- handle dynamic hierarchies of html sections, sourced from dynamic source object hierarchies
- run in NodeJS or Browser

## Technologies
javascript, jsonPath, CSS, html, json, json schema

## Overview Of Typical Steps to use Merger to Render in a Browser
1. with static html, which is often a preview example of the dynamic page
    - remove example preview content, leaving mark up
    - collapse each repeated html section into a template (hidden) section
2. prepare content source objects
    - each Data Source needs to be available to the merger JS code, as a const
    - each Data Source needs to be registered in the Data Sources object
3. add merger boiler plate JS, in a script, in the html
4. configure json data to map source json arrays and values, to target html sections, elements and attirbutes
    - element text maps directly to corresponding source field 
    - attribute value maps directly to corresponding source field 
    - source object collections map to html template sections, for instantion of templates and content filling
5. load the html page, so that merger runs and renders the page

>_Note: Steps 4 and 5 can be iterated over, to configure and test in parts_

## Overview of Invocation (Browser)

Note: Similar for Node JS

```javascript

   import {mergerMap} from './merger-map.js'
   import {dataSources} from './content/data-sources.js'
   import {customFunctions} from './custom-functions.js'

   import {compose} from '../merger-functions.js' 
   import {mergerSchema} from "../schema/merger-schema.js"

   globalThis.debug = true;

   if(debug) {
      const Ajv = window.ajv2019;
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
   compose(mergerMap, dataSources, document);

```

> Merger is invoked by calling **_compose(mergerMap, dataSources, document);_**
>- margerMap is a const containing the mapping json which maps the source json arrays and values to the html template
>- dataSources is json object that registers the source data (json) objects
>- document is DOM of the html template

> The **_if(debug)_** section is an optional section, to validate the mapping using the merger mapping schema
>- generally, this would only be needed in the development of the mapping
>- errors detected are output in the browser console

## Examples (Rendered in Browser):
- List of Products: see https://jeffcoster.github.io/merger/ex1/product-lister-template.html
- Tree of Categories (Taxonomy): see https://jeffcoster.github.io/merger/ex2/taxonomy.html


