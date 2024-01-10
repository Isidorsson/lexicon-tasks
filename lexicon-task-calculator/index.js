/* 
  <div id="calculator">
    <!-- Display -->
    <input type="text" id="display" disabled>

    <div id="numbers">
      <!-- Buttons -->
      <button onclick="appendNumber('1')">1</button>
      <button onclick="appendNumber('2')">2</button>
      <button onclick="appendNumber('3')">3</button>
      <button onclick="appendNumber('4')">4</button>
      <button onclick="appendNumber('5')">5</button>
      <button onclick="appendNumber('6')">6</button>
      <button onclick="appendNumber('7')">7</button>
      <button onclick="appendNumber('8')">8</button>
      <button onclick="appendNumber('9')">9</button>
      <button onclick="appendNumber('0')">0</button>
      <button onclick="appendNumber('00')">00</button>
      <!-- Add more buttons for numbers and operations -->
    </div>
    <div id="operations">
      <!-- Operation buttons -->
      <button onclick="setOperation('+')">+</button>
      <button onclick="setOperation('-')">-</button>
      <button onclick="setOperation('*')">*</button>
      <button onclick="setOperation('/')">/</button>
      <!-- Add buttons for other operations -->
    </div>

    <!-- Equal button -->
    <button onclick="calculate()">=</button>

    <!-- Clear button -->
    <button onclick="clearDisplay()">C</button>
  </div>

*/

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

