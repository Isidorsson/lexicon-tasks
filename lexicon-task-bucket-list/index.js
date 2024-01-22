// const p = document.createElement("p");
// p.innerText = "learn go";
// document.body.appendChild(p);

// const p2 = document.createElement("p");
// p2.innerText = "learn svelte";
// document.body.insertAdjacentElement("beforeend", p2);


// const list = document.querySelector(".list");
// console.log(list.innerHTML);


// list.innerHTML = "<div>This is a div element as a string</div>";


const randomText =[ "eaque", "autem", "quis", "in", "nemo" ]
for (let i = 0; i < randomText.length; i++) {
  const li = document.createElement("p");
  li.innerText = randomText[i];
  document.body.appendChild(li);
}

