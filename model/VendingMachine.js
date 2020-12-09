import {till} from './MachineTill.js'
import {inventory} from './MachineInventory.js'
import {coinHandler} from '../controller/CoinController.js'
import {controller} from '../controller/MessageController.js'
import {productInfo} from '../controller/ProductInfoController.js'

const payBtn = document.querySelector(".machine__pay");
const cancelBtn = document.querySelector(".machine__cancel");

export const vendingMachine = {
    init() {
        inventory.generateStartInventory();
        till.generateTillCoins();
        this.disableButtons();
    },

    disableButtons() {
        if (coinHandler.getActiveItem() == null) {
            payBtn.style.pointerEvents = "none";
            cancelBtn.style.pointerEvents = "none";
        }
    },

    enableButtons() {
        payBtn.style.pointerEvents = "auto";
        cancelBtn.style.pointerEvents = "auto";
    },

    disableProduct() {
        const activeContainer = coinHandler.getActiveContainer();
        if (activeContainer) {
            activeContainer.style.pointerEvents = "none";
            activeContainer.style.backgroundColor = "grey";
            activeContainer.children[0].classList.remove("active");
            controller.displayMessage("Product out of stock!");
            productInfo.clearProductInfo();
        }
    },
}