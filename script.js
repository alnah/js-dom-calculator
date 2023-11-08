let expression = {
  first: {value: "0", stored: false},
  operator: {value: "0", stored: false},
  second: {value: "0", stored: false, start: false},
  result: {value: "0", stored: false},
}

listenClicks()
listenKeys()


function reset(expression) {
  for (let key in expression) {
    expression[key].value = "0";
    expression[key].stored = false;
  }
  expression.second.start = false
}


function add(expression) {
  return (!expression.second.stored)
    ? expression.first.value + expression.first.value
    : expression.first.value + expression.second.value;
}

function subtract(expression) {
  return (!expression.second.stored)
    ? expression.first.value - expression.first.value
    : expression.first.value - expression.second.value;
}

function multiply(expression) {
  return (!expression.second.stored)
    ? expression.first.value * expression.first.value
    : expression.first.value * expression.second.value;
}

function divide(expression) {
  return expression.second.value
    ? expression.second.value === 0
      ? "Error"
      : expression.first.value / expression.second.value
    : expression.first.value / expression.first.value;
}

function power(expression) {
  return (!expression.second.stored)
    ? expression.first.value ** expression.first.value
    : expression.first.value ** expression.second.value;
}

function operate(expression) {
  for (let key in expression) {
    if (["first", "second"].includes(key)) {
      expression[key].value = Number(expression[key].value);
    }
  }
  switch (expression.operator.value) {
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
  }
}

function round(number) {
  return String(Math.round(Number(number) * 100) / 100);
}

function opposite(expression) {
  if (expression.result.stored) {
    expression.result.value = String(expression.result.value * -1);
  } else if (expression.second.stored) {
    expression.second.value = String(expression.second.value * -1);
  } else if (expression.first.stored) {
    expression.first.value = String(expression.first.value * -1);
  }
}

function percentage(expression) {
  if (expression.result.stored) {
    expression.first.value = String(expression.result.value / 100);
    expression.second.value = "0";
    expression.second.stored = false;
    expression.result.value = "0";
    expression.result.stored = false;
  } else if (expression.second.stored) {
    expression.second.value = String(expression.second.value / 100);
  } else if (expression.first.stored) {
    expression.first.value = String(expression.first.value / 100);
  }
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

function chain(expression, operator) {
  if (!expression.second.stored) {
    expression.operator.value = operator;
    expression.operator.stored = true;
    expression.second.start = true;
  } else {
    expression.first.value = String(operate(expression));
    expression.operator.value = operator;
    expression.second.value = "0";
    expression.second.stored = false;
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
  if (event === "+/-") {
    opposite(expression);
  }
  if (event === "%") {
    percentage(expression);
  }
  if (["+", "-", "/", "*", "^"].includes(event)) {
    chain(expression, event);
  }
  if (event === "=") {
    expression.result.value = String(operate(expression));
    expression.result.stored = true;
  }
  if (event === "ac") {
    reset(expression);
  }
  console.table(expression);
}