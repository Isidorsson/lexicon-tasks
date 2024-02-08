let characters = [];
let currentPage = 1;
const itemsPerPage = 6;

//  query selector to select the elements
const searchInput = document.querySelector(".search-input");
const characterName = document.querySelector(".character-name-right");
const planetName = document.querySelector(".planet");
const planetDescription = document.querySelector(".planet-description");
const characterDescription = document.querySelector(".character-description");
const firstButton = document.querySelector(".first");
const previousButton = document.querySelector(".previous");
const pageNumber = document.querySelector(".page-number");
const nextButton = document.querySelector(".next");
const lastButton = document.querySelector(".last");

/**
 * The above code is an asynchronous function in JavaScript that fetches data from the Star Wars API
 * (SWAPI) and updates the character list, character details, and planet details on a webpage.
 * @param [url=https://swapi.dev/api/people/] - The `url` parameter is the URL of the API endpoint that
 * returns a list of Star Wars characters. By default, it is set to `'https://swapi.dev/api/people/'`,
 * which is the base URL of the Star Wars API.
 */
async function fetchAllPeople(url = "https://swapi.dev/api/people/") {
  const response = await fetch(url);
  const data = await response.json();

  characters = characters.concat(data.results);

  if (data.next) {
    console.log(data.next);
    await fetchAllPeople(data.next);
  }
}

if (characters.length === 0) {
  showLoaders();
  try {
    await fetchAllPeople();
    updateCharacterList(characters);
    updateCharacterDetails(characters[0]);

    const response = await fetch(characters[0].homeworld);
    const planet = await response.json();
    updatePlanetDetails(planet);
    hideLoaders();
  } catch (error) {
    console.error("Error:", error);
  }
}

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

  // Clear previous character details
  characterDescription.innerHTML = "";

  // Create a new <p> tag for each detail
  const height = document.createElement("p");
  height.textContent = `Height: ${character.height}`;
  characterDescription.appendChild(height);

  const mass = document.createElement("p");
  mass.textContent = `Mass: ${character.mass}`;
  characterDescription.appendChild(mass);

  const hairColor = document.createElement("p");
  hairColor.textContent = `Hair color: ${character.hair_color}`;
  characterDescription.appendChild(hairColor);

  const skinColor = document.createElement("p");
  skinColor.textContent = `Skin color: ${character.skin_color}`;
  characterDescription.appendChild(skinColor);

  const eyeColor = document.createElement("p");
  eyeColor.textContent = `Eye color: ${character.eye_color}`;
  characterDescription.appendChild(eyeColor);

  const birthYear = document.createElement("p");
  birthYear.textContent = `Birth year: ${character.birth_year}`;
  characterDescription.appendChild(birthYear);

  const gender = document.createElement("p");
  gender.textContent = `Gender: ${character.gender}`;
  characterDescription.appendChild(gender);
}

// Function to update planet details
function updatePlanetDetails(planet) {
  planetName.textContent = planet.name;

  // Clear previous planet details
  planetDescription.innerHTML = "";

  // Create a new <p> tag for each detail
  const rotationPeriod = document.createElement("p");
  rotationPeriod.textContent = `Rotation period: ${planet.rotation_period}`;
  planetDescription.appendChild(rotationPeriod);

  const orbitalPeriod = document.createElement("p");
  orbitalPeriod.textContent = `Orbital period: ${planet.orbital_period}`;
  planetDescription.appendChild(orbitalPeriod);

  const diameter = document.createElement("p");
  diameter.textContent = `Diameter: ${planet.diameter}`;
  planetDescription.appendChild(diameter);

  const climate = document.createElement("p");
  climate.textContent = `Climate: ${planet.climate}`;
  planetDescription.appendChild(climate);

  const gravity = document.createElement("p");
  gravity.textContent = `Gravity: ${planet.gravity}`;
  planetDescription.appendChild(gravity);

  const terrain = document.createElement("p");
  terrain.textContent = `Terrain: ${planet.terrain}`;
  planetDescription.appendChild(terrain);
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
    if (charactersOnPage.indexOf(character) % 3 === 0) {
      characterName.style.backgroundColor = "#8E8E8E";
    } else if (charactersOnPage.indexOf(character) % 3 === 1) {
      characterName.style.backgroundColor = "#E1DEDE";
    } else {
      characterName.style.backgroundColor = "#444444";
    }
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

/* The `searchInput.addEventListener("input", function (event) { ... })` code block is adding an event
listener to the search input field. It listens for the "input" event, which is triggered whenever
the user types or deletes text in the input field. */
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
