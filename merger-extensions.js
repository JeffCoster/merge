/*global
 debug
*/

/* The purpose of this file is to allow extension functions to be used by the core of Merger
   In this file there are some standard hi re-use functions
   Assigning a delegate object, to customFunctions, with similar doFunction method and custom functions,
   allows custom functions to be added to merger without affecting the core
*/

import {dbgConsole} from "./merger-functions.js"

export const extFunctions = {

   // delegate doFunction for custom functions
   customFunctions: undefined,

   prependToExisting: function(srcValue, oldContent) {
      "use strict";
      return srcValue + oldContent;
   },

   appendToExisting: function(srcValue, oldContent) {
      "use strict";
      return oldContent +srcValue;
   },

   escapeHtml: function(escapeMe)
   {
      return escapeMe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
   },

   doFunction: function(functionSel, srcValue, oldContent) {
      "use strict";
      //do function requested by function selector string
      //returns  new content based on oldContent html (when supplied) and srcValue
      switch (functionSel) {
      case "prepend":
         return this.prependToExisting(srcValue, oldContent);

      case "append":
         return this.appendToExisting(srcValue, oldContent);

      case "escape":
         // return html escaped version of src value to use for element or attribute fill
         return  this.escapeHtml(srcValue);

      default:
         // function selector did not find standard ext function so try to find and use a custom ext function
         if (this.customFunctions != undefined) {
            return this.customFunctions.doFunction(functionSel, srcValue, oldContent)
         }
         else if (debug) {
            dbgConsole.warn("No standard function found for selector:"
               + functionSel + ", srcValue:" + srcValue + ", oldContent:" + oldContent);
         }
      }
   }

}
