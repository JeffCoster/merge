## Extension Functions

Merger has core functionality contained in the merger-functions.js file. 
There are breakout points in the core functionality where a function selector, declared in the mapping, 
may optionally be used to select a delegate function to perform additional processing. There are some standard functions that 
ship with Merger and developers can add custom extension functions where needed.

The function selector is just a string name, that has a registered corresponding function.

All extension functions have the same optional parameters, i.e.
 
1. srcValue : the source content, selected already by processing
2. oldContent : the existing target content, selected already by processing

The return value of the function will be used by the processing, instead of the srcValue 

The optional break out (delagation) points are:

| mapping point | elementFills[].elementsToDo[].functionSel |
| - | - |
| purpose | formatting selected source value, prior to element content fill |
| srcValue | content selected to fill the element |
| oldContent | existing content of selected target element, if any, usually to pre or post fix srcValue |
| returns | content to fill element, as transformed by this function |

| mapping point | elementFills[].elementsToDo[].itsAttributes[].functionSel |
| - | - |
| purpose | formatting selected source value, prior to attribute content fill |
| srcValue | content selected to fill the element |
| oldContent | existing content, of selected target html attribute, if any, usually to pre or post fix srcValue |
| returns | content to fill element, as transformed by this function |

| mapping point | collections[].mtCollectionFunctSel |
| - | - |
| purpose | handle case where source array is empty |
| srcValue | not used as there is no source array or it is empty |
| oldContent | document when this is a top level collection: parent html section instance when this collection has one  |
| returns | oldContent, transformed as required by this function |

### Standard Extension Functions

These are the standard extension functions, shipped with merger, contained in file merger-extensions.js. 
They are general purpose element and attribute content transformations, explained in the following table:

| function selector value | description |
| - | - |
| "escape" | html escape the selected source value used to fill target content |
| "append" | append the existing selected target content with the selected source value and use it to fill the target content |
| "prepend" | prepend the existing selected target content with the selected source value and use it to fill the target content|

> with append and prepend the templates existing target content needs to contain the desired content used to prepend or append the new source content.

### Custom Extension Functions

These are custom extension functions, that can be added to your project.
 
There are examples of this in:

- example 1, file ex1/custom-functions.js, which has a very basic outline example of a currency format function

- example 2, file ex2/custom-functions.js, which has a function, specific to example 2, for handling the last leaf node of a taxonomy tree

To create your own custom functions file, the examples can be used as a guide. The following are the necessary steps

1) create a file to include, such as custom-functions.js, in a directory of your project

2) As per the examples, this needs to import from two core merger files, e.g
```javascript
import {dbgConsole} from "../merger-functions.js"
import {extFunctions} from "../merger-extensions.js"
```
> ensure the relative file paths are ok relative to your file

3) export const object customFunctions, which can be based on the examples, e.g. ex1

``` javascript
export const customFunctions = {

   priceFormat: function(srcValue) {
      "use strict";
      //in real use this would need a switch case based on context currency
      return "$" + srcValue;
   },

   doFunction: function(functionSel, srcValue, oldContent) {
      "use strict";
      //do function requested by function selector string
      //returns  new content based on oldContent html (when supplied) and srcValue (when supplied)

      switch (functionSel) {
      case "priceFormat":
         // return src value price display formatted
         return this.priceFormat(srcValue);

      default:
         if (debug) {
            dbgConsole.warn("No custome function found either, for selector:"
               + functionSel + ", srcValue:" + srcValue + ", oldContent:" + oldContent);
         }
      }
   }
}

```

4) Follow the pattern of the priceFormat function, to add your own functions. 
Each new function needs adding to the one and only customFunctions object, as per the priceFormat example. 
A case statement needs adding to doFunction, to map your function selector name to your new function. 
Your function can use either or all of the srcValue and oldContent parameters, as required, and return 
the desired result content.


