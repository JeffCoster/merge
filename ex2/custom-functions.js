/*global
 debug
*/

// The purpose of this file is to allow custom functions to be added to Merger, by anyone using Merger
//
import {dbgConsole} from "../../merger-functions.js"
import {extFunctions} from "../../merger-extensions.js"

export const customFunctions = {

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
      case "lastLeafNode":
         // transform html to handle last tree node, giving it no html open selection
         return this.handleLastLeafNode(oldContent);

      default:
         if (debug) {
            dbgConsole.warn("No custome function found either, for selector:"
               + functionSel + ", srcValue:" + srcValue + ", oldContent:" + oldContent);
         }
      }
   }
}

extFunctions.customFunctions = customFunctions;
