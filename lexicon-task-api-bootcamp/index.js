// fetch("https://majazocom.github.io/Data/pokemons.json")
//   .then((response) => response.json())
//   .then((data) => {
//     data.forEach((pokemon) => {
//       console.log(pokemon);
//       const pokemonDiv = document.createElement("div");
//       pokemonDiv.innerHTML = `<h2>${pokemon.name}</h2>`;
//       document.body.appendChild(pokemonDiv);
//     });
//   })
//   .catch((error) => console.error("Error:", error));

// age
// :
// 2
// breed
// :
// "boxer"
// chipNumber
// :
// "NIM789425"
// img
// :
// "https://images.dog.ceo/breeds/boxer/n02108089_1357.jpg"
// name
// :
// "Ville"
// owner
// :
// lastName
// :
// "Ahlman"
// name
// :
// "Daniel"
// phoneNumber
// :
// "0732150206"
// [[Prototype]]
// :
// Object
// present
// :
// true
// sex
// :
// "male"

fetch("https://majazocom.github.io/Data/dogs.json")
  .then((response) => response.json())
  .then((data) => {
    const parentDiv = document.querySelector('.dog-Div');
    data.forEach((dog) => {
      const dogDiv = document.createElement("grid-dog");
      dogDiv.innerHTML = `<h2>Dog name: ${dog.name}</h2>`;
      dogDiv.innerHTML += `<p>Dog breed: ${dog.breed}</p>`;
      dogDiv.innerHTML += `<p>Dog age: ${dog.age}</p>`;
      dogDiv.innerHTML += `<p>Dog sex: ${dog.sex}</p>`;
      dogDiv.innerHTML += `<p>Dog chip: ${dog.chipNumber}</p>`;
      dogDiv.innerHTML += `<img src="${dog.img}">`;
      dogDiv.innerHTML += `<p>Owner: ${dog.owner.name} ${dog.owner.lastName}</p>`;
      dogDiv.innerHTML += `<p>Phone: ${dog.owner.phoneNumber}</p>`;
      dogDiv.innerHTML += `<p>Present: ${dog.present}</p>`;

      parentDiv.appendChild(dogDiv);
    });
  });