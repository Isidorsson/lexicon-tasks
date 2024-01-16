const numbers = [1, 2, 3, 4, 5];
// 1. Create a variable where you store the first element of the `numbers` array. Log it to the console.
const firstElement = numbers[0];
console.log(firstElement);
// 2. Create a variable where you store the last element of the `numbers` array. Log it to the console.
const lastElement = numbers[numbers.length - 1];
console.log(lastElement);
// 3. Create a variable where you store the fourth element of the `numbers` array. Log it to the console.
const fourthElement = numbers[3];
console.log(fourthElement);
// 4. Store the second and the fifth element of the `numbers` array in variables. Create a new array and populate it with those two variables. Log it to the console.
const secondElement = numbers[1];
const fifthElement = numbers[4];
const newArray = [secondElement, fifthElement];
console.log(newArray);
// 5. What is the length of the `numbers` array? Use the correct array property to save that number to a variable and log it to the console.
const length = numbers.length;
console.log(length);
// 6. Add an arbitrary number to the end of the `numbers` array with the correct array method. This array method returns a value. Save that to a variable and log it to the console. What does this number represent?
const arbitraryNumber = numbers.push(6);
console.log(arbitraryNumber);
// 7. Add an arbitrary number to the start of the `numbers` array using the correct array method. This method also returns a value. Log it to the console and reflect on what this value means.
const arbitraryNumber2 = numbers.unshift(0);
console.log(arbitraryNumber2);
// 8. By now the `numbers` array should have been modified a couple of times. Let's shrink it again. Remove the last element from the array with an array method. This method should return a value as well. Log it to the console as see what it is.
const removedElement = numbers.pop();
console.log(removedElement);
// 9. Do the same as the last one, but remove it from the beginning instead. Log the return value to the console.
const removedElement2 = numbers.shift();
console.log(removedElement2);
// 10. If we have done the last couple of exercises correctly, we should have the same content as the default array. Log it out the console and see for yourself. 
console.log(numbers);
// The first five exercises didn't modify the array but the last four did. This is something to think about when working with arrays. These methods that we have used are called destructive which means that they always change the content of the array. This also means we need to be careful when using these methods so we don't unexpectedly modify an array.
