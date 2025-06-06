function checkNumber(a, b) {
    if (typeof a !== "number" || typeof b !== "number")
        return false;

    return true;
}

function add(a, b) {
    if (!checkNumber(a, b))
        return "ERROR";



    return a + b;
}

function subtract(a, b) {
    if (!checkNumber(a, b))
        return "ERROR";

    return a - b;
}

function multiply(a, b) {
    if (!checkNumber(a, b))
        return "ERROR";

    return a * b;
}

function divide(a, b) {
    if (!checkNumber(a, b))
        return "ERROR";

    return a / b;
}

function createButton(width, height, textContent, parent) {
    let newButton = document.createElement("button");
    newButton.classList.add("calculator-button");
    newButton.style.width = width;
    newButton.style.height = height;
    newButton.style.minWidth = width;
    newButton.style.minHeight = height;
    newButton.style.boxSizing = "border-box";
    newButton.style.border = "solid black 2px";
    newButton.textContent = textContent;

    parent.appendChild(newButton);

    return newButton;
}

function createCalculator() {
    let numberButtonContainer = document.querySelector(".calculator-buttons-number");
    let operateButtonContainer = document.querySelector(".calculator-buttons-operate");
    for (i = 0; i < 10; i++) {
        let newButton = createButton("50px", "50px", i, numberButtonContainer);
        numberButtons[i] = newButton;
        numberButtons[i].addEventListener("click", (e) => {
            let numberVal = Object.keys(numberButtons).find(key => numberButtons[key] === e.target);
            console.log(`number button click: ${numberVal}`);
            setOperation(numberVal);
        })
    }

    let plusButton = createButton("50px", "50px", "+", operateButtonContainer);
    operatorButtons["+"] = plusButton;
    plusButton.addEventListener("click", (e) => {
        let operatorVal = Object.keys(operatorButtons).find(key => operatorButtons[key] === e.target);
        setOperation(operatorVal);
    })

    let minusButton = createButton("50px", "50px", "-", operateButtonContainer);
    operatorButtons["-"] = minusButton;
    minusButton.addEventListener("click", (e) => {
        let operatorVal = Object.keys(operatorButtons).find(key => operatorButtons[key] === e.target);
        setOperation(operatorVal);
    })

    let multiplyButton = createButton("50px", "50px", "*", operateButtonContainer);
    operatorButtons["*"] = multiplyButton;
    multiplyButton.addEventListener("click", (e) => {
        let operatorVal = Object.keys(operatorButtons).find(key => operatorButtons[key] === e.target);
        setOperation(operatorVal);
    })

    let divideButton = createButton("50px", "50px", "/", operateButtonContainer);
    operatorButtons["/"] = divideButton;
    divideButton.addEventListener("click", (e) => {
        let operatorVal = Object.keys(operatorButtons).find(key => operatorButtons[key] === e.target);
        setOperation(operatorVal);
    })


    let equalsButton = createButton("50px", "50px", "=", operateButtonContainer);
    operatorButtons["="] = equalsButton;
    equalsButton.addEventListener("click", (e) => {
        let operatorVal = Object.keys(operatorButtons).find(key => operatorButtons[key] === e.target);
        setOperation(operatorVal);
    })

    let clearButton = createButton("50px", "50px", "C", operateButtonContainer);
    operatorButtons["C"] = clearButton;
    clearButton.addEventListener("click", (e) => {
        clearDisplay();
    })
}

let numberButtons = {};
let operatorButtons = {};
const calculatorDisplay = document.querySelector(".calculator-display");

createCalculator();

let numberFirst = "";
let operator = "";
let numberSecond = "";
let stage = 0;

function displayResult() {
    calculatorDisplay.textContent = operate(numberFirst, operator, numberSecond);
}

function clearDisplay() {
    calculatorDisplay.textContent = "";
    numberFirst = operator = numberSecond = "";
    stage = 0;
}

function setOperation(value) {
    switch(stage) {
        case (0):
            if (!isNaN(value) && !isNaN(parseFloat(value))) {
                numberFirst += value;
            } else {
                stage = 1;
                operator = value;
            }
            break;
        case (1):
            if (!isNaN(value) && !isNaN(parseFloat(value))) {
                numberSecond += value;
            } else if (value == "=") {

                if (operator == "/" && +numberSecond == 0) {
                    calculatorDisplay.textContent = "DIVIDE BY 0 ERROR";
                    stage = 0;
                    numberFirst = "";
                    operator = "";
                    numberSecond = "";
                    return;
                }

                numberFirst = operate(numberFirst, operator, numberSecond);
                operator = "";
                numberSecond = "";
                updateDisplay();
                stage = 0;
            }
            break;
        case(2):

            break;
    }
    updateDisplay();
}

function updateDisplay() {
    calculatorDisplay.textContent = `${numberFirst} ${operator} ${numberSecond}`;
}

function operate(numberFirst, operator, numberSecond) {
    let result = 0;
    switch(operator) {
        case "+":
            result = add(+numberFirst, +numberSecond);
            break;
        case "-":
            result = subtract(+numberFirst, +numberSecond);
            break;
        case "*":
            result = multiply(+numberFirst, +numberSecond);
            break;
        case "/":
            result = divide(+numberFirst, +numberSecond);
            break;
    }
    result = Math.round((result + Number.EPSILON) * 100) / 100
    console.log(`operation ${numberFirst} ${operator} ${numberSecond} = ${result}`);
    return result;
}

