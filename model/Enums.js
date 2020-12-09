export const Enums = {
    coinEnum() {
        return Object.freeze(_coins);
    },

    productEnum() {
        return Object.freeze(_products);
    },

    getCoinByName(coinName) {
        return _coins[coinName.toUpperCase()];
    },

    getProduct(productName) {
      return _products[productName.toUpperCase()];
    },

    validateCoin(coinName) {
        return coinName.toUpperCase() in _coins;
    }
}

const _coins = {
    "NICKEL": {name: "nickel", value: 0.05},
    "DIME": {name: "dime", value: 0.1},
    "QUARTER": {name: "quarter", value: 0.25},
}

const _products = {
    "DRINK": {name: "drink", price: 1},
    "CHIPS": {name: "chips", price: 0.5},
    "CANDY": {name: "candy", price: 0.65},
}
