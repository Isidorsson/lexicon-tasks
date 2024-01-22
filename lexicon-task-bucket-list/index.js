// const p = document.createElement("p");
// p.innerText = "learn go";
// document.body.appendChild(p);

// const p2 = document.createElement("p");
// p2.innerText = "learn svelte";
// document.body.insertAdjacentElement("beforeend", p2);


// const list = document.querySelector(".list");
// console.log(list.innerHTML);


// list.innerHTML = "<div>This is a div element as a string</div>";

const list = document.querySelector(".list"); 

const randomText = ["eaque", "autem", "quis", "in", "nemo", "aut"];
randomText.forEach(text => {
  const li = document.createElement("p");
  li.innerText = text;
  list.appendChild(li); 
});

console.log('Number of items', list.children.length);

const owner = document.querySelector(".owner");
owner.innerText = "Andreas";


const newLi = document.createElement("p");
newLi.innerText = "This is a new";
list.replaceChild(newLi, list.children[0]);

//one way to change instead of using replaceChild
list.children[3].innerText = "This is a new line";


list.removeChild(list.lastElementChild);
