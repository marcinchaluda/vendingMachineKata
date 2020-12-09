import {Enums} from "./Enums.js";

const products = Enums.productEnum();
const productList = [products.CANDY, products.CHIPS, products.DRINK];
const inventoryList = [];
let purchaseBin = null;

export const inventory = {
    generateStartInventory() {
        productList.map((product) => {
            this.addInventory(product.name, product.price, 2);
        });
        return inventoryList;
    },

    getProductByName(name) {
      return Enums.getProduct(name);
    },

    displayPurchaseProducts() {
        return purchaseBin.name.toString();
    },

    addInventory(productName, productPrice, number) {
        const index = this.getProductIndex(productName);
        if (index >= 0) {
            if (number === null || typeof number === "undefined") {
                number = 1;
            }
            inventoryList.push({name: productName, price: productPrice, count: number});
        }
    },

    getProductStock(product) {
        const index = this.getProductIndex(product.name);
        if (index >= 0) {
            return inventoryList[index].count;
        }
        return -1;
    },

    getInventory() {
        return inventoryList;
    },

    deliverProduct(product) {
        const index = this.getProductIndex(product.name);

        if (index >= 0) {
            inventoryList[index].count--;
            purchaseBin = product;
        }
    },

    getProductIndex(productName) {
        let productIndex = -1;
        productList.forEach((product, index) => {
           if (product.name === productName) {
               productIndex = index;
           }
        });
        return productIndex;
    }
}