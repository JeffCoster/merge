# merger-dd
Merging dynamic source content to html templates by data configuration (mapping)

## Objectives:
- keep html, content, and code separate; for the full life cycle
>- allowing html specialists to focus on mark up and associated CSS rules
>- mixing code and html makes it harder to visualise and maintain, especially when code loops are required
>- separate content is always best practice, for example: facilitating multiple languages to be used
>- allows development of html templates that could work with many types of dynamic source content, e.g. different eCommerce platforms
>- simplifies the prototyping/workshop phases, as content data sources can be mocked; and changes to mapping/html/css can quickly be made
- render dynamic web pages by mapping configuration, rather than coding
>- simpler and more reliable
>- easier to maintain
>- facilitate the development of tools that could make the mapping stage even easier
- keep html pure with no extensions
- map dynamic source object hierarchies to target html template sections
>- avoids coding rendering loops: common in other approaches
- mapping to handle varying width and depth of child objects to html
- run in NodeJS or Browser
- facilitate code extensions, where necessary, at suitable break out points
>- only for cases where mapping cannot meet requirements

## Technologies
Typescript, javascript, jsonPath, CSS, html, json, json schema

## Overview Of Typical Steps to use Merger to Render in a Browser(a) or Node JS(b)
1. with static html, which often starts as a preview example of the dynamic page
    - remove example preview content, leaving mark up
    - collapse each repeated html section into a single template (hidden) section
2. prepare content source objects
    - each Data Source needs to be available to the merger JS code, as a const
    - each Data Source needs to be registered in the Data Sources object
    >- Note: Data Sources will often be the results of a service call
3. set up render invocation, by either:
    - (a) add [browser boiler plate JS](https://jeffcoster.github.io/merger/#browser-boiler-plate-js), in a script, in the html OR
    - (b) add request route to node Express, as in example: [index.js](https://jeffcoster.github.io/merger/#node-index-js)
4. configure json data to map source json arrays and values, to target html sections, elements and attributes
    - element text maps directly to corresponding source field 
    - attribute value maps directly to corresponding source field 
    - source object collections map to html template sections, for instantion of templates and content filling
5.  - (a) load the html page, so that merger runs and renders the page OR
    - (b) run in node JS

>_Note: Steps 4 and 5 can be iterated over, to configure and test in parts_

## Browser Boiler Plate JS
```javascript

// import latest merger-dd code from unpkg
<script src="https://unpkg.com/merger-dd"></script>

<script type="module">

   import {mergerMap} from "./merger-map.js"
   import {dataSources} from "./content/data-sources.js"
   import {customFunctions} from '../lib/custom-functions.js'

   // set true for development to ouput debug to console
   globalThis.debug = true;

   // optional, usually only for developing mapping, validate merger mapping against schema
   mergerLib.validateMergeMapToSchema(mergerMap);

   // render document (the html template), with dataSources content, as defined by mapping in mergerMap
   mergerLib.compose(mergerMap, dataSources, document, customFunctions);

</script>

```

> Merger is invoked by calling **_compose(mergerMap, dataSources, document, customFuom);_**
>- margerMap is your const containing the mapping json which maps the source json arrays and values to the html template
>- dataSources is your json object that registers the source data (json) objects
>- document is the DOM of the html template. On Node, the html has to be parsed into a DOM
>- customFunctions are your custom functions that can be called from specific extension points of merger

> The **_if(debug)_** section is an optional section, to validate the configured mapping against the merger mapping schema
>- generally, this section is only needed during the configuration of the mapping

> Debug and errors are output in the browser console (or node console for node operation).

## Examples (Rendered live in your Browser):
- [List of Products](https://jeffcoster.github.io/merger/examples/product-list/product-lister-template.html)
- [Tree of Categories (Taxonomy)](https://jeffcoster.github.io/merger/examples/taxonomy/taxonomy-template.html)

[Full documentation, in addition to this readme](https://jeffcoster.github.io/merger/)

