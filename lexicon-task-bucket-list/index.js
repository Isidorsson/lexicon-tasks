
const p = document.createElement("p");
p.innerText = "learn go";
document.body.appendChild(p);

const p2 = document.createElement("p");
p2.innerText = "learn svelte";
document.body.insertAdjacentElement("beforeend", p2);

const list = document.querySelector(".list");
console.log(list.innerHTML);

list.innerHTML = "<div>This is a div element as a string</div>";






// const randomText = [
//   "Skydiving",
//   "Traveling to all seven continents",
//   "Learning a new language",
//   "Writing a book",
//   "Running a marathon",
//   "Scuba diving",
//   "Starting a business",
//   "Learning to play a musical instrument",
//   "Volunteering abroad",
//   "Bungee jumping"
// ];


