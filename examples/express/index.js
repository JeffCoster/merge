import {customFunctions} from "../../examples/lib/custom-functions.js";
import {dataSources} from "../../examples/product-list/content/data-sources.js"
import {dataSources as dataSourcesLevels} from "../../examples/taxonomy/content/data-sources.js"
import express from "express"
import * as __merger from "merger"

global.debug = false;

var dataSources4View;

var app = express();


app.set("views", "./examples") // specify the views directory
app.set("view engine", "merger") // register the template engine

app.get("/products", (req, res) => {
   dataSources4View = dataSources;  
   res.render("product-list/pl-merger-map.merger", {dataSources4View, customFunctions});
})

app.get("/taxonomy", (req, res) => {
   dataSources4View = dataSourcesLevels;
   res.render("taxonomy/tx-merger-map", {dataSources4View, customFunctions});
});

app.use(express.static("examples/static"));

app.listen(3000);

console.log("Node listening on port 3000");