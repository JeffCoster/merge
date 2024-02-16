/*global
 debug
*/

/* Merger
 *
 * Copyright (c) 20024 Jeff Coster
 * Licensed under the Apache-2.0 licence.
 * see https://github.com/JeffCoster/merger
 *
 *  The purpose of this file is to allow switchable selectable functions to be used by the core of Merger
 *  In this file there are some standard, hi re-use functions
 *  Assigning a delegate object, to customFunctions, with similar doFunction method and custom functions,
 *  allows custom functions to be added to merger without affecting the core or these extension functions.
 *  Do not add functions to this file, do so in your own customFunctions file.
**/

import {dbgConsole} from "./merger-functions.js"

export interface ExtFunctions {

   doFunction(functionSel: string, srcValue: any, oldContent: string): string

 }

 class StandardFunctions implements ExtFunctions {

   // delegate object with doFunction for custom functions
   customFunctions: ExtFunctions

   //standard extension functions follow. Your custom functions can be added to this.customFunctions Object.

   prependToExisting(srcValue: any, oldContent: string): string {
      return srcValue + oldContent;
   }

   appendToExisting(srcValue: any, oldContent: string): string {
      return oldContent +srcValue;
   }

   escapeHtml(srcValue): string
   {
      return srcValue.replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
   }

   doFunction(functionSel: string, srcValue: any, oldContent: string): string {
      //do function requested by function selector string
      //returns  new content based on optionally supplied oldContent DOM, and srcValue
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
         if (this.customFunctions) {
            return this.customFunctions.doFunction(functionSel, srcValue, oldContent)
         }
         else if (debug) {
            dbgConsole.warn("No standard function found for selector:"
               + functionSel + ", srcValue:" + srcValue + ", oldContent:" + oldContent +"customFunctionObject: " +this.customFunctions);
         }
      }
   }

}

export var extFunctions: StandardFunctions = new StandardFunctions();
