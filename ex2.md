## Example 2 Taxonomy Tree

It is recommended to explore example 1 first, as the documentation for this example does not detail some  principles already covered in example 1.

This example renders a hierarchy of product categories, using some source data derived from the 
openly available Google Merchandising Taxonomy. The purpose of this example, is to show how merger can handle a deep hierarchy, both 
in the html, and the source data structure. The example taxonomy is of varying depth, up to six levels deep, with a large dynamic width.

This is how the example displays, with all tree branches in an open state:

<img src="examples/taxonomy/content/ex2_1.png" width="20%" height="20%" />

[Open Taxonomy example to run in your Browser](examples/taxonomy/taxonomy-template.html)

For Node.js with Express server:
- [View example Node.js express index file](examples/express/index.js)
- [Folder with files referenced by example](https://github.com/JeffCoster/merger/tree/main/examples/taxonomy)
- [Custom Functions used in examples](examples/lib/custom-functions.js)

The following notes describe how the example was created.

### Ex2 Step1: Creating the html Template

For this example, a readily available open source html tree was obtained from [I am Kate](https://iamkate.com/code/tree-views/).
This is a good example of a pure html and CSS tree. It has embedded static content for two levels of tree.

In this step of the example:

>- the example static content was removed from the html
>- the html branch sections of the prototype page, going down the page, were cropped to leave one top level branch
>- this was turned into a section template by giving it a top level class of "level1 template"
>- similar section templates were added, as children, up to six levels deep, with the "level1" class number being incremented for each level, e.g. "level2"
>>- the six levels, being enough to deal with the maximum depth of hierarchy 
>- the CSS was left unchanged
>- note that the static example, before any changes, had a slightly different html for the last node of the tree
>>- to deal with this, in merger, a custom function was developed which recognises when the last node in a branch has beed reached and modifies the html to be a last branch node
>>- this is explained in more detail in the custom function section of this example


The following snippet, shows the html template after this task; limited to three levels for brevity. 
```HTML
<body>
   <ul class="tree">
      <li>
         <details open>
            <summary id="tree-header"></summary>
            <ul>
               <li class="level1 template">
                  <details>
                     <summary></summary>
                     <ul>
                        <li class="level2 template">
                           <details>
                              <summary></summary>
                              <ul>
                                 <li class="level3 template">
                                    <details>
                                       <summary></summary>
                                       <ul>
                                          ...
                                       </ul>
                                    </details>
                                 </li>
                              </ul>
                           </details>
                        </li>
                     </ul>
                  </details>
               </li>
            </ul>
         </details>
      </li>
   </ul>
</body>
```
> Points to note:
>- Each unique top level category, level 1,  forms a branch of the tree, where the level1 template and its children are replicated
>- the next level, level 2 children of that level 1, form a child leaf node of level 1, which is the level 2 template
>- and so on, for level 3 and on, until there are no more child leaf nodes in the branch
>- at that point, i.e. when the dynamic source data has no more children for the branch, the custom function will form the last leaf node
>- merger will then start processing the next branch, with the next unique top level 1 category (node)

The full html template, can be downloaded as <a href='examples/taxonomy/taxonomy-template.html' target='_blank' download='taxonomy-template.html' type='text/plain'>taxonomy-template-node.html</a> This file includes the required CSS, and is the full file required for Node.js use.  

### Ex2 Step2 Set up Dynamic Source Data

In practice, the taxonomy tree dynamic data would normally be a JSON service response.
 
Merger requires the source data to be JSON objects, so the service response would be evaluated to the appropriate object graph. For this example though, as in Ex 1, the object graph is just a const within a script, containing some mock data to test with.

The taxonomy data was first obtained as a CSV from Google using the .xls  download link on  [Google Merchant Taxonomy](https://support.google.com/merchants/answer/6324436?hl=en-GB)

This example, only needed a few rows of that data, so only those were used.

The following is an example snippet of the resulting rows:

<img src="examples/taxonomy/content/ex2_csv.png" width="100%" height="20%" > </img>

>- the id column contains the unique id of the lowest level category of the row
>- the other columns are for each level of category, in descending order

This data was converted to JSON using an  online utility. That left a flat representation, where each row of the CSV 
forms an object, with the other columns fields of the same row as data members; for example:

```js
{
      "id": 1,
      "level1": "Animals & Pet Supplies"
},
{
      "id": 3237,
      "level1": "Animals & Pet Supplies",
      "level2": "Live Animals"
},
{
      "id": 2,
      "level1": "Animals & Pet Supplies",
      "level2": "Pet Supplies"
},
{
      "id": 3,
      "level1": "Animals & Pet Supplies",
      "level2": "Pet Supplies",
      "level3": "Bird Supplies"
}

```
Merger requires the source data to be in hierarchical form, rather than this flat representation. For the purposes of this example 
a section of the hierarchy was manually transposed to be hierarchical. On a real project, there would be two options:

1) arrange for the service to return the JSON results in hierarchical format

2) use browser or Node.js code to transpose the results, prior to merger being invoked.

The following snippet shows the hierarchical form of the source data, as required by merger for this example: 

```js
export const taxonomy = [
   {
      "id": 1,
      "level1": "Animals & Pet Supplies",
      "sub2s": [
         {
            "id": 3237,
            "level2": "Live Animals"
         },
         {
            "id": 2,
            "level2": "Pet Supplies",
            "sub3s": [
               {
                  "id": 3,
                  "level3": "Bird Supplies",
                  "sub4s": [
                     {
                        "id": 4989,
                        "level4": "Bird Cages & Stands"
                     },
                     {
                        "id": 4990,
                        "level4": "Bird Food"
                     },
                     {
                        "id": 7398,
                        "level4": "Bird Gyms & Play Stands"
                     },
                     {
                        "id": 4991,
                        "level4": "Bird Ladders & Perches"
                     },
                     {
                        "id": 4992,
                        "level4": "Bird Toys"
                     },
                     {
                        "id": 4993,
                        "level4": "Bird Treats"
                     },
                     {
                        "id": 7385,
                        "level4": "Birdcage Accessories",
                        "sub5s": [
                           {
                              "id": 7386,
                              "level5": "Bird Cage Food & Water Dishes"
                           },
                           {
                              "id": 499954,
                              "level5": "Birdcage Bird Baths"
                           }
                        ]
                     }
                  ]
               },
               {
                  "id": 4497,
                  "level3": "Cat & Dog Flaps"
               },
               {
                  "id": 4,
                  "level3": "Cat Supplies",
                
                //...etc
```

The full source data for this example resides in [googleTaxonomy.js](examples/taxonomy/googleTaxonomy.js). That file also has some global content, 
for title and header, which work in the same way as example 1. 

Data source registration is also composed in the same way as example 1, i.e.

```js
import {taxonomy} from "./googleTaxonomy.js"
import {globalContent} from "./googleTaxonomy.js"

export const dataSources = {};

dataSources.globals = globalContent;
dataSources.taxonomy = taxonomy;
```



<!--stackedit_data:
eyJoaXN0b3J5IjpbLTEwMzU1ODc4NTAsNjAxODk0NTU1LC05ND
U4OTk2MzRdfQ==
-->