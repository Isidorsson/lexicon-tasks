// 1.
let age = 30;
console.log(`My age is ${age} years old`);
// 2.
const constVariable = "I am a constant variable and I cannot be changed";
let letVariable = "I am a let variable and I can be changed";
var varVariable = "I am a var variable and i can be changed and I am also a global variable";
console.log(constVariable);
console.log(letVariable);
console.log(varVariable);

// 3.
let string = "string";
let number = 10;
let boolean = true;
console.log(`This is a string = ${string}`);
console.log(`This is a number = ${number}`);
console.log(`This is a boolean = ${boolean}`);

// 4.
// const firstName = "John";
let firstName = "John";
console.log(`My name is ${firstName}`);
firstName = "Jane";
console.log(`My name is ${firstName}`);

// 5.
// When we should use a boolean is when we want to check if something is true or false like if x is greater than y return true else return false

// 6.
//Should set it to const so it don't get changed by mistake and it is a constant value

// 7.
let number1 = 10;
let number2 = 5;
let result = number1 + number2;
console.log(`The result is ${result} after adding ${number1} and ${number2}`);
let result1 = number1 - number2;
// 8.
console.log(`The result is ${result1} after subtracting ${number1} and ${number2}`);
let result2 = number1 * number2;
console.log(`The result is ${result2} after multiplying ${number1} and ${number2}`);
let result3 = number1 / number2;
console.log(`The result is ${result3} after dividing ${number1} and ${number2}`);
let result4 = number1 % number2;
console.log(`The result is ${result4} after dividing ${number1} and ${number2} and the remainder is ${result4}`);

// 9.
let a = 10;
console.log(`The value of a is ${a}`);

// 10.
a += 5;
console.log(`The value of a is ${a} after adding 5 to it`);


// 11.
// let a = 10;
// a = a - 4;
// a = 7;
// a = a + 2;
// console.log(a);


// set a to 10 then we subtract 4 turns a to 6 then it overwrite a to 7 then we adding 2 to a and it turns to 9. Basically it a waste of time with a = a - 4 and a = a + 2 because it will overwrite it anyway so we can just do a = 7 + 2 and it will be the same thing
