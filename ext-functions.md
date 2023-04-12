## Extension Functions

Merger has core functionality contained in the merger-functions.js file. 
There are breakout points in the core functionality where a function selector, declared in the mapping, 
may optionally be used to run a selected delegate function to change behaviour as required.

The function selector is just a string name, that has a registered corresponding function.

All extension functions have the same optional parameters, i.e.
 
1. srcValue : the source content, selected already by processing
2. oldContent : the existing content, selected already by processing

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
| oldContent | document when thi is a top level collection: parent html section instance when this collection has one  |
| returns | oldContent, transformed as required by this function |
### Standard Extension Functions

 