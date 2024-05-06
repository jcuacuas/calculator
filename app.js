const calculatorDisplay = document.querySelector(".display");
const numberButtons = document.querySelectorAll(".number-buttons");
const operatorButtons = document.querySelectorAll(".function-buttons");
const equalsButton = document.querySelector("#equals");
const clearButton = document.querySelector("#clear");
const historyButton = document.querySelector("#history");
const modalPopup = document.querySelector(".popup-box");
let currentOperator = null;
let firstOperand = null;
let secondOperand = null;

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}
function divide(x, y) {
    return x / y;
}

function operate(operator, x, y) {
    x = parseFloat(x);
    y = parseFloat(y);
    if (operator === "+") {
        return add(x, y)
    } else if (operator === "-") {
        return subtract(x, y)
    } else if (operator === "*") {
        return multiply(x, y)
    } else if (operator === "÷") {
        return divide(x, y)
    }
}

function selectOperand() {
    if (firstOperand === null) {
        firstOperand = this.textContent;
        calculatorDisplay.textContent = firstOperand;
    } else if (currentOperator === null) {
        firstOperand = firstOperand.concat(this.textContent);
        calculatorDisplay.textContent = firstOperand;
    } else if (currentOperator != null && secondOperand === null) {
        secondOperand = this.textContent;
        calculatorDisplay.textContent = firstOperand + " " + currentOperator + " " + secondOperand;
    } else if (currentOperator != null) {
        secondOperand = secondOperand.concat(this.textContent);
        calculatorDisplay.textContent = firstOperand + " " + currentOperator + " " + secondOperand;
    }
}

function selectOperator() {
    if (currentOperator === null) {
        currentOperator = this.textContent;
        calculatorDisplay.textContent = calculatorDisplay.textContent.concat(" ", this.textContent);
    }
}

function selectHistory() {
    calculatorDisplay.textContent = this.textContent;
}

function calculateEquation() {
    if (firstOperand != null && secondOperand != null) {
        let output = operate(currentOperator, firstOperand, secondOperand);
        let equation = firstOperand.concat(" " + currentOperator + " " + secondOperand);
        let history = [equation, output];
        let modalContainer = document.createElement("div");
        modalContainer.setAttribute("class", "modal-container");
        for (i of history) {
            let modalButton = document.createElement("button");
            modalButton.setAttribute("class", "history-buttons");
            modalButton.textContent = i;
            modalButton.addEventListener("click", selectHistory)
            modalContainer.appendChild(modalButton);
            if (i === equation) {
                let equalsButton = document.createElement("div");
                equalsButton.setAttribute("class", "equals-buttons");
                equalsButton.textContent = "=";
                modalContainer.appendChild(equalsButton);
            }
        }
        modalPopup.appendChild(modalContainer);
        currentOperator = null;
        secondOperand = null;
        firstOperand = output.toString();
        calculatorDisplay.textContent = output;
    } else {
        calculatorDisplay.textContent = "Error";
    }

}

function clearCalculator() {
    firstOperand = null;
    secondOperand = null;
    currentOperator = null;
    calculatorDisplay.textContent = "";
}

function showHistory() {
    modalPopup.classList.toggle("hidden");
}

numberButtons.forEach((button) => button.addEventListener("click", selectOperand));
operatorButtons.forEach((button) => button.addEventListener("click", selectOperator));
equalsButton.addEventListener("click", calculateEquation);
clearButton.addEventListener("click", clearCalculator);
historyButton.addEventListener("click", showHistory);
modalPopup.classList.toggle("hidden");