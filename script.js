function addNumbers(a, b = 0) {
  return a + b;
}

function subtractNumbers(a, b = 0) {
  return a - b;
}

function multiplyNumbers(a, b = 1) {
  return a * b;
}

function divideNumbers(a, b = 1) {
  return b === 0 ? "Error" : a / b;
}

function powerNumber(a, b = 0) {
  return a ** b;
}

function getPercentage(a) {
  return a / 100;
}

function getOpposite(a) {
  return -a;
}

function operate(a, operator, b = "") {
  // b is optional for .getPercentage and .getOpposite
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case "+":
      return addNumbers(a, b);
    case "-":
      return subtractNumbers(a, b);
    case "*":
      return multiplyNumbers(a, b);
    case "/":
      return divideNumbers(a, b);
    case "^":
      return powerNumber(a);
    case "%":
      return getPercentage(a);
    case "+/-":
      return getOpposite(a);
    default:
      return `Unknown operator: "${operator}"`
  }
}
