const machineMessage = document.querySelector(".machine__message");

export const controller = {
    displayMessage(message) {
        machineMessage.textContent = message;
    },
}