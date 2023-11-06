let firstOperand = "";
let operator = "";
let secondOperand = "";
populateDisplay();


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

function populateDisplay() {
  listenNumbers();
}

function listenNumbers() {
  let display = document.querySelector("#display");
  const numbers = document.querySelectorAll(".number")
  for (const number of numbers) {
    number.addEventListener("click", () => {
      display.textContent += number.textContent;
      if (display.textContent[0] === "0") {
        display.textContent = display.textContent.slice(1);
        firstOperand = display.textContent;
      }
    })
  }
}
