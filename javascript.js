const display = document.querySelector('.display');
const clearBtn = document.querySelector('.clear');
const operatorBtns = document.querySelectorAll('.operator');
const numberBtns = document.querySelectorAll('.number');
const equalBtn = document.querySelector('.equal');

// initialize variables
let firstNum = null;
let operator = null;
let displayValue = '';

// function to update display
function updateDisplay(value) {
  displayValue += value;
  display.textContent = displayValue;
}

// function to clear display
function clearDisplay() {
  firstNum = null;
  operator = null;
  displayValue = '';
  display.textContent = displayValue;
}

// function to perform operation
function operate(operator, a, b) {
  switch (operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      if (b === 0) {
        display.textContent = "Nice try, division by zero is not allowed!";
        throw new Error("Division by zero is not allowed!");
      }
      return a / b;
    default:
      return "Invalid operator!";
  }
}

// event listener for number buttons
numberBtns.forEach(button => {
  button.addEventListener('click', () => {
    if (displayValue === "Nice try, Don't divide by zero!") {
      clearDisplay();
    }
    updateDisplay(button.value);
  });
});


// event listener for operator buttons
operatorBtns.forEach(button => {
  button.addEventListener('click', () => {
    if (!firstNum) {
      firstNum = parseFloat(displayValue);
      operator = button.value;
      displayValue = '';
    } else {
      const secondNum = parseFloat(displayValue);
      const result = operate(operator, firstNum, secondNum);
      firstNum = result;
      operator = button.value;
      displayValue = '';
      display.textContent = result;
    }
  });
});


// event listener for equal button
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

// event listener for clear button
// clearBtn.addEventListener('click', () => {
//   clearDisplay();
// });

clearBtn.addEventListener('click', clearDisplay);

// Define the add, subtract, multiply, and divide functions
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
