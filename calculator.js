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

let numberFirst = 0;
let operator = "";
let numberSecond = 0;

function operate(numberFirst, operator, numberSecond) {
    let result = 0;
    switch(operator) {
        case "+":
            result = add(numberFirst, numberSecond);
            break;
        case "-":
            result = subtract(numberFirst, numberSecond);
            break;
        case "*":
            result = multiply(numberFirst, numberSecond);
            break;
        case "/":
            result = divide(numberFirst, numberSecond);
            break;
    }
    console.log(`operation ${numberFirst} ${operator} ${numberSecond} = ${result}`);
    return result;
}

