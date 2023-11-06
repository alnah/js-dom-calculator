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

console.table([
  addNumbers(3.2, 1),
  subtractNumbers(3, 1),
  multiplyNumbers(3, 2.5),
  divideNumbers(3, 0),
  getPercentage(25),
  getOpposite(-30),
])
