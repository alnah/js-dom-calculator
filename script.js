function addNumbers(a, b) {
  return a + b;
}

function subtractNumbers(a, b) {
  return a - b;
}

function multiplyNumbers(a, b) {
  return a * b;
}

function divideNumbers(a, b) {
  return b === 0 ? "Error" : a / b;
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
  switch(operator) {
    case "+":
      return addNumbers(a, b);
    case "-":
      return subtractNumbers(a, b);
    case "*":
      return multiplyNumbers(a, b);
    case "/":
      return divideNumbers(a, b);
    case "%":
      return getPercentage(a);
    case "+/-":
      return getOpposite(a);
    default:
      return `Unknown operator: "${operator}"`
  }
}

console.table([
  operate("2", "+", "3"),
  operate("3", "-", "2"),
  operate("3", "*", "3"),
  operate("9","/", "0"),
  operate("50", "%"),
  operate("25", "+/-"),
  operate("25", "$"),
])
