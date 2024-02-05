fetch("https://majazocom.github.io/Data/pokemons.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((pokemon) => {
      console.log(pokemon);
      const pokemonDiv = document.createElement("div");
      pokemonDiv.innerHTML = `<h2>${pokemon.name}</h2>`;
      document.body.appendChild(pokemonDiv);
    });
  })
  .catch((error) => console.error("Error:", error));
