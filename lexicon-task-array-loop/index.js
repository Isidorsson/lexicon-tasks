// 1. Create an empty array and fill it with different elements using the push-method. Log it to the console.

let emptyArray = [];
emptyArray.push("Hello");
emptyArray.push("World");
emptyArray.push("!");
console.log(emptyArray);

// 2. Create an array containing arbitrary numbers. Loop throught that array and multiply each element with 3 and log that to the console.

const numbers = [1, 2, 3, 4, 5];
for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i] * 3);
}

// 3. Create an array with numbers, and one empty array. Loop through the array with numbers and do an if check in each iteration. If that number is bigger then a specific number, 5 for example, add that number to the empty array. Log the new array to the console in the end. Remember to use the indexes to get the elements from the array with numbers.

let numbers2 = [1, 2, 3, 4, 5];
let emptyArray2 = [];
for (let i = 0; i < numbers2.length; i++) {
  if (numbers2[i] > 3) {
    emptyArray2.push(numbers2[i]);
  }
}
console.log(emptyArray2);

// 4. Create an array with random numbers. Loop through the array and add them all together. Log the total sum of all the elements to the console. `hint` - You will need a variable here that store the sum as you iterate over the array.

const randomNumbers = [1, 2, 3, 4, 5];
let sum = 0;
for (let i = 0; i < randomNumbers.length; i++) {
  sum += randomNumbers[i];
}
console.log(sum);

// 5. Create an array with some elements. Now search for a specific element while you are looping through the array. If you find the element you are searching for, log it to the console. 

const someElements = ["Hello", "World", "!"];
for (let i = 0; i < someElements.length; i++) {
  if (someElements[i] === "Hello") {
    console.log(someElements[i]);
  }
}

// 6. Create an array with some elements, remove the last element **WITHOUT** using `pop()`. 

const someElements2 = ["Hello", "World", "!"];
someElements2.splice(2, 1);
console.log(someElements2);

// 7. Create an array with 10 different numbers. Find the biggest number in the array and log it to the console. `hint` - You will need a variable that holds the current biggest number.

const tenNumbers = [13, 94, 23, 44, 11, 23, 32, 65, 43, 56];
let biggestNumber = 0;
for (let i = 0; i < tenNumbers.length; i++) {
  if (tenNumbers[i] > biggestNumber) {
    biggestNumber = tenNumbers[i];
  }
}
console.log(biggestNumber);

// 8. Create an array with some elements and an empty array. Using a loop, copy the content of the first array to the empty array.

const someElements3 = ["Hello", "World", "!"];
let emptyArray3 = [];
for (let i = 0; i < someElements3.length; i++) {
  emptyArray3.push(someElements3[i]);
}
console.log(emptyArray3);

// 9. Create an array with some elements. Use a loop to empty the entire array so there are no elements left in the end.

const someElements4 = ["Hello", "World", "!"];
while (someElements4.length > 0) {
  someElements4.pop();
}
console.log(someElements4);