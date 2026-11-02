const previousOperandElement = document.getElementById('previous-operand');
const currentOperandElement = document.getElementById('current-operand');

let currentOperand = '0';
let previousOperand = '';
let operation = null;
let resetDisplayOnNextInput = false;

function updateDisplay() {
    currentOperandElement.innerText = currentOperand;
    if (operation != null) {
        previousOperandElement.innerText = `${previousOperand} ${operation}`;
    } else {
        previousOperandElement.innerText = '';
    }
}

function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    
    if (currentOperand === '0' && number !== '.') {
        currentOperand = number;
    } else if (resetDisplayOnNextInput) {
        currentOperand = number;
        resetDisplayOnNextInput = false;
    } else {
        currentOperand = currentOperand.toString() + number.toString();
    }
    updateDisplay();
}

function appendOperator(op) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        calculate();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '0';
    updateDisplay();
}

function clearDisplay() {
    currentOperand = '0';
    previousOperand = '';
    operation = null;
    updateDisplay();
}

function deleteNumber() {
    if (currentOperand === '0') return;
    if (currentOperand.length === 1) {
        currentOperand = '0';
    } else {
        currentOperand = currentOperand.toString().slice(0, -1);
    }
    updateDisplay();
}

function calculate() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            if (current === 0) {
                computation = "Error";
            } else {
                computation = prev / current;
            }
            break;
        case '%':
            computation = prev % current;
            break;
        default:
            return;
    }

    currentOperand = computation.toString();
    operation = null;
    previousOperand = '';
    resetDisplayOnNextInput = true;
    updateDisplay();
}
