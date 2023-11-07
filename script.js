let firstOperand = "0";
let operator = "";
let secondOperand = "0";
let result = "";

listenClicks()
listenKeys()

function add(firstOperand, secondOperand = 0) {
  return firstOperand + secondOperand;
}

function subtract(firstOperand, secondOperand = 0) {
  return firstOperand - secondOperand;
}

function multiply(firstOperand, secondOperand = 1) {
  return firstOperand * secondOperand;
}

function divide(firstOperand, secondOperand = 1) {
  return secondOperand === 0 ? "Error" : firstOperand / secondOperand;
}

function power(firstOperand, secondOperand = 0) {
  return firstOperand ** secondOperand;
}

function percentage(firstOperand) {
  return firstOperand / 100;
}

function opposite(firstOperand) {
  return -firstOperand;
}


function operate(firstOperand, operator, secondOperand = "") {
  // secondOperand is optional for .getPercentage and .getOpposite
  firstOperand = Number(firstOperand);
  secondOperand = Number(secondOperand);
  switch (operator) {
    case "+":
      return add(firstOperand, secondOperand);
    case "-":
      return subtract(firstOperand, secondOperand);
    case "*":
      return multiply(firstOperand, secondOperand);
    case "/":
      return divide(firstOperand, secondOperand);
    case "^":
      return power(firstOperand);
    case "%":
      return percentage(firstOperand);
    case "+/-":
      return opposite(firstOperand);
    default:
      return `Unknown operator: "${operator}"`
  }
}

function display(number) {
  const display = document.querySelector("#display");
  display.textContent = number;
}

function storeFirstOperand(number) {
  if (firstOperand === "0") {
    firstOperand = number;
  } else {
    firstOperand += number;
  }
}

function listenKeys() {
  window.addEventListener("keydown", e => {
    const keydown = document.querySelector(`.btn[data-key="${e.key}"]`);
    if (keydown) {
      const key = keydown.id;
      if (key in ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]) {
        bind(key);
      }
    }
  });
}

function listenClicks() {
  const buttons = document.querySelectorAll(".btn");
  for (let button of buttons) {
    button.addEventListener("click", e => {
      const click = e.target.id;
      bind(click);
    });
  }
}

function bind(target) {
  if (target in ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]) {
    storeFirstOperand(target);
    display(firstOperand);
  }
}