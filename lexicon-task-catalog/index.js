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
  showLoaders();
  setTimeout(() => {
    characterName.textContent = character.name;
    characterDescription.textContent = `Height: ${character.height} Mass: ${character.mass} Hair color: ${character.hair_color} Skin color: ${character.skin_color} Eye color: ${character.eye_color} Birth year: ${character.birth_year} Gender: ${character.gender}`;
    hideLoaders();
  }, 500);
}

// Function to update planet details
function updatePlanetDetails(planet) {
  showLoaders();
  setTimeout(() => {
    planetName.textContent = planet.name;
    planetDescription.textContent = `Rotation period: ${planet.rotation_period} Orbital period: ${planet.orbital_period} Diameter: ${planet.diameter} Climate: ${planet.climate} Gravity: ${planet.gravity} Terrain: ${planet.terrain}`;
    hideLoaders();
  }, 500);
}
// Function to update character list
function updateCharacterList(characters) {
  const list = document.querySelector(".list");
  list.innerHTML = "";

  showLoaders();

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const charactersOnPage = characters.slice(start, end);
  setTimeout(() => {
    charactersOnPage.forEach((character) => {
      const listItem = document.createElement("li");
      listItem.classList.add("list-item");

      const characterName = document.createElement("p");
      characterName.classList.add("character-name");
      characterName.textContent = character.name;

      listItem.appendChild(characterName);
      list.appendChild(listItem);
    });
    hideLoaders();
  }, 500);

  // Update page number
  pageNumber.textContent = currentPage;
  // Enable or disable pagination buttons
  firstButton.disabled = currentPage === 1;
  previousButton.disabled = currentPage === 1;
  nextButton.disabled =
    currentPage === Math.ceil(characters.length / itemsPerPage);
  lastButton.disabled =
    currentPage === Math.ceil(characters.length / itemsPerPage);
}
// Check if characters array is empty
if (characters.length === 0) {
  showLoaders();
  setTimeout(() => {
    // Fetch the data from the SWAPI
    fetch("https://swapi.dev/api/people/")
      .then((response) => response.json())
      .then((data) => {
        characters = data.results;

        // Display characters in the list
        updateCharacterList(characters);

        // Display first character details by default
        updateCharacterDetails(characters[0]);

        // Fetch and display planet details for the first character
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
  }, 100);
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
