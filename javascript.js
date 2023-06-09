const display = document.querySelector(".display");
const clearBtn = document.querySelector(".clear");
const operatorBtns = document.querySelectorAll(".operator");
const numberBtns = document.querySelectorAll(".number");
const equalBtn = document.querySelector(".equal");
const decimalBtn = document.querySelector(".decimal");
const backspaceBtn = document.querySelector(".backspace");

let firstNum = null;
let operator = null;
let displayValue = "";
let decimalPressed = false;
let resultValue = null;

function updateDisplay(value) {
  displayValue += value;
  display.textContent = displayValue;
}

function clearDisplay() {
  firstNum = null;
  operator = null;
  displayValue = "";
  display.textContent = displayValue;
  decimalPressed = false;
  resultValue = null;
}

function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return (a + b).toFixed(2);
    case "-":
      return (a - b).toFixed(2);
    case "*":
      return (a * b).toFixed(2);
    case "/":
      if (b === 0) {
        return "Can't divide by 0!";
      } else {
        return (a / b).toFixed(2);
      }
    default:
      return "Invalid operator!";
  }
}

numberBtns.forEach((button) => {
  button.addEventListener("click", () => {
    if (displayValue === "Can't divide by 0!") {
      clearDisplay();
    }
    updateDisplay(button.value);
  });
});

operatorBtns.forEach((button) => {
  button.addEventListener("click", () => {
    if (!firstNum) {
      firstNum = parseFloat(displayValue);
      operator = button.value;
      displayValue = "";
      decimalPressed = false;
      if (resultValue !== null) {
        firstNum = resultValue;
        resultValue = null;
      }
    } else {
      const secondNum = parseFloat(displayValue);
      const result = operate(operator, firstNum, secondNum);
      firstNum = result;
      operator = button.value;
      displayValue = "";
      decimalPressed = false;
      display.textContent = result;
    }
  });
});

equalBtn.addEventListener("click", () => {
  if (firstNum && operator) {
    const secondNum = parseFloat(displayValue);
    const result = operate(operator, firstNum, secondNum);
    firstNum = null;
    operator = null;
    displayValue = "";
    decimalPressed = false;
    resultValue = "";
    display.textContent = result;
  }
});

clearBtn.addEventListener("click", clearDisplay);

decimalBtn.addEventListener("click", () => {
  if (!decimalPressed) {
    updateDisplay(".");
    decimalPressed = true;
  }
});

backspaceBtn.addEventListener("click", function () {
  displayValue = displayValue.slice(0, -1);
  display.textContent = displayValue;
});

document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (!isNaN(parseInt(key))) {
    const numberBtn = document.querySelector(`.number[value="${key}"]`);
    if (numberBtn) {
      numberBtn.click();
    }
    const operatorBtn = document.querySelector(`.operator[value="${key}"]`);
    if (operatorBtn) {
      operatorBtn.click();
    }
  } else if (key === ".") {
    decimalBtn.click();
  } else if (key === "+" || key === "-" || key === "*" || key === "/") {
  } else if (key === "Enter") {
    equalBtn.click();
  } else if (key === "Backspace") {
    backspaceBtn.click();
  }
});
