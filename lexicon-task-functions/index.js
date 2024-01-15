// Create a function that greets you with "Hello there my friend!".
function Hello() {
  console.log("Hello there my friend!");
}

Hello(); // Hello there my friend!

// Greeting with name Create a function that takes a string as an argument and writes out: "Hello there my friend! You must be [name]!"
function HelloName(name) {
  console.log(`Hello there my friend! You must be ${name}`);
}

HelloName("John"); // Hello there my friend! You must be John

// Addition
// Create a function that takes two numbers as arguments and returns the sum of those two numbers. Save that sum in a variable and log it to the console.

function twoSum(num1, num2) {
  const sum = num1 + num2;
  return sum;

}
const sumReturn = twoSum(2, 3); // 5

console.log(`The sum is ${sumReturn}`); // The sum is 5

// Division
// Create a function that takes two numbers as arguments and returns the quotient of those numbers. Save that to variable and log it to the console. Remember that you can't divide with zero. So a check must be than in order to prevent the calculation if you are trying to divide by zero. Log an error message to the console if that happens.

function Div(num1, num2) {
  if (num2 === 0) {
    return "You can't divide by zero";
  } else {
    let div = num1 / num2;
    return div;
  }
}

const result = Div(2, 0);
console.log(result); // You can't divide by zero

// Area
// Create a function that takes a length and a width of an imaginary box as arguments and return the area of that box. Log a message to the console that describes the area of the box.
function Area(length, width) {
  let area = length * width;
  return area;
}

const boxArea = Area(2, 3);
console.log(`The area of the box is ${boxArea}`);

Area(2, 3); // The area of the box is 6

// Greeting with name again
// Create a function that takes a first name and a last name as arguments. Return a template literals that says: "Hello [firstName] [lastName]! How are you doing?"

function Greeting(firstName, lastName) {
  console.log(`Hello ${firstName} ${lastName}! How are you doing?`);
}

Greeting("John", "Doe"); // Hello John Doe! How are you doing?

// Distance converter
// Create a function that takes a distance in kilometres as an arguments and returns the distanse in miles. (The American kind of miles). Save to a variable and log a description of the conversion to the console.

function Converter(km) {
  let miles = km * 0.6214;
  return miles;
}

const kmValue = parseFloat(prompt("Enter the distance in kilometers:"));
const milesValue = Converter(kmValue);
console.log(`${kmValue} km is ${milesValue} miles`);


// Temperature converter
// Create a function that takes a celsius temperature as an argument and returns the temperature in farenheit. Log the result message to the console.

function Temperature(celsius) {
  let farenheit = celsius * 1.8 + 32;
  return farenheit;
}

const celsiusValue = parseFloat(prompt("Enter the temperature in celsius:"));
const farenheitValue = Temperature(celsiusValue);
console.log(`${celsiusValue}°C is ${farenheitValue}°F`);



// Mean value (Needs knowledge of Arrays)
// Create a function that takes an array of numbers as an argument. Return the mean value of all those numbers, save it and log it to the console.

function MeanValue(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum = sum + parseFloat(arr[i]);
  }
  let mean = sum / arr.length;
  return mean;
}

const arr = [1, 2, 3, 4, 5];
const mean = MeanValue(arr);
console.log(`The mean value is ${mean}`); // The mean value is 3
