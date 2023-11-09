import {prods} from "./product-list-shoes.js"
import {globalContent} from "./product-list-shoes.js"

export const dataSources = {};

dataSources.globals = globalContent;
dataSources.productList = prods.products;

// min and max index of source Products to show
dataSources.minProducts = 2;
dataSources.maxProducts = 3;
