### Ex2 Step 3: Configuring (Mapping) of Source Data to html

This step maps the Google taxonomy content, of step 2 to the html template of step 1.

The first step, the top (Document Level) is just mapping elements and their attributes, before any instantiation of section templates.
In this case, some global content for the page title, and the header label for the tree.

The full mapping, for Example 2, is contained in the <a href="examples/taxonomy/merger-map.js" target="_blank">merger-map.js</a> file. As an object graph, ready for browser import. 

For Node.js, the same mapping, is in a JSON file, with a .merger file extension, <a href="examples/taxonomy/tx-merger-map.merger">tx-merger-map.merger</a>. The Merger template engine, will stream in, and parse the file. In this case, though, the mapping also declares the relative path to the html template, which will be streamed in by the Merger template engine.

The Snippet for the first mapping step is:
```js
export const mergerMap = {
   "elementFills": [
      {
         "dataSrcJpath": "globals",
         "elementsToDo": [
            {
               "elementTgtCss": "title",
               "elementValueSrcJpath": "pageTitle"
            },
            {
               "elementTgtCss": "#tree-header",
               "elementValueSrcJpath": "treeHeader"
            }
         ]
      }
   ],
```

> This one to one top level mapping is similar to Ex 1. So look at that for more detail.

The second step in the mapping task, follows on from the first object, and maps the taxonomy level section templates to their source object arrays. 

This is shown in the following snippet:

```json
"collections": [
      {
         "dataSrcJpath": "taxonomy",
         "templateId": "",
         "templateClassList": "level1 template",
         "srcIdPath": "id",
         "instanceFill": {
            "elementFills": [
               {
                  "dataSrcJpath": "instance",
                  "elementsToDo": [
                     {
                        "elementTgtCss": "summary",
                        "elementValueSrcJpath": "level1"
                     }
                  ]
               }xc
            ],
            "collections": [
               {
                  "dataSrcJpath": "sub2s",
                  "templateId": "",
                  "templateClassList": "level2 template",
                  "srcIdPath": "id",
                  "mtCollectionFunctSel": "lastLeafNode",
                  "instanceFill": {
                     "elementFills": [
                        {
                           "dataSrcJpath": "instance",
                           "elementsToDo": [
                              {
                                 "elementTgtCss": "summary",
                                 "elementValueSrcJpath": "level2"
                              }
                           ]
                        }
                     ],
                     "collections": [
                        {
                           "dataSrcJpath": "sub3s",


```

>- the snippet just shows the mapping for the top 2 levels, and a small part of the level 3
>>- in the full mapping, the maximum of 6 levels are mapped

>- collections within the instanceFill of a collection, are how merger maps the hierarchy of section templates to source object arrays
>>- in example 1 this approach was used to map products in a list, and to list sizes for each of those products
>>- in this example, it is used to map the taxonomy tree, e.g level 1 to child level 2s to child level 3s etc

The main aspects of the html section, to tree node source mapping, are described in the following table:

| collections[0] | (top) level 1 mapping|
|:-------------|:--|
| .dataSrcJpath = taxonomy | jsonPath to the source data taxonomy tree root  |
| .templateClassList = level1 template | class list of the level 1 html section template |
| .srcIdPath = id | id is jpath to taxonomy root[instance].id, for use as the unique (level 1) node ID

| collections[0].instanceFill.elementFills[0] | element fills required for level 1 nodes|
| :------- | :--- |
| .elementsToDo[0].elementTgtCss = summary | template relative CSS, to find summary target element for showing node name |
| .elementsToDo[0].elementValueSrcJpath = level1 | jpath to instance.level1, for use as the node name |

| collections[0].instanceFill.collections[0] |level 2 mapping |
| :------- | :--- |
| .dataSrcJpath = sub2s | jsonPath, relative to parent (level 1) node, to the child array of level 2 nodes  |
| .templateClassList = level2 template | class list of the level 2 html section template |
| .srcIdPath = id | id is jpath to level 2 id, for use as the unique (level 2) node ID |
| .mtCollectionFunctSel = lastLeafNode| registered name of custom function to invoke if the source array is empty, in this example meaning the last leaf node of the branch was reached

| collections[0].instanceFill.collections[0].instanceFill.elementFills[0] | element fills required for level 2 nodes|
| :------- | :--- |
| .elementsToDo[0].elementTgtCss = summary | template relative CSS, to find summary target element for showing node name |
| .elementsToDo[0].elementValueSrcJpath = level2 | jpath to instance.level2, for use as the level 2 node name |

| collections[0].instanceFill.collections[0].instanceFill.collections0 |level 3 mapping |
| :------- | :--- |
| ... pattern continues for level 3 and subsequent levels | ... |

In Operation:

>- to start with, merger will pick the top level array of the taxonomy tree source content, as indicated by the dataSrcJpath of "taxonomy"
>- the first element of that array will be processed, and the "level 1" content, i.e. "Animals & Pet Supplies" will fill the "summary" element
>- for that *instanceFill*, merger will then find the child data source array "sub2s" and the "level 2" content "Live Animals" will 
fill the &lt;summary&gt; element
>- the level 2 node "Live Animals" in the data source, has no children, so when merger looks for a sub3s array it finds none, so:
>>- the 'empty collection' custom function is invoked, as declared by the 'mtCollectionFunctionSel' = 'lastLeafNode'
>>- this custom function, adapts the html, so that the last node in a branch, will appear as it should, with no plus or minus symbol
>- processing of the branch ends, and continues with the next level 1 branch
> 
> note that the mapping for level 2 and lower levels, each specify the same "mtCollectionFunctionSel", this is because the last branch node could be at any level below level 1


> Written with [StackEdit](https://stackedit.io/).
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE1NzMyOTcyXX0=
-->