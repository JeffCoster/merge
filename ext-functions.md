## Extension Functions

Merger has core functionality as standard, but when necessary this can be extended, by the use of delegate functions. 
At specific points in the mapping, delegate function names can be declared, and their cooresponding function will be used when processing that point in the mapping. 

There are some standard functions, that ship with Merger, and developers can add custom extension functions, and selectors, where needed.

All extension functions have the same optional parameters, i.e.
 
1. srcValue : the source content, selected already by processing
2. oldContent : the existing target content, selected already by processing

The return value of the function, will be used by the processing, instead of the srcValue 

The optional break out (delegation) points are:

| mapping point | elementFill.elementsToDo[].functionSel |
| - | - |
| purpose | formatting selected source value, prior to element content fill |
| srcValue | content selected to fill the element |
| oldContent | existing content of selected target element, if any, e.g. to pre- or post-fix srcValue |
| returns | content to fill element, as transformed by this function |

| mapping point | elementFill.elementsToDo[].itsAttributes[].functionSel |
| - | - |
| purpose | formatting selected source value, prior to attribute content fill |
| srcValue | content selected to fill the element |
| oldContent | existing content, of selected target html attribute, if any, e.g. to pre- or post-fix srcValue |
| returns | content to fill attribute, as transformed by this function |

| mapping point | collection.mtCollectionFunctSel |
| - | - |
| purpose | handle case where the source array is empty |
| srcValue | not used as there is no source array, or it is empty |
| oldContent | the parent html node, of this section template  |
| returns | oldContent, transformed as required by this function |

### Standard Extension Functions

These are the standard extension functions, shipped with merger, contained in the file merger-extensions.js. 
They are general purpose element and attribute content transformations, as explained in the following table:

| function selector value | description |
| - | - |
| "escape" | html escape the selected source value used to fill target content |
| "append" | append the existing selected target content with the selected source value and use it to fill the target content |
| "prepend" | prepend the existing selected target content with the selected source value and use it to fill the target content|

> with append and prepend, the templates existing content, will be used to prepend or append the new source content.

### Custom Extension Functions

These are custom extension functions, that can be added to your project.
 
 The Product Lister and Taxonomy examples, use example Custom Functions:

- the Product Lister, has a very basic outline example of a currency format function

- the Taxonomy, has a function for handling the last leaf node of a taxonomy tree; when the source collection is empty.

To create your own custom functions file, the <a href="examples/lib/custom-functions.js" target="_blank">example customFunctions object</a>, which is used by the examples, can be used as a guide. The following are the necessary steps:

1) create your file to include, such as custom-functions.js, in a directory of your project

2) this should export a const object customFunctions
```js
/*global
debug
*/
export const customFunctions = {
	// ...
}
```
3) each custom function you require, needs adding to that object, and must follow the pattern of the examples, in terms of what parameters it uses, and the result content it returns, e.g.
```js
export const customFunctions = {

   priceFormat: function(srcValue) {
      //in real use this would need a switch case based on contextual currency
      return "$" + srcValue;
   },
```

4) your object also needs a doFunction to select your function, based on your function selector name, e.g.

```js
export const customFunctions = {
   doFunction: function(functionSel, srcValue, oldContent) {
      //do function requested by function selector string
      //returns  new content based on oldContent html (when supplied) and srcValue (when supplied)

      switch (functionSel) {
      // 'priceFormat' is the function selector string to use in mapping
      case "priceFormat":
         // return src value price display formatted
         return this.priceFormat(srcValue);
		
	  // warn if functionSelector in mapping not found
      default:
         if (debug) {
            console.error("No custom function found either, for selector:"
               + functionSel + ", srcValue:" + srcValue + ", oldContent:" + oldContent);
         }
      }
   }
}

```



<!--stackedit_data:
eyJoaXN0b3J5IjpbNzUyNzA0OTY1XX0=
-->
