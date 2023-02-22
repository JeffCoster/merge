/*global
 debug
*/

import {dbgConsole} from "./merger-functions.js"

function priceFormat(srcValue) {
   "use strict";
   //in real use this would need a switch case based on context currency
   return "$" + srcValue;
}


function prependToExisting(srcValue, oldContent) {
   "use strict";
   return srcValue + oldContent;
}

function appendToExisting(srcValue, oldContent) {
   "use strict";
   return oldContent +srcValue;
}

function escapeHtml(escapeMe)
{
   return escapeMe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
}

function handleLastLeafNode(leafNodeHtml) {
   "use strict";
   // remove <description> opening tag and make basic <li> content for last leaf node
   const leafName = leafNodeHtml.getElementsByTagName("summary");
   leafNodeHtml.innerHTML = (leafName[0].innerHTML);
   return leafNodeHtml;
}

export function doFunction(functionSel, srcValue, oldContent) {
   "use strict";
   //do function requested by function selector string
   //returns  new content based on oldContent html (when supplied) and srcValue
   switch (functionSel) {
   case "priceFormat":
      // return src value price display formatted
      return priceFormat(srcValue);
   case "prepend":
      return prependToExisting(srcValue, oldContent);
   case "append":
      return appendToExisting(srcValue, oldContent);
   case "lastLeafNode":
      // transform html to handle last tree node, giving it no html open selection
      return handleLastLeafNode(oldContent);

   case "escape":
      // return html escaped version of src value to use for element or attribute fill
      return  escapeHtml(srcValue);

   default:
      if (debug) {dbgConsole.warn("No function found for selector:" + functionSel); }
   }
}
