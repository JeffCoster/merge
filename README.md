# merger
Merging dynamic source content to html templates by data configuration (mapping)

## Objectives:
- keep html, content, and code separate; for full life cycle
>- allowing html specialists to focus on mark up and associated CSS rules
>- mixing code and html makes it harder to visualise and maintain, especially when code loops are required
>- separate content is always best practice 
- render dynamic web pages by mapping configuration, rather than coding
>- simpler and more reliable
>- easier to maintain
- keep html pure with no extensions
- map dynamic source object hierarchies to target html template sections
>- avoids coding rendering loops: common in other approaches
- mapping to handle varying width and depth of child objects to html
- run in NodeJS or Browser
- facilitate code extensions, where necessary, at suitable break out points

## Technologies
javascript, jsonPath, CSS, html, json, json schema

## Overview Of Typical Steps to use Merger to Render in a Browser
1. with static html, which often start as a preview example of the dynamic page
    - remove example preview content, leaving mark up
    - collapse each repeated html section into a single template (hidden) section
2. prepare content source objects
    - each Data Source needs to be available to the merger JS code, as a const
    - each Data Source needs to be registered in the Data Sources object
    >- Note: Data Sources will often be the results of a service call
3. add merger boiler plate JS, in a script, in the html
4. configure json data to map source json arrays and values, to target html sections, elements and attirbutes
    - element text maps directly to corresponding source field 
    - attribute value maps directly to corresponding source field 
    - source object collections map to html template sections, for instantion of templates and content filling
5. load the html page, so that merger runs and renders the page

>_Note: Steps 4 and 5 can be iterated over, to configure and test in parts_

## Invocation on Node JS
See merger-express project for examples of Merger rendering with Express on Node JS.

## Overview of Invocation (Browser)
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
>- dataSources is a json object that registers the source data (json) objects
>- document is the DOM of the html template. On Node the html has to be parsed into a DOM

> The **_if(debug)_** section is an optional section, to validate the configured mapping against the merger mapping schema
>- generally, this would only be needed in the development of the mapping
>- errors detected are output in the browser console

## Examples (Rendered in Browser):
- List of Products: see https://jeffcoster.github.io/merger/ex1/product-lister-template.html
- Tree of Categories (Taxonomy): see https://jeffcoster.github.io/merger/ex2/taxonomy.html

For full documentation, including explanation of the examples: see https://jeffcoster.github.io/merger/

