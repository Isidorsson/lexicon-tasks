//1. change name from ash to potato in the h3 tag
document.querySelector('.art-1 h3').textContent = 'Potato';

//2. change the name of home to start
document.querySelectorAll('a').forEach(link => {
  if (link.textContent === 'Home') {
    link.textContent = 'Start';
  }
});

