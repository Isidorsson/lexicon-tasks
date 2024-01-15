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

function Sum(num1, num2) {
let sum = num1 + num2;
console.log(sum);
return sum;

}
Sum(2, 3); // 5

// Division
// Create a function that takes two numbers as arguments and returns the quotient of those numbers. Save that to variable and log it to the console. Remember that you can't divide with zero. So a check must be than in order to prevent the calculation if you are trying to divide by zero. Log an error message to the console if that happens.

function Div(num1, num2) {
  if (num2 === 0) {
    console.log("You can't divide by zero");
  } else {
    let div = num1 / num2;
    console.log(div);
    return div;
  }
}

Div(2, 0); // You can't divide by zero

// Area
// Create a function that takes a length and a width of an imaginary box as arguments and return the area of that box. Log a message to the console that describes the area of the box.
function Area(length, width) {
  let area = length * width;
  console.log(`The area of the box is ${area}`);
  return area;
}

Area(2, 3); // The area of the box is 6

// Greeting with name again
// Create a function that takes a first name and a last name as arguments. Return a template literals that says: "Hello [firstName] [lastName]! How are you doing?"

function Greeting(firstName, lastName) {
  console.log(`Hello ${firstName} ${lastName}! How are you doing?`);
}

Greeting("John", "Doe"); // Hello John Doe! How are you doing?