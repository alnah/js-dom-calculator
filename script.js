//TODO: implement decimals
//TODO: implement display
//TODO: implement "ac" and also "c"
//TODO: change style buttons when clicked
let expression = {
  first: {value: "0", stored: false},
  operator: {value: "0", stored: false},
  second: {value: "0", stored: false, start: false},
  result: {value: "0", stored: false},
}

listenClicks()
listenKeys()

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
    button.addEventListener("click", event => bind(event.target.id));
  }
}

function bind(event) {
  if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(event)) {
    store(event);
  }
  if (["+", "-", "/", "*", "^"].includes(event)) {
    chain(expression, event);
  }
  switch (event) {
    case "=":
      calculate(expression);
      break;
    case "+/-":
      opposite(expression);
      break;
    case "%":
      percentage(expression);
      break;
    case "ac":
      reset(expression, true);
      break;
  }
  console.table(expression);
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
    reset([expression.second, expression.result]);
  }
}

function calculate(expression) {
  if (expression.first.stored && expression.second.stored) {
    expression.result.value = String(operate(expression));
    expression.result.stored = true;
  }
  convert(expression, String);
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
    reset([expression.second, expression.result]);
  } else if (expression.second.stored) {
    expression.second.value = String(expression.second.value / 100);
  } else if (expression.first.stored) {
    expression.first.value = String(expression.first.value / 100);
  }
}

function reset(keys, start = false) {
  for (let key in keys) {
    keys[key].value = "0";
    keys[key].stored = false;
  }
  if (start) {
    expression.second.start = false;
  }
}

function operate(expression) {
  convert(expression, Number);
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
  return expression.second.stored
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

function round(number) {
  return String(Math.round(Number(number) * 100) / 100);
}

function display(expression) {
  const display = document.querySelector("#display");
  //TODO: set the logic
}

function convert(expression, builtin) {
  for (let key in expression) {
    if (["first", "second"].includes(key)) {
      expression[key].value = builtin(expression[key].value);
    }
  }
}
