let expression = {
  first: {value: "0", stored: false},
  second: {value: "0", stored: false, start: false},
  operator: "",
  result: "0",
}

listenClicks()
listenKeys()

function reset(expression) {
  expression.first.value = "0";
  expression.first.stored = false;
  expression.second.value = "0";
  expression.second.stored = false;
  expression.second.start = false;
  expression.operator = "";
  expression.result = "0";
}

function add(expression) {
  return (!expression.second.stored)
    ? expression.first.value
    : expression.first.value + expression.second.value;
}

function subtract(expression) {
  return (!expression.second.stored)
    ? expression.first.value
    : expression.first.value - expression.second.value;
}

function multiply(expression) {
  return (!expression.second.stored)
    ? expression.first.value
    : expression.first.value * expression.second.value;
}

function divide(expression) {
  return expression.second.value === 0
    ? "Error"
    : expression.first.value / expression.second.value;
}

function power(expression) {
  return (!expression.second.stored)
    ? expression.first.value
    : expression.first.value ** expression.second.value;
}

function percentage(expression) {
  return (!expression.second.stored)
    ? expression.first.value / 100
    : expression.second.value / 100;
}

function opposite(expression) {
  if (expression.second.stored) {
    expression.second.value = expression.second.value * -1;
  } else if (expression.first.stored) {
    expression.first.value = expression.first.value * -1;
  }
}

function operate(expression) {
  for (let operand in expression) {
    expression[operand].value = Number(expression[operand].value);
  }
  switch (expression.operator) {
    case "+":
      return add(expression);
    case "-":
      return subtract(expression);
    case "*":
      return multiply(expression);
    case "/":
      return divide(expression);
    case "^":
      return power(expression);
    case "%":
      expression.result = percentage(expression);
      break;
    case "+/-":
      opposite(expression);
      break;
  }
}

function round(number) {
  return String(Math.round(Number(number) * 100) / 100);
}

function display(expression) {
  const display = document.querySelector("#display");
  //TODO: set the logic
}

function store(number) {
  if (!expression.first.stored) {
    expression.first.value = number;
    expression.first.stored = true;
  } else if (expression.first.stored && !expression.second.start) {
    expression.first.value += number;
  } else if (expression.second.start && !expression.second.stored) {
    expression.second.value = number;
    expression.second.stored = true;
  } else {
    expression.second.value += number;
  }
}

function listenKeys() {
  window.addEventListener("keydown", event => {
    const keydown = document.querySelector(`.btn[data-key="${event.key}"]`);
    if (keydown) {
      bind(keydown.id);
    }
  });
}

function listenClicks() {
  const buttons = document.querySelectorAll(".btn");
  for (let button of buttons) {
    button.addEventListener("click", event => {
      bind(event.target.id);
    });
  }
}

function bind(event) {
  if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(event)) {
    store(event);
  }
  if (["+/-", "%"].includes(event)) {
    expression.operator.value = event;
    expression.operator.stored = true;
  }
  if (["+", "-", "/", "*", "^"].includes(event)) {
    expression.operator = event;
    expression.second.start = true;
  }
  if (event === "=") {
    expression.result = String(operate(expression));
  }
  if (event === "ac") {
    reset(expression);
  }
  console.table(expression);
}