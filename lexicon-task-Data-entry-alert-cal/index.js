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



// the alrt calculator thing
let firstNumber1 = parseFloat(prompt('Enter a number'));
let secondNumber1 = parseFloat(prompt('Enter another number'));

let operation1 = prompt('What operation1 do you want to perform? (add, sub, mul, div)');
let result1;

if (operation1 === 'add') {
    result1 = firstNumber1 + secondNumber1;
    alert(`The result1 is ${result1}`);
}
else if (operation1 === 'sub') {
    result1 = firstNumber1 - secondNumber1;
    alert(`The result1 is ${result1}`);
}
else if (operation1 === 'mul') {
    result1 = firstNumber1 * secondNumber1;
    alert(`The result1 is ${result1}`);
}
else if (operation1 === 'div') {
    result1 = firstNumber1 / secondNumber1;
    alert(`The result1 is ${result1}`);
}
else {
    alert('Invalid operation');
}
