import {controller} from "./controller/MessageController.js"
import {productInfo} from "./controller/ProductInfoController.js"
import {coinHandler} from "./controller/CoinController.js"
import {vendingMachine} from "./model/VendingMachine.js"

vendingMachine.init();
productInfo.handleItemButton();
coinHandler.validateCoin();
coinHandler.cancelPayment();