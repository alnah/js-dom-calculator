calculator();

function calculator() {

  // Element
  const displayOperation = document.querySelector("#operation");
  const displayResult = document.querySelector("#result");
  const clearBtn = document.querySelector("#clear");
  const oppositeBtn = document.querySelector("#opposite");
  const percentageBtn = document.querySelector("#percentage");
  const equalsBtn = document.querySelector("#equals");
  // Nodelist of elements
  const numberBtns = document.querySelectorAll(".number");
  const operatorBtns = document.querySelectorAll(".operator");

  let expression = {
    first: "",
    second: "",
    operator: "",
    reset: false,
  };

  function add(a, b) {
    return a + b;
  }

  function subtract(a, b) {
    return a - b;
  }

  function multiplication(a, b) {
    return a * b;
  }

  function power(a, b) {
    return a ** b;
  }

  function divide(a, b) {
    return a / b;
  }

  function operate(a, b, operator) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
      case "+":
        return add(a, b);
      case "-":
        return subtract(a, b);
      case "*":
        return multiplication(a, b);
      case "^":
        return power(a, b);
      case "/":
        if (b === 0) {
          return null;
        }
        return divide(a, b);
      default:
        return null;
    }
  }

}
