### Ex1 Step 3: Configuring (Mapping) of Source Data to html

This step illustrates a major benefit of merger. Using data configuration (mapping), to render the html, rather than writing code.

There are three levels, of html, that need mapping for this example.

1. Top (Document Level) --mapping elements and their attributes, to source values, before any instantiation of section templates.

2. Product Section Template --mapping to the collection of source product objects --for replication, filling, and insertion of product instances.

3. Size Template --mapping to the size data, for replication, filling, and insertion of the sizes for each product.

> The mapping for Example 1, is contained in the ex1/merger-map.js file. This mapping object, could of course be streamed from a service and evaluated. But for this example, it is already a named const.

The first step, the top level, is the simplest; as it just involves mapping source data, to elements, and attribute values.
The following snippet shows this part of the mapping:

```js
export const mergerMap = {
   "elementFills": [
      {
         "dataSrcJpath": "globals",
         "elementsToDo" : [
            {
               "elementTgtCss": "#products-header",
               "elementValueSrcJpath": "pageTitle"
            },
            {
               "elementTgtCss": "title",
               "elementValueSrcJpath": "pageTitle"
            },
            {
               "elementTgtCss": ".size-label",
               "elementValueSrcJpath": "sizeLabel"
            }
         ]
      },
      {
         "dataSrcJpath": "productList",
         "elementsToDo" : [
            {
               "elementTgtCss": "#products-header-img",
               "itsAttributes": [
                  {
                     "tgtAttrName": "src",
                     "srcJpath": "$..thumbnail"
                  },
                  {
                     "tgtAttrName": "alt",
                     "srcJpath": "$..thumbnail"
                  }
               ]
            }
         ]
      }
   ],
```

>- elementFills is an object, containing an array of objects, each object contains element to source mappings --for a single data source
>>- in the example, there are two of these objects, one for data source *globals*, and one for *productList*
>>- the *dataSrcJpath* values, are jsonpath to the required data source --within dataSources, i.e. *dataSources.globals*, and *dataSources.productList*

>- for each data source, the *elementsToDo* array, contains objects, that each map one element to a data source content value
>>- the *elementTgtCss* values, are CSS to select each target element
>>- the *elementValueSrcJpath* values, are jsonpath to select the content value for the element, the jsonpath is relative to the data source
>>- #*products-header* selects the element with id="products-header", for filling with the source value: "Product Lister", from *globalContent.pageTitle*.

>- with dataSource *productList*, the CSS #*products-header-img*, selects the &lt;img&gt; tag with id="products-header-img"
>>- the *itsAttributes* objects, define mappings for the img element attributes
>>- the *srcJpath* json of "$..thumbnail" selects all values of data member "thumbnail", however the merger code will only use the first one, as it targets a single element and its attributes --so, img attributes: src and alt, will be filled with the content of the first thumbnail in the *productList*

The second step in the mapping task --mapping the product template html, to its source objects --is shown in the following snippet:

```json
  "collections": [
      {
         "dataSrcJpath": "productList",
         "templateId": "product-template-1",
         "srcIdPath": "id",
         "startDataSrcJpath": "minProducts",
         "maxToShowDataSrcJpath": "maxProducts",
         "instanceFill": {
            "elementFills": [
               {
                  "dataSrcJpath": "instance",
                  "elementsToDo" : [
                     {
                        "elementTgtCss": ".product-title",
                        "elementValueSrcJpath": "title",
                        "functionSel": "escape"
                     },
                     {
                        "elementTgtCss": ".product-id",
                        "elementValueSrcJpath": "id"
                     },
                     {

                        "elementTgtCss": ".price",
                        "elementValueSrcJpath": "id",
                        "functionSel": "priceFormat"
                     },
                     {
                        "elementTgtCss": ".thumbnail",
                        "elementValueSrcJpath": "title",
                        "itsAttributes": [
                           {
                              "tgtAttrName": "src",
                              "srcJpath": "thumbnail"
                           },
                           {
                              "tgtAttrName": "alt",
                              "srcJpath": "thumbnail"
                           }
                        ]
                     }
                  ]
               }
            ],
```

>- collections is an an array of objects, where each object, contains section template to source mappings for a single data source
>- in the example, there is one collection object, for data source: *productList* --within this:
>>- the dataSrcJpath value is the json path to a data source within dataSources, i.e *dataSources.productList*
>>- the *templateId* identifies the ID, of the target product section template element
>>- the *minProducts*, and *maxProducts*, are json paths variables containing start and end bounds for the displayed list of products, i.e. *dataSources.minProducts*, and *dataSources.maxProducts* 

