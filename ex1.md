# Examples

This section describes some examples using Merger.

The examples, work in a Browser, or Node.js, but it is recommended to first try out Merger in a Browser, for experimentation.  

The mapping JSON, that maps the source data to the html, is the same, for a Browser, or Node.js, with two exceptions:

-  the Express Node.js mapping, specifies a relative path to the html template file
-  the Node.js mapping, is stored in a JSON file, that is streamed in by the Merger template engine. For the Browser, it is imported as an object graph.

## Example 1: Simple Product Lister

This example is for a simple list of products, using some mock JSON source data for shoes. Each product has a sub list of shoe sizes. 

As a prior step, it is assumed, that a html developer, has created the static html, and embedded the content --to prototype how the page would look, for a list of two products.

This is how that prototype page would display:

<img src="examples/product-list/content/ex1_1.png" width="20%" height="20%" />

<a href="examples/product-list/product-lister-template.html" target="_blank">Open Product Lister example to run in your Browser</a>

For Node.js, with Express server:
- <a href="examples/express/index.js" target="_blank">view example Node.js express index file</a>
- [folder, with files referenced by example](https://github.com/JeffCoster/merger/tree/main/examples/product-list)
- <a href="examples/lib/custom-functions.js" target="_blank">custom functions, used in examples</a>

The following notes describe how the example was created.

### Ex1 Step1: Creating the html template

In this step the example static content is removed from the prototype html, and each repeated section, for the products, is collapsed to form a hidden 'section template' --containing the mark-up for a single product.

> It is possible to go straight to building an html template, without a prototype page, with example static content. However, it is easier to illustrate what Merger requires of a template, by having the static prototype --and turning that into a template. It also helps to confirm that the html, and CSS, meet requirements

The following shows the prototype html body; with embedded content:

```html
<body>
   <p id="products-header">Product Lister Page</p>
   <img id="products-header-img" width="100px" height="100px" src="https://dummyjson.com/image/i/products/59/thumbnail.jpg" />
   <div class="products">
      <div class="product" id="product_56">
         <a href="">
            <img class='thumbnail' width="60px" height="60px" src="https://dummyjson.com/image/i/products/56/thumbnail.jpg" alt="">
         </a><br>
         <span class='product-id'>56</span><br>
         <span class='product-title'>Sneakers Joggers Shoes</span><br>
         <span class='price'>$40.00</span><br>
         <form class="attribute-sizes" name="sizes">
            <table>
               <caption class='size-label'>Sizes</caption>
               <tr>
                  <td class="attribute-size">
                     <label>6<br>
                        <input type="radio" name="size-6" value="6"><br>
                     </label>
                  </td>
                  <td class="attribute-size">
                     <label>7<br>
                        <input type="radio" name="size-7" value="7"><br>
                     </label>
                  </td>
               </tr>
            </table>
         </form>
      </div>
      <div class="product" id="product_57">
         <a href="">
            <img class='thumbnail' width="60px" height="60px" src="https://dummyjson.com/image/i/products/57/thumbnail.jpg" alt="">
         </a><br>
         <span class='product-id'>57</span><br>
         <span class='product-title'>Loafers for men</span><br>
         <span class='price'>$47.00</span><br>
         <form class="attribute-sizes" name="sizes">
            <table>
               <caption class='size-label'>Sizes</caption>
               <tr>
                  <td class="attribute-size">
                     <label>8<br>
                        <input type="radio" name="size-8" value="8"><br>
                     </label>
                  </td>
                  <td class="attribute-size">
                     <label>9<br>
                        <input type="radio" name="size-9" value="9"><br>
                     </label>
                  </td>
               </tr>
            </table>
         </form>
      </div>
   </div>
</body>
```
Removing the static prototype content, and collapsing the repeated product and size html into section templates, gives:

```html
<body>
   <p id="products-header"></p>
   <img id="products-header-img" width="100px" height="100px" src="" />
   <div class="products">
      <div class="product template" id="product-template-1">
         <a href="">
            <img class='thumbnail' width="60px" height="60px" src="">
         </a><br>
         <span class='product-id'></span><br>
         <span class='product-title'></span><br>
         <span class='price'></span><br>
         <form class="attribute-sizes" name="sizes">
            <table>
               <caption class='size-label'></caption>
               <tr>
                  <td class="attribute-size template">
                     <label><br>
                        <input type="radio" name="size-" value=""><br>
                     </label>
                  </td>
               </tr>
            </table>
         </form>
      </div>
   </div>
</body>
```
> Points to note:
>- Example static content, that will be provided dynamically from source data, is removed. This isn't always necessary, as Merger will replace it at runtime. However:
>-- it simplifies the template
>-- makes it pure mark-up
>-- avoids the chance of leaving the prototype content showing at runtime.
>- The div with class of 'products' marks the start and end of the list of products
>-- Its child div, with class of 'product template' is the mark up for a single product in the list, with no content
>- At runtime the dynamically created *product* sections, will be inserted directly before the *product template* 
>- The example two products, of the prototype html, are removed
>- Section templates, such as 'product template' always have a secondary class of template. 
The CSS will always need a rule to hide sections with a class of template, e.g.

```css
.template {display: none;}
```
>
>- The product sizes need to appear within their parent product section, and as they are a list of dynamic length, they also have a section template, with a class of *attribute-size template*
>>- In this case the template is tagged with a &lt;td&gt; element, which shows that the template section does not have to be a &lt;div&gt;
>>- It also illustrates that changes to html can often be made, without changing merger configuration
>>- The input element has a name attribute with content of "size-". This is used by merger as a prefix for that size name, 
e.g. name="size-**7**"

### Ex1 Step2 Set up Dynamic Source Data

In practice the product source data would normally be a json service response. 
Merger requires the source data to be json objects, so the service response would be evaluated to to the appropriate object graph.
For this example though, the object graph is just a const within a script, containing some mock data to test with.

The mock data is an array of 5 products, in this case shoes, and each one has a collection of available sizes.
There is also an object, 'globalContent', listing some name value pairs, which are the pageTitle, pageImg, and sizeLabel.

The following is a snippet of the file, product-list-shoes.js, which details the globalContent and teo of the products:

```JavaScript
export const globalContent = {
   "pageTitle":"Product Lister",
   "pageImg":"https://dummyjson.com/image/i/products/57/1.jpg",
   "sizeLabel":"Sizes",
};

export const prods = {
   "products": [
      {
         "id": 56,
         "title": "Sneakers Joggers Shoes",
         "description": "Gender: Men , Colours: Same as DisplayedCondition: 100% Brand New",
         "price": 40,
         "discountPercentage": 12.57,
         "rating": 4.38,
         "stock": 6,
         "brand": "Sneakers",
         "category": "mens-shoes",
         "thumbnail": "https://dummyjson.com/image/i/products/56/thumbnail.jpg",
         "images": [
            "https://dummyjson.com/image/i/products/56/1.jpg", "https://dummyjson.com/image/i/products/56/2.jpg", "https://dummyjson.com/image/i/products/56/3.jpg", "https://dummyjson.com/image/i/products/56/4.jpg", "https://dummyjson.com/image/i/products/56/5.jpg", "https://dummyjson.com/image/i/products/56/thumbnail.jpg"
         ],
         "sizes": [
            6, 7, 8
         ]
      },
      {
         "id": 57,
         "title": "Loafers for men",
         "description": "Men Shoes - Loafers for men - Rubber Shoes - Nylon Shoes - Shoes for men - Pure Nylon (Rubber) Export Quality.",
         "price": 47,
         "discountPercentage": 10.91,
         "rating": 4.91,
         "stock": 20,
         "brand": "Rubber",
         "category": "mens-shoes",
         "thumbnail": "https://dummyjson.com/image/i/products/57/thumbnail.jpg",
         "images": [
            "https://dummyjson.com/image/i/products/57/1.jpg", "https://dummyjson.com/image/i/products/57/2.jpg", "https://dummyjson.com/image/i/products/57/3.jpg", "https://dummyjson.com/image/i/products/57/4.jpg", "https://dummyjson.com/image/i/products/57/thumbnail.jpg"
         ],
         "sizes": [
            6, 7, 8, 9
         ]
      },
```

Merger is configurable to use any types, names, and quantity of data objects, using **jsonPath** to link to the required
objects. Each separate source object graph needs to be registered. To do this there is a standard object name dataSources, which is 
set up for this example as follows:

```JavaScript
import {prods} from "./product-list-shoes.js"
import {globalContent} from "./product-list-shoes.js"

export const dataSources = {};

dataSources.globals = globalContent;
dataSources.productList = prods.products;

// min and max index of source Products to show
dataSources.minProducts = 2;
dataSources.maxProducts = 3;
```

How merger configuration mapping uses **jpath** to obtain the source objects, will become apparent in the following section.

> The minProducts, and maxProducts are used in this example to show how merger can be configured to pick a start and end index in a collection of objects. The mock data has 5 products, and we are configuring to start rendering on the second and end on the third.

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTk5MjQ2NzcyOF19
-->