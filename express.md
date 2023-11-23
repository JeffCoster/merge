## Using merger-dd with Node JS and Express

Using merger with the Express server module, is similar to any other template engine in Express.


```javascript

import customFunctions from "path to your custom functions" // optional
import express from "express"

// import merger like this
import * as __merger from "merger"

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
   res.render("taxonomy/tx-merger-map", {dataSources4View, customFunctions});
});

app.use(express.static("examples/static"));

app.listen(3000);

console.log("Node listening on port 3000");

```

> Steps to use Merger in Express, as in example above
>- import express and merger as shown above
>- set your views directory
>- register "merger" as the view engine
>- add routes, registering the url pattern
>- within each route, call res.render with parameters:
>-- 1. path to the json file, with .merger extension, that has mapping for this view
>-- 2. options object, first object being the dataSources object (content) for the view
>-- 3. options object, second object being your (optional) custom functions

> Note: dataSources object (content) will often be formed via middleware
