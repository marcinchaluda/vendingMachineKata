import {vendingMachine} from "../model/VendingMachine.js";
import {till} from '../model/MachineTill.js'
import {inventory} from '../model/MachineInventory.js'
import {productInfo} from './ProductInfoController.js'

const insertCoin = document.getElementById("machine__coin");
const payBtn = document.querySelector(".machine__pay");
const cancelBtn = document.querySelector(".machine__cancel");
const amountToPay = document.querySelector(".machine__amount");
const items = document.querySelectorAll(".machine__item img");
const changeCoins = document.querySelector(".machine__change-coins");

export const coinHandler = {
    validateCoin() {
        payBtn.addEventListener("click", () => {
            const coinName = insertCoin.value.toLowerCase();
            let activeProduct = this.getActiveItem();

            till.insertCoin(coinName, activeProduct);
            amountToPay.textContent = till.getInputAmount();
            insertCoin.value = "";
            if (till.checkPaidAmount()) {
                productInfo.addProductToBin(activeProduct);
            }
            if (inventory.getProductStock(activeProduct) < 1) {
                vendingMachine.disableProduct();
            }
        });
    },

    getActiveItem() {
        let product = null;
        items.forEach(item => {
            if (item.classList.contains("active")) {
                product = inventory.getProductByName(item.dataset.name);
            }
        });
        return product;
    },

    getActiveContainer() {
        let activeItem = null;
        items.forEach(item => {
            if (item.classList.contains("active")) {
                activeItem = item.parentElement;
            }
        });
        return activeItem;
    },

    cancelPayment() {
        cancelBtn.addEventListener("click", () => {
            this.returnMoney();
        });
    },

    returnMoney() {
        let activeProduct = this.getActiveItem();

        till.withdrawCoins();
        changeCoins.textContent = till.getChange();
        till.updateTotalAmount(activeProduct);
        amountToPay.textContent = till.getInputAmount();
    },
}