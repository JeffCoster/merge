/*global
 debug
*/

export const customFunctions = {

   priceFormat: function(srcValue) {
      "use strict";
      //in real use this would need a switch case based on context currency
      return "$" + srcValue;
   },

   handleLastLeafNode: function(leafNodeHtml) {
      "use strict";
      // remove <description> opening tag and make basic <li> content for last leaf node
      // this is a specific function requires by the Taxonomy ex2 that ships with Merger

      const leafName = leafNodeHtml.getElementsByTagName("summary");
      leafNodeHtml.innerHTML = (leafName[0].innerHTML);
      return leafNodeHtml;
   },

   doFunction: function(functionSel, srcValue, oldContent) {
      "use strict";
      //do function requested by function selector string
      //returns  new content based on oldContent html (when supplied) and srcValue (when supplied)

      switch (functionSel) {
      case "priceFormat":
         // return src value price display formatted
         return this.priceFormat(srcValue);
         
      case "lastLeafNode":
            // transform html to handle last tree node, giving it no html open selection
            return this.handleLastLeafNode(oldContent);
   
      default:
         if (debug) {
            console.error("No standard or custom function was found. For selector:"
               + functionSel + ", srcValue:" + srcValue + ", oldContent:" + oldContent);
         }
      }
   }
};
