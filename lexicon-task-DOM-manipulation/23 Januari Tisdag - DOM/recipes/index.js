// 1. What is the name of the recipe?
const recipeNameElement = document.getElementById('recipe-name');
const recipeName = recipeNameElement.innerText;

console.log(`Recipe Name: ${recipeName}`);

// 2. What HTML tag is used to display the Recipe name?
const recipeNameTag = recipeNameElement.tagName;
console.log(`Recipe Name Tag: ${recipeNameTag}`);

// 3. What is the font size of the paragraph tag with the class _"description"_.
const descriptionElement = document.querySelector('.description');
const descriptionFontSize = window.getComputedStyle(descriptionElement).fontSize;
console.log(`Description Font Size: ${descriptionFontSize}`);

//4. What is the value of the `alt` atrribute on the image?
const imageElement = document.querySelector('img');
const imageAlt = imageElement.alt;
console.log(`Image Alt: ${imageAlt}`);

//5. What is the dimensions and the url of the image? Create an object that looks like this, and log it to the console:

const imageWidth = imageElement.width;
const imageHeight = imageElement.height;
const imageSrc = imageElement.src;

const imageInfo = {
  src: imageSrc,
  height: imageHeight,
  width: imageWidth,
};

console.log(imageInfo);

// 6. How many ingredients has the paste?
const ingredients = document.querySelectorAll('.ingredients-container li');
console.log(`Number of ingredients: ${ingredients.length}`);

// 7. Which is the forth element in the list containing the ingredients for the paste?
const fourthIngredient = ingredients[3];
console.log(`Fourth ingredient: ${fourthIngredient.innerText}`);

// 8. Create an an array of objects from the instructions. Each element in the array should be an object that looks like this:
// order: number;
// text: instruction;

const instructions = document.querySelectorAll('.instructions-container li');
const instructionsArray = [];
// {
//   order: number;
//   text: instruction;
// }
instructions.forEach((instruction, index) => {
  const instructionObject = {
    order: index + 1,
    text: instruction.innerText,
  };
  instructionsArray.push(instructionObject);
});

console.log(instructionsArray);