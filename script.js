initializeCalculator();

function initializeCalculator() {
  const startWithOperator = /[+\-×^÷]/;

  let first = {value: "", unsaved: true, saved: false, integer: true};
  let second = {value: "", unsaved: true, saved: false, integer: true};
  let operator = {value: "", unsaved: true, saved: false};
  let result = "";

  listenClicks();
  listenKeys();

  function listenKeys() {
    window.addEventListener("keydown", event => {
      const key = document.querySelector(`[data-key="${event.key}"]`);
      if (key) {
        bindEvent(key.id);
        key.focus(); // Safari and Firefox don't handle focus in CSS files
      }
    });
  }

  function listenClicks() {
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach(button => {
      button.addEventListener("click", event => {
        const click = event.target;
        bindEvent(click.id);
        click.focus(); // Safari and Firefox don't handle focus in CSS files
      });
    });
  }

  function bindEvent(event) {
    if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(event)) {
      addOperand(event);
    }
    if (["+", "-", "÷", "×", "^"].includes(event)) {
      addOperator(event);
    }
    switch (event) {
      case "=":
        evaluate();
        break;
      case ".":
        addDecimal();
        break;
      case "+/-":
        getOpposite();
        break;
      case "%":
        getPercentage();
        break;
      case "ac":
        clearExpression();
        break;
    }
    updateClearbutton("AC", "C");
    display(first.value, operator.value, second.value, result);
    console.table({"a": first, "op": operator, "b": second, "=": result});
  }

  function addOperand(operandEvent) {
    if (first.saved && operator.saved && second.saved) {
      second.value += operandEvent;
      if (second.value.slice(0, 1) === "0" && second.value.slice(1, 2) !== ".") {
        second.value = second.value.substring(1) + operandEvent;
      }
    }
    if (first.saved && operator.saved && second.unsaved) {
      second.value = operandEvent;
      save(second);
    }
    if (first.saved && operator.unsaved && second.unsaved) {
      first.value += operandEvent;
      if (first.value.slice(0, 1) === "0" && first.value.slice(1, 2) !== ".") {
        first.value = second.value.substring(1) + operandEvent;
      }
    }
    if (first.unsaved && operator.unsaved && second.unsaved) {
      first.value = operandEvent;
      save(first);
    }
  }

  function addOperator(operatorEvent) {
    if (first.saved && operator.saved && second.saved) {
      evaluate(operatorEvent);
    }
    if (first.saved && operator.saved && second.unsaved) {
      operator.value = operatorEvent;
    }
    if (first.saved && operator.unsaved && second.unsaved) {
      operator.value = operatorEvent;
      save(operator);
    }
    if (first.unsaved && operator.unsaved && second.unsaved) {
      first.value = operatorEvent + first.value;
      save(first);
    }
  }

  function evaluate() { // to chain expressions
    // Handle a whole expression
    if (first.saved && operator.saved && second.saved) {
      result = operate(first.value, operator.value, second.value);
      const lookForTimeObulusOrCaret = /[×^÷]/;
      if (lookForTimeObulusOrCaret.test(first.value)) {
        first.value = "0";
        result = operate(first.value, operator.value, second.value);
      }
    }
    // One single first operand and an operator
    if (first.saved && operator.saved && second.unsaved) {
      second.value = first.value;
      result = operate(first.value, operator.value, second.value);
    }
    // One single first operand
    if (first.saved && operator.unsaved && second.unsaved) {
      result = first.value;
      // Handle a situation with a leading operator in first operand
      if (startWithOperator.test(first.value)) {
        second.value = first.value.substring(1);
        operator.value = first.value.slice(0, 1);
        first.value = "0";
        result = operate(first.value, operator.value, second.value);
      }
    }
    // Handle nothing
    if (first.unsaved && operator.unsaved && second.unsaved) {
      result = "0";
    }
    // Allow chaining with operators
    first.value = result;
    [operator, second].forEach(element => reset(element));
  }

  function operate(first, sign, second) {
    const a = Number(first);
    const b = Number(second);
    switch (sign) {
      case "+":
        return String(add(a, b));
      case "-":
        return String(subtract(a, b));
      case "×":
        return String(multiply(a, b));
      case "^":
        return String(power(a, b));
      case "÷":
        if (b !== 0) {
          return String(divide(a, b));
        }
        return "Error";
    }
  }

  function add(a, b) {
    return a + b;
  }

  function subtract(a, b) {
    return a - b;
  }

  function multiply(a, b) {
    return a * b;
  }

  function divide(a, b) {
    return a / b;
  }

  function power(a, b) {
    return a ** b;
  }

  function addDecimal() {
    if (operator.unsaved && first.unsaved && first.integer) {
      first.value = "0.";
      save(first, true);
    }
    if (operator.unsaved && first.saved && first.integer) {
      first.value += ".";
      first.integer = false;
    }
    if (operator.saved && second.unsaved && second.integer) {
      second.value = "0.";
      save(second, true);
    }
    if (operator.saved && second.saved && second.integer) {
      second.value += ".";
      second.integer = false;
    }
  }

  function getOpposite() {
    if (first.saved && operator.unsaved && second.unsaved) {
      first.value *= -1;
      first.value = String(first.value);
    }
    if (first.saved && operator.saved && second.saved) {
      if (operator.value === "-") {
        operator.value = "+";
      } else if (operator.value === "+") {
        operator.value = "-"
      } else {
        second.value *= -1;
        second.value = String(second.value);
      }
    }
  }

  function getPercentage() {
    if (first.saved && operator.unsaved) {
      first.value = first.value / 100;
    }
    if (operator.saved && second.saved) {
      second.value = second.value / 100;
    }
  }

  function clearExpression() {
    if (first.saved && operator.unsaved && second.unsaved) {
      reset(first);
    }
    if (first.saved && operator.saved && second.unsaved) {
      reset(operator);
    }
    if (first.saved && operator.saved && second.saved) {
      reset(second);
    }
    if (result) {
      result = "";
    }
  }

  function updateClearbutton(initText, updatedText) {
    const clearButton = document.querySelector("#ac");
    clearButton.textContent = updatedText;
    if (first.unsaved && operator.unsaved && second.unsaved) {
      clearButton.textContent = initText;
    }
  }

  function display(first, sign, second, result) {
    const expressionDisplay = document.querySelector("#expression");
    const resultDisplay = document.querySelector("#result");
    // [first, second, result].map(number => round(number));
    expressionDisplay.textContent = `${first} ${sign} ${second}`;
    resultDisplay.textContent = "0";
    if (result) {
      resultDisplay.textContent = result;
    }
    if (result === "Error") {
      expressionDisplay.textContent = "You cannot divide by 0"
    }
  }

  function save(element, decimal = false) {
    element.unsaved = false;
    element.saved = true;
    if (decimal) {
      element.integer = false;
    }
  }

  function reset(element) {
    for (let key in element) {
      switch (key) {
        case "value":
          element[key] = "";
          break;
        case "unsaved":
          element[key] = true;
          break;
        case "saved":
          element[key] = false;
          break;
        case "integer":
          element[key] = true;
          break;
      }
    }
  }

}