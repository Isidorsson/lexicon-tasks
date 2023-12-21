window.onload = function() {
  var dates = document.querySelectorAll(".dates-grid span");
  var randomIndex = Math.floor(Math.random() * dates.length);
  dates[randomIndex].classList.add("highlighted-day");
}
