// 1. The logo text of the site has the wrong color. Change it to the correct one.
const logo = document.querySelector('.logo-text')
logo.style.color = 'lightgray'

// 2. The alignment of the elements inside the header element are wrong. Change it to the correct one. `Hint`, check the flex properties for the correct alignment. Here is a link that might help:

const header = document.querySelector('header')
header.style.justifyContent = 'flex-start'

// 3. The header has a border at the bottom, but it has the wrong color. Change it do the correct one.
header.style.borderBottom = '1px solid lightgray'

// 4. The recipe name is wrong, change it to the correct one.
const recipeName = document.querySelector('#recipe-name')
recipeName.innerText = 'Frozen Cheescake'

// 5. The clock icon beneath the recipe name has disappeared and been replaced by a text instead. This can be fixed by adding a class to that element.
const timeContainer = document.querySelector('span')
timeContainer.classList.add('material-icons')

// 6. The estimated time of the recipe is also incorrect. Change it to the correct time estimation.
const time = document.querySelector('.time')
time.innerText = '60+ min'

// 7. The src path to the image is wrong, or atleast it's showing the wrong image. Change it to the correct one. The available images can be found in the assets folder.
const image = document.querySelector('img')
image.src = 'assets/frozen-cheesecake-slice.jpg'
