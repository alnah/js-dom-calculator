let firstOperand = "";
let operator = "";
let secondOperand = "";
let result = "";

listenClicks()
listenKeys()

function addNumbers(firstOperand, secondOperand = 0) {
  return firstOperand + secondOperand;
}

function subtractNumbers(firstOperand, secondOperand = 0) {
  return firstOperand - secondOperand;
}

function multiplyNumbers(firstOperand, secondOperand = 1) {
  return firstOperand * secondOperand;
}

function divideNumbers(firstOperand, secondOperand = 1) {
  return secondOperand === 0 ? "Error" : firstOperand / secondOperand;
}

function powerNumber(firstOperand, secondOperand = 0) {
  return firstOperand ** secondOperand;
}

function getPercentage(firstOperand) {
  return firstOperand / 100;
}

function getOpposite(firstOperand) {
  return -firstOperand;
}


function operate(firstOperand, operator, secondOperand = "") {
  // secondOperand is optional for .getPercentage and .getOpposite
  firstOperand = Number(firstOperand);
  secondOperand = Number(secondOperand);
  switch (operator) {
    case "+":
      return addNumbers(firstOperand, secondOperand);
    case "-":
      return subtractNumbers(firstOperand, secondOperand);
    case "*":
      return multiplyNumbers(firstOperand, secondOperand);
    case "/":
      return divideNumbers(firstOperand, secondOperand);
    case "^":
      return powerNumber(firstOperand);
    case "%":
      return getPercentage(firstOperand);
    case "+/-":
      return getOpposite(firstOperand);
    default:
      return `Unknown operator: "${operator}"`
  }
}

function listenKeys() {
  window.addEventListener("keydown", e => {
    const key = document.querySelector(`.btn[data-key="${e.key}"]`);
    if (key) {
      console.log(key.id);
      // TODO: add a function to display
      // TODO: add a function to store value
    }
  });
}

function listenClicks() {
  const buttons = document.querySelectorAll(".btn");
  for (let button of buttons) {
    button.addEventListener("click", e => {
      console.log(e.target.id)
      // TODO: add a function to display
      // TODO: add a function to store value
    });
  }
}