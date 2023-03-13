const display = document.querySelector('.display');
const clearBtn = document.querySelector('.clear');
const operatorBtns = document.querySelectorAll('.operator');
const numberBtns = document.querySelectorAll('.number');
const equalBtn = document.querySelector('.equal');
const decimalBtn = document.querySelector('.decimal');

let firstNum = null;
let operator = null;
let displayValue = '';
let decimalPressed = false;

function updateDisplay(value) {
  displayValue += value;
  display.textContent = displayValue;
}

function clearDisplay() {
  firstNum = null;
  operator = null;
  displayValue = '';
  display.textContent = displayValue;
  decimalPressed = false;
}


function operate(operator, a, b) {
    switch (operator) {
      case '+':
        return (a + b).toFixed(2);
      case '-':
        return (a - b).toFixed(2);
      case '*':
        return (a * b).toFixed(2);
      case '/':
        if (b === 0) {
          return "Can't divide by 0!";
        } else {
          return (a / b).toFixed(2);
        }
      default:
        return "Invalid operator!";
    }
  }


numberBtns.forEach(button => {
  button.addEventListener('click', () => {
    if (displayValue === "Can't divide by 0!") {
      clearDisplay();
    }
    updateDisplay(button.value);
  });
});


operatorBtns.forEach(button => {
  button.addEventListener('click', () => {
    if (!firstNum) {
      firstNum = parseFloat(displayValue);
      operator = button.value;
      displayValue = '';
      decimalPressed = false;
    } else {
      const secondNum = parseFloat(displayValue);
      const result = operate(operator, firstNum, secondNum);
      firstNum = result;
      operator = button.value;
      displayValue = '';
      decimalPressed = false;
      display.textContent = result;
    }
  });
});


equalBtn.addEventListener('click', () => {
  if (firstNum && operator) {
    const secondNum = parseFloat(displayValue);
    const result = operate(operator, firstNum, secondNum);
    firstNum = null;
    operator = null;
    displayValue = '';
    display.textContent = result;
  }
});

clearBtn.addEventListener('click', clearDisplay);

decimalBtn.addEventListener('click', () => {
    if (!decimalPressed) {
      updateDisplay('.');
      decimalPressed = true;
    }
  });


function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Cannot divide by zero!";
  }
  return a / b;
}
