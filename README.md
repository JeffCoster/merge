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
- run in Node.jsJS or Browser
- facilitate code extensions, where necessary, at suitable break out points
>- only for cases where mapping cannot meet requirements

## Technologies
Typescript, JjavaSscript, jsonPath, CSS, html, JSON, JSONjson, json schema

## Overview Of Typical Steps to use Merger to Render in a Browser(a) or Node JS(b)
1. with static html, which often starts as a preview example of the dynamic page
    - remove example preview content, leaving mark up
    - collapse each repeated html section into a single template (hidden) section
2. prepare content source objects
    - each Data Source needs to be available to the merger JS code, as a const
    - each Data Source needs to be registered in the Data Sources object.
    >- Note: content source objectData Sources will often be the results of a service call
3. set up render invocation, by either:
    - (a) add [browser boiler plate JS](https://jeffcoster.github.io/merger/#browser-boiler-plate-js), in a script, in the html OR
    - (b) using merger with Nnode.js and Express, as explained for this <a href="https://jin this [example](https://github.com/JeffcCoster.github.io/merger//merger/blob/pages/express.md#using-merger-dd-with-node-js-and-express-1" target="_blank">example</a>)
4. configure JSONjson data to map source JSONjson arrays and values, to target html sections, elements, and attributes
    - element text maps directly to corresponding source field 
    - attribute value maps directly to corresponding source field 
    - source object collections map to html template sections, for instantiation of templates and content filling.
    >- Note: for node the mapping **must** declare the relative path to the template html
5.  - (a) load the html page, so that merger runs and renders the page OR
    - (b) run in Nnode.js JS

>_Note: Steps 4 and 5 can be iterated over, to configure and test in parts_

## Browser Boilerp Plate JS
```javascript

// import latest merger-dd code from unpkg
<script src="https://unpkg.com/merger-dd"></script>

<script type="module">

   import {mergerMap} from "path to your ./merger -map object.js"
   import {dataSources} from "path to your ./content /dataS-sources object.js"
   import {customFunctions} from 'path to you ../lib/customF-functions object - optional.js'

   // set true for development to ouput debug to console
   globalThis.debug = true;

   // optional, usually only for developing mapping, validate merger mapping against schema
   mergerLib.validateMergeMapToSchema(mergerMap);

   // render document (the html template), with dataSources content, as defined by mapping in mergerMap
   // using your customFunctions (optional)
   mergerLib.compose(mergerMap, dataSources, document, customFunctions);

</script>

```

> Merger is invoked by calling **_compose(mergerMap, dataSources, document, customFunctionsom);_**
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

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE3MTI4ODkwOV19
-->