>- for this collection, the instanceFill has an elementFills object, to map elements of each instantiated template, to their corresponding source object values. 
>>- so instance [n], of the template, maps to source object [n] of its list, but it is only necessary, to map one instance, to one source object
>>- the *functionSel* "escape" is used to escape any html special chars in the product title
>>- the functionSel "priceFormat" is used to format the price, in this example it just prepends a $ sign
>>- other elementFills aspects have already been explained.

>- the srcIdPath, of each collection, deserves explanation
>>- it is the jsonpath, relative to the source object, of the unique Id to use, to help form a unique id, within the target html page
>>- in this example, each product in the source list has an 'id' field, with values that are unique product identifiers
>>- the srcIdPath= *id* instructs merger to use this value, when forming the product Ids
>>- at runtime the default behaviour, for forming the target html instance ID is 

```html
        <first class name of template> +_  +source ID
``` 
>- so in this example, for a product with source id of 50, the snippet of target html would be:

```html
        <div class="product" id="product_50">
           ...
        </div>
```
> note: for child collections, e.g product sizes, the parent id, prepends the ids of the children

The third, and last step of the mapping task, maps source (product) sizes, to html product instance sizes. 
The following JSON mapping snippet shows this:

```jsonc
  "collections": [
      {
         "dataSrcJpath": "productList",
         "templateId": "product-template-1",
         "srcIdPath": "id",
         "startDataSrcJpath": "minProducts",
         "maxToShowDataSrcJpath": "maxProducts",
         "instanceFill": {
            "elementFills": [
               // already explained
            ],
            "collections": [
               {
                  "dataSrcJpath": "sizes",
                  "templateClassList": "attribute-size template",
                  "srcIdPath": "",
                  "instanceFill": {
                     "elementFills": [
                        {
                           "dataSrcJpath": "instance",
                           "elementsToDo" : [
                              {
                                 "elementTgtCss": "label",
                                 "elementValueSrcJpath": "",
                                 "functionSel": "prepend"
                              },
                              {
                                 "elementTgtCss": "input",
                                 "itsAttributes": [
                                    {
                                       "tgtAttrName": "input",
                                       "srcJpath": ""
                                    },
                                    {
                                       "tgtAttrName": "name",
                                       "srcJpath": "",
                                       "functionSel": "append"
                                    },
                                 ]
                              }
                           ]
                        }
                     ]
```

>- The sizes are a child template of the product, so, the collection to map the sizes, is a child of the collection that maps the products
>- the *dataSrcJpath* of "sizes" is relative to the parent instance, and maps to the sizes array
>- the *srcIdPath* is not declared, as there is no natural unique key for each size, this makes the merger code use the actual value of the size, e.g. 7
>>- an example target ID for the sizes, once the parent ID is prepended, would be like this in the html:

```html
        <td class="attribute-size" id="product_50_attribute-size_10">
```

>- the *elementsToDo[0]* for element &lt;label&gt; has:
>>- an undeclared *elementValueSrcJpath*, which means that merger will use the whole of the source object instance, as the content value, this approach is needed, as in this case the object in the sizes array, is just a string, e.g. "7"
>>- a *functionSel* of "prepend" to ensure that the source content is prepended to the existing contents of the template, the sizes template being as follows, where the size needs to be added before the &lt;br&gt; tag

```html
        <td class="attribute-size template">
           <label><br>
                 <input type="radio" name="size-" value=""><br>
           </label>
        </td>
```

>- the elementsToDo[1] for element "input" has:
>>- an undeclared srcJpath, for each attribute mapping, meaning: use the whole source content, e.g."10"
>>- for attribute name: a functionSel of "append", meaning: append the source content, to existing content of the name attribute, 
e.g. name="*size-10*"

So, the end result of processing the collection mapping, results in the html for a product instance, being like:

```html
<div class="product" id="product_59">
         <a href="">
            <img class="thumbnail" width="60px" height="60px" src="https://dummyjson.com/image/i/products/59/thumbnail.jpg" alt="https://dummyjson.com/image/i/products/59/thumbnail.jpg">
         </a><br>
         <span class="product-id">59</span><br>
         <span class="product-title">Spring &amp; summer shoes</span><br>
         <span class="price">$59</span><br>
         <form class="attribute-sizes" name="sizes">
            <table>
               <caption class="size-label">Sizes</caption>
               <tbody>
                  <tr>
                     <td class="attribute-size" id="product_59_attribute-size_11">
                        <label>11<br>
                           <input type="radio" name="size-11" value="" input="11"><br>
                        </label>
                     </td><td class="attribute-size template">
                        <label><br>
                           <input type="radio" name="size-" value=""><br>
                        </label>
                     </td>
                  </tr>
               </tbody>
            </table>
         </form>
      </div>
```
