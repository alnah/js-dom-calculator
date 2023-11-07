let firstOperand = {
  value: "0",
  stored: false,
}
let secondOperand = {
  value: "0",
  stored: false,
}
let operator = "";
let result = "";

listenClicks()
listenKeys()

function reset() {
  for (const operand of [firstOperand, secondOperand]) {
    operand.value = "0";
    operand.stored = false;
  }
  operator = "";
  result = "0";
}

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
      return power(firstOperand, secondOperand);
    case "%":
      return percentage(firstOperand);
    case "+/-":
      return opposite(firstOperand);
  }
}

function display(number) {
  const display = document.querySelector("#display");
  display.textContent = String(Math.round(number * 100) / 100);
}

function storeOperands(event) {
  if (!firstOperand.stored) {
    if (firstOperand.value === "0") {
      firstOperand.value = event;
    } else {
      firstOperand.value += event;
    }
  }
  if (firstOperand.stored && !secondOperand.stored) {
    if (secondOperand.value === "0") {
      secondOperand.value = event;
    } else {
      secondOperand.value += event;
    }
  }
}

function listenKeys() {
  window.addEventListener("keydown", e => {
    const keydown = document.querySelector(`.btn[data-key="${e.key}"]`);
    if (keydown) {
      const key = keydown.id;
      bind(key);
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

function bind(event) {
  if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(event)) {
    storeOperands(event)
  }
  if (["+/-", "%"].includes(event)) {
    firstOperand.value = operate(firstOperand.value, event);
  }
  if (event === "ac") {
    reset()
  }
  display(firstOperand.value);
}