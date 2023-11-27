## Using merger-dd with Node JS and Express

Using merger with the Express server module, is similar to any other template engine in Express. [Example using pug as a template engine](https://expressjs.com/en/guide/using-template-engines.html)

- First, Install merger-dd module, using npm.
- Create your html templates and mappings, in the same way as the browser examples.
> Note: The node mapping is the same for browser and node use, with one exception:
>- The node mapping **must** include a path to to the html template. That path being relative to the mapping file location. 

Then use code similar to the example below.

```javascript

import customFunctions from "path to your custom functions" // optional
import express from "express"

// import merger like this
import * as __merger from "merger-dd"

// enable or disable debug to console
global.debug = false;

var dataSources4View;
var app = express();

app.set("views", "./examples") // specify the views directory

// register the template engine, to use .merger as the json mapping file extension
app.set("view engine", "merger") 

// set route, for //products on the url 
app.get("/products", (req, res) => {
  dataSources4View = dataSources;  // set data sources (content)

  // render using pl-merger-map.merger as the json mapping file, dataSources content object, 
  // and optionally, your customFunctions

  res.render("product-list/pl-merger-map.merger", {dataSources4View, customFunctions});
})

// set route for //taxonomy on the url
app.get("/taxonomy", (req, res) => {
  dataSources4View = dataSourcesLevels;
  // no need to use .merger to identify the mapping file
  res.render("taxonomy/tx-merger-map", {dataSources4View, customFunctions});
});

app.use(express.static("examples/static"));

app.listen(3000);

console.log("Node listening on port 3000");

```

> Code steps: to use Merger in Express, as in the example code above
>- import express and merger
>- set your views directory
>- register "merger" as the view engine
>- add routes, registering the url pattern
>- within each route, call res.render with parameters:
>> 1. path to the json file, having .merger file extension, containing mapping for this view
>> 2. options object, first object being the dataSources object (content) for the view
>> 3. options object, second object being your (optional) custom functions

> Note: dataSources object (content) will often be formed via service calls, not shown
