//1. change name from ash to potato in the h3 tag
document.querySelector('.art-1 h3').textContent = 'Potato';

//2. change the name of home to start
document.querySelectorAll('a').forEach(link => {
  if (link.textContent === 'Home') {
    link.textContent = 'Start';
  }
});

//3. change contact to mail us
document.querySelectorAll('a').forEach(link => {
  if (link.textContent === 'Contact') {
    link.textContent = 'Mail Us';
  }
});

//4. change informationa bout Sinus Hoodie
document.querySelector('.art-2 p').textContent = 'Some cool information about Sinus Hoodie';

//5. change background color and text on one of the buttons
document.querySelector('.art-3 button').style.backgroundColor = 'red';
document.querySelector('.art-3 button').textContent = 'Ok';

//6. change the background of a product
document.querySelector('.art-1').style.backgroundColor = 'lightblue';

//7. change adress on the site
document.querySelector('footer p').innerHTML = 'Potato Street 1,<br>123 45<br>Potato City';

//8. change color of the p tags
document.querySelectorAll('p').forEach(p => {
  p.style.color = 'green';
});

