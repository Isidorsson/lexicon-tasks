// 1.
let userName = prompt('What is your name?');

console.log(`Hello ${userName}!`); 

let userAge = prompt('How old are you?');

// 2.
let currentYear = new Date().getFullYear();

console.log(`You were born in ${currentYear - userAge}!`);

// 3. 4. 5. 6. 
let firstNumber = parseFloat(prompt('Enter a number'));
let secondNumber = parseFloat(prompt('Enter another number'));
let operation = prompt('What operation do you want to perform? (add, sub, mul, div)');

let result = eval(`${firstNumber} ${operation === 'add' ? '+' : operation === 'sub' ? '-' : operation === 'mul' ? '*' : operation === 'div' ? '/' : 'Invalid'} ${secondNumber}`);

alert(`The result is ${result}`);
console.log(`The result is ${result}`);