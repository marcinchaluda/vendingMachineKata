import {controller} from "../controller/MessageController.js";

export const displayInfo = {
    init() {
    },

    displayMessage() {
        controller.getCoinName();
    }
}