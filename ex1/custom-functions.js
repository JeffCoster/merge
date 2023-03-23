/*global
 debug
*/

// The purpose of this file is to allow custom functions to be added to Merger, by anyone using Merger
//
import {dbgConsole} from "../merger-functions.js"
import {extFunctions} from "../merger-extensions.js"

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

extFunctions.customFunctions = customFunctions;
