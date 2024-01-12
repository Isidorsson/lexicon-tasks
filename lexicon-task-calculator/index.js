let display = document.getElementById('display');
let operation = null;
let firstNumber = '';
let secondNumber = '';
let result = null;

function appendNumber(number) {
  if (operation === null) {
    firstNumber += number; 
    display.value = firstNumber;
  } else {
    secondNumber += number;
    display.value = secondNumber;
  }
}

function setOperation(operator) {
  operation = operator;
}

function calculate() {
  switch (operation) {
    case '+':
      result = parseInt(firstNumber) + parseInt(secondNumber);
      break;
    case '-':
      result = parseInt(firstNumber) - parseInt(secondNumber);
      break;
    case '*':
      result = parseInt(firstNumber) * parseInt(secondNumber);
      break;
    case '/':
      result = parseInt(firstNumber) / parseInt(secondNumber);
      break;
  }
  display.value = result;
}

function clearDisplay() {
  display.value = '';
  operation = null;
  firstNumber = '';
  secondNumber = '';
  result = null;
}


