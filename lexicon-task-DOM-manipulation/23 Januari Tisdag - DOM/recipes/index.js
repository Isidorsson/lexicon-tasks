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
