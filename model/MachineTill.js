import {Enums} from "./Enums.js";
import {controller} from "../controller/MessageController.js";
import {coinHandler} from "../controller/CoinController.js";

const coins = Enums.coinEnum();
const acceptedCoins = [coins.NICKEL, coins.DIME, coins.QUARTER];
let coinChange = [];
let coinAdded = [];
let tillCoins = [];
let inputAmount = 0;
let changeToWithdraw = 0;
let totalAmount = 0;

export const till = {
    generateTillCoins() {
        acceptedCoins.map(coin => {
            this.addCoinToTill(coin.name, coin.value, 0);
        });
        return tillCoins;
    },

    getChange() {
        let change = "";
        coinChange.forEach(coin => {
           change += coin.value + ", ";
        });
        return change.toString();
    },

    clearCoinChange() {
        coinChange.length = 0;
    },

    calculateChange() {
        const denominations = [...acceptedCoins];

        while (this.getChangeToWithdraw() > 0) {
            const maxValueCoin = denominations.pop();
            const maxTillCoin = this.getTillCoin(maxValueCoin.name);
            const numberOfCoins = Math.floor(Math.abs(changeToWithdraw) / maxValueCoin.value);

            if (denominations.length === 0 || maxTillCoin.count === 0) {
                controller.displayMessage("Insert exact amount!");
                coinHandler.returnMoney();
                return;
            }

            if (numberOfCoins && maxTillCoin.count) {
                for (let i = 0; i < numberOfCoins; i++) {
                    coinChange.push(maxValueCoin)
                    this.decrementCoinCount(maxValueCoin);
                }
                const totalCoinValue = numberOfCoins * maxValueCoin.value;
                changeToWithdraw = (parseFloat(changeToWithdraw) + totalCoinValue).toFixed(2);
            }
        }
    },

    decrementCoinCount(coin) {
        const coinIndex = this.getCoinIndex(coin.name);

        if (coinIndex >= 0) {
            tillCoins[coinIndex].count -= 1;
        }
    },

    getTillCoin(coinName) {
        let result = -1;

        tillCoins.forEach(coin => {
            if (coin.name === coinName) {
                result = coin;
            }
        });
        return result;
    },

    addCoinToTill(coinName, coinValue, number) {
        const index = this.getCoinIndex(coinName);

        if (index >= 0) {
            if (number === null || typeof number === "undefined") {
                number = 1;
            }
            tillCoins.push({name: coinName, value: coinValue, count: number});
        }
    },

    setInputAmount(amount) {
        inputAmount = amount;
    },

    setChangeToWithdraw(change) {
        changeToWithdraw = change;
    },

    getChangeToWithdraw() {
        return Math.abs(changeToWithdraw);
    },

    updateTotalAmount(product) {
        totalAmount = 0;

        for (let i = 0; i < coinAdded.length; i++) {
            totalAmount += coinAdded[i].value;
        }
        inputAmount = product.price - totalAmount;

        return inputAmount.toFixed(2);
    },

    getInputAmount() {
        return inputAmount.toFixed(2);
    },

    insertCoin(coinName, product) {
        if (!Enums.validateCoin(coinName)) {
            return "Wrong coin!";
        }
        const coin = Enums.getCoinByName(coinName);
        const coinIndex = this.getCoinIndex(coinName);

        if (!coin in tillCoins) {
            tillCoins.push(coin);
            tillCoins[coinIndex].count++;
        }

        if (coinIndex >= 0) {
            coinAdded.push(coin);
            tillCoins[coinIndex].count++;
        } else {
            coinChange.push(coin);
        }
        this.updateTotalAmount(product);
    },

    withdrawCoins() {
        coinChange = [...coinAdded];
        this.payForProduct();
    },

    payForProduct() {
        coinAdded.length = 0;
    },

    getCoinIndex(coinName) {
        let coinIndex = -1;
        acceptedCoins.forEach((coin, index) => {
            if (coin.name === coinName) {
                coinIndex = index;
            }
        });
        return coinIndex;
    },

    checkPaidAmount() {
        return inputAmount <= 0;
    },
}