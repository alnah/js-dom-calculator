calculator();

function calculator() {

  let expression = {
    first: "",
    second: "",
    operator: "",
    reset: false,
  }

  function add(expression) {
    return expression.first + expression.second;
  }

  function subtract(expression) {
    return expression.first - expression.second;
  }

  function multiplication(expression) {
    return expression.first * expression.second;
  }

  function power(expression) {
    return expression.first ** expression.second;
  }

  function divide(expression) {
    return expression.first / expression.second;
  }

}
