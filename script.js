let operands = {
  first: {value: "0", stored: false},
  second: {value: "0", stored: false},
}
let operator = "";
let result = "";

listenClicks()
listenKeys()

function reset() {
  for (let operand in operands) {
    operands[operand].value = "0";
    operands[operand].stored = false;
  }
  operator = "";
  result = "0";
}

function add(operands) {
  return (!operands.second.stored)
    ? operands.first.value
    : operands.first.value + operands.second.value;
}

function subtract(operands) {
  return (!operands.second.stored)
    ? operands.first.value
    : operands.first.value - operands.second.value;
}

function multiply(operands) {
  return (!operands.second.stored)
    ? operands.first.value
    : operands.first.value * operands.second.value;
}

function divide(operands) {
  return operands.second.value === 0
    ? "Error"
    : operands.first.value / operands.second.value;
}

function power(operands) {
  return (!operands.second.stored)
    ? operands.first.value
    : operands.first.value ** operands.second.value;
}

function percentage(operands) {
  return (!operands.second.stored)
    ? operands.first.value / 100
    : operands.second.value / 100;
}

function opposite(operands) {
  return (!operands.second.stored)
    ? -operands.first.value
    : -operands.second.value;
}

function operate(operands, operator) {
  for (let operand in operands) {
    operands[operand].value = Number(operands[operand].value);
  }
  switch (operator) {
    case "+":
      return add(operands);
    case "-":
      return subtract(operands);
    case "*":
      return multiply(operands);
    case "/":
      return divide(operands);
    case "^":
      return power(operands);
    case "%":
      return percentage(operands);
    case "+/-":
      return opposite(operands);
  }
}

function display(number) {
  const display = document.querySelector("#display");
  display.textContent = String(Math.round(number * 100) / 100);
}

function storeOperands(event) {
  if (!operands.first.stored) {
    operands.first.value = event;
    operands.first.stored = true;
  } else if (operands.first.stored) {
    operands.first.value += event;
  } else if (!operands.second.stored) {
    //TODO: continue, but before implement operators
  }
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
    storeOperands(event, "first")
  }
  if (["+/-", "%"].includes(event)) {
    operands.first.value = operate(operands, event);
  }
  if (event === "ac") {
    reset()
  }
  display(operands.first.value);
}