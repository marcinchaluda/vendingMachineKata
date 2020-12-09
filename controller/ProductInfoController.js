import {till} from '../model/MachineTill.js'
import {inventory} from '../model/MachineInventory.js'
import {vendingMachine} from '../model/VendingMachine.js'
import {controller} from "./MessageController.js";

const items = document.querySelectorAll(".machine__item img");
const productName = document.querySelector(".machine__product-name");
const productPrice = document.querySelector(".machine__product-price");
const amountToPay = document.querySelector(".machine__amount");
const binInfo = document.getElementById("purchase-item");
const changeCoins = document.querySelector(".machine__change-coins");
const machineMessage = document.querySelector(".machine__message");

export const productInfo = {
    handleItemButton() {
        items.forEach(item => {
            item.addEventListener("click", () => {
                clearSelectedItem();
                vendingMachine.enableButtons();
                controller.displayMessage("Insert coin!");
                const product = inventory.getProductByName(item.dataset.name);
                till.setInputAmount(0);
                productName.textContent = product.name.toUpperCase();
                productPrice.textContent = product.price;
                amountToPay.textContent = till.updateTotalAmount(product);
                item.classList.add("active");
                if (till.checkPaidAmount()) {
                    productInfo.addProductToBin(product);
                }
            });
        });
    },

    addProductToBin(product) {
        console.log(inventory.getInventory());
        controller.displayMessage("Insert coin!");
        inventory.deliverProduct(product);
        binInfo.textContent = inventory.displayPurchaseProducts();
        till.setChangeToWithdraw(till.getInputAmount());
        till.setInputAmount(product.price);
        amountToPay.textContent = till.getInputAmount();
        till.calculateChange()
        changeCoins.textContent = till.getChange();
        till.clearCoinChange();
        if (machineMessage.textContent !== "Insert exact amount!") {
            controller.displayMessage("Thank you");
            till.payForProduct();
        }
        if (inventory.getProductStock(product) < 1) {
            vendingMachine.disableProduct();
        }
    },

    clearProductInfo() {
        productName.textContent = "";
        productPrice.textContent = "";
        amountToPay.textContent = "";
    }
}

function clearSelectedItem() {
    items.forEach(item => {
       item.classList.remove("active");
    });
}