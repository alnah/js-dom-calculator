let expression = {
  first: {value: "0", stored: false},
  second: {value: "0", stored: false},
  operator: "",
  result: "0",
}

listenClicks()
listenKeys()

function reset(expression) {
  for (let operand in expression) {
    expression[operand].value = "0";
    expression[operand].stored = false;
  }
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
  return (!expression.second.stored)
    ? -expression.first.value
    : -expression.second.value;
}

function operate(expression) {
  for (let operand in expression) {
    expression[operand].value = Number(expression[operand].value);
  }
  switch (expression.operator) {
    case "+":
      expression.result = add(expression);
      break;
    case "-":
      expression.result = subtract(expression);
      break;
    case "*":
      expression.result = multiply(expression);
      break;
    case "/":
      expression.result = divide(expression);
      break;
    case "^":
      expression.result = power(expression);
      break;
    case "%":
      expression.result = percentage(expression);
      break;
    case "+/-":
      expression.result = opposite(expression);
      break;
  }
}

function round(number) {
  return String(Math.round(Number(number) * 100) / 100);
}

function display(expression) {
  const display = document.querySelector("#display");
  if (expression.result) {
    display.textContent = round(expression.result);
  }
  //TODO: Handle intermediate states
}

function storeOperands(event) {
  if (!expression.first.stored) {
    expression.first.value = event;
    expression.first.stored = true;
  } else if (expression.first.stored) {
    expression.first.value += event;
  }
  //TODO: to be continued
}

function listenKeys() {
  window.addEventListener("keydown", event => {
    const keydown = document.querySelector(`.btn[data-key="${event.key}"]`);
    if (keydown) {
      const key = keydown.id;
      bind(key);
    }
  });
}

function listenClicks() {
  const buttons = document.querySelectorAll(".btn");
  for (let button of buttons) {
    button.addEventListener("click", event => {
      const click = event.target.id;
      bind(click);
    });
  }
}

function bind(event) {
  if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(event)) {
    storeOperands(event);
  }
  if (["+/-", "%"].includes(event)) {
    expression.operator = event;
    operate(expression);
  }
  if (event === "ac") {
    reset(expression);
  }
  console.table(expression);
  display(expression);
}