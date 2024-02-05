fetch("https://majazocom.github.io/Data/pokemons.json")
  .then((response) => response.json())
  .then((data) => {
    const parentDiv = document.querySelector(".display-pok");
    data.forEach((pokemon) => {
      const pokDiv = document.createElement("grid-pok");
      pokDiv.innerHTML = `<p>Pokemon name: ${pokemon.name}</p>`;
      parentDiv.appendChild(pokDiv);
    });
  })

  .catch((error) => console.error("Error:", error));

fetch("https://majazocom.github.io/Data/dogs.json")
  .then((response) => response.json())
  .then((data) => {
    const parentDiv = document.querySelector(".dog-div");
    data.forEach((dog) => {
      const dogDiv = document.createElement("grid-dog");
      dogDiv.innerHTML = `<h3>Dog name: ${dog.name}</h3>`;
      dogDiv.innerHTML += `<img src="${dog.img}">`;
      dogDiv.innerHTML += `<h3>Owner: ${dog.owner.name} ${dog.owner.lastName}</h3>`;
      dogDiv.innerHTML += `<p>Dog breed: ${dog.breed}</p>`;
      dogDiv.innerHTML += `<p>Dog age: ${dog.age}</p>`;
      dogDiv.innerHTML += `<p>Dog sex: ${dog.sex}</p>`;
      dogDiv.innerHTML += `<p>Dog chip: ${dog.chipNumber}</p>`;
      dogDiv.innerHTML += `<p>Phone: ${dog.owner.phoneNumber}</p>`;
      dogDiv.innerHTML += `<p>Present: ${dog.present}</p>`;

      parentDiv.appendChild(dogDiv);
    });
  });
