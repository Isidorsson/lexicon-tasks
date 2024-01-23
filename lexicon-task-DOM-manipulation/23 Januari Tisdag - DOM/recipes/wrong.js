// 1. The logo text of the site has the wrong color. Change it to the correct one.
const logo = document.querySelector('.logo-text')
logo.style.color = 'lightgray'

// 2. The alignment of the elements inside the header element are wrong. Change it to the correct one. `Hint`, check the flex properties for the correct alignment. Here is a link that might help:

const header = document.querySelector('header')
header.style.justifyContent = 'flex-start'

// 3. The header has a border at the bottom, but it has the wrong color. Change it do the correct one.
header.style.borderBottom = '1px solid lightgray'

