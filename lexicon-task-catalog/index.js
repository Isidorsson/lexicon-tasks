let characters = [];
let currentPage = 1;
const itemsPerPage = 5;

//  query selector to select the elements
const searchInput = document.querySelector(".search-input");
const characterName = document.querySelector(".character-name");
const planetName = document.querySelector(".tattoiin");
const planetDescription = document.querySelector(".planet-description");
const characterDescription = document.querySelector(".character-description");
const firstButton = document.querySelector(".first");
const previousButton = document.querySelector(".previous");
const pageNumber = document.querySelector(".page-number");
const nextButton = document.querySelector(".next");
const lastButton = document.querySelector(".last");

/**
 * The above code defines two functions, `showLoaders()` and `hideLoaders()`, which respectively
 * display and hide elements with the class name "loader".
 */
function showLoaders() {
  const loaders = document.querySelectorAll(".loader");
  loaders.forEach((loader) => {
    loader.style.display = "block";
  });
  const blur = document.querySelectorAll(".blur");
  blur.forEach((blur) => {
    blur.style.display = "block";
  });
}

function hideLoaders() {
  const loaders = document.querySelectorAll(".loader");
  loaders.forEach((loader) => {
    loader.style.display = "none";
  });
  const blur = document.querySelectorAll(".blur");
  blur.forEach((blur) => {
    blur.style.display = "none";
  });
}

// Function to update character details
function updateCharacterDetails(character) {
  characterName.textContent = character.name;
  characterDescription.textContent = `Height: ${character.height} Mass: ${character.mass} Hair color: ${character.hair_color} Skin color: ${character.skin_color} Eye color: ${character.eye_color} Birth year: ${character.birth_year} Gender: ${character.gender}`;
}

// Function to update planet details
function updatePlanetDetails(planet) {
  planetName.textContent = planet.name;
  planetDescription.textContent = `Rotation period: ${planet.rotation_period} Orbital period: ${planet.orbital_period} Diameter: ${planet.diameter} Climate: ${planet.climate} Gravity: ${planet.gravity} Terrain: ${planet.terrain}`;
}

// Function to update character list
function updateCharacterList(characters) {
  const list = document.querySelector(".list");
  list.innerHTML = "";

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const charactersOnPage = characters.slice(start, end);

  charactersOnPage.forEach((character) => {
    const listItem = document.createElement("li");
    listItem.classList.add("list-item");
    listItem.addEventListener("click", function () {
      updateCharacterDetails(character);
      fetch(character.homeworld)
        .then((response) => response.json())
        .then((planet) => updatePlanetDetails(planet));
    });

    const characterName = document.createElement("p");
    characterName.classList.add("character-name");
    characterName.textContent = character.name;

    listItem.appendChild(characterName);
    list.appendChild(listItem);
  });

  pageNumber.textContent = currentPage;

  firstButton.disabled = currentPage === 1;
  previousButton.disabled = currentPage === 1;
  nextButton.disabled =
    currentPage === Math.ceil(characters.length / itemsPerPage);
  lastButton.disabled =
    currentPage === Math.ceil(characters.length / itemsPerPage);
}

if (characters.length === 0) {
  showLoaders();
  setTimeout(() => {
    fetch("https://swapi.dev/api/people/")
      .then((response) => response.json())
      .then((data) => {
        characters = data.results;

        updateCharacterList(characters);

        updateCharacterDetails(characters[0]);

        fetch(characters[0].homeworld)
          .then((response) => response.json())
          .then((planet) => {
            updatePlanetDetails(planet);
          });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    hideLoaders();
  }, 1000);
}
// Add an event listener for the 'input' event
searchInput.addEventListener("input", function (event) {
  const query = event.target.value.toLowerCase();
  console.log(query);

  const filteredCharacters = characters.filter((character) => {
    return character.name.toLowerCase().includes(query);
  });
  console.log(filteredCharacters);

  updateCharacterList(filteredCharacters);

  if (filteredCharacters.length > 0) {
    updateCharacterDetails(filteredCharacters[0]);

    // Fetch and display planet details for the first filtered character
    fetch(filteredCharacters[0].homeworld)
      .then((response) => response.json())
      .then((planet) => updatePlanetDetails(planet));
  }
  currentPage = 1;
});

/* The code block is adding event listeners to the buttons on the page. */
firstButton.addEventListener("click", function () {
  currentPage = 1;
  updateCharacterList(characters);
});

previousButton.addEventListener("click", function () {
  currentPage--;
  updateCharacterList(characters);
});

nextButton.addEventListener("click", function () {
  currentPage++;
  updateCharacterList(characters);
});

lastButton.addEventListener("click", function () {
  currentPage = Math.ceil(characters.length / itemsPerPage);
  updateCharacterList(characters);
});
