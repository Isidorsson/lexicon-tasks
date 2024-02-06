// const url = "https://swapi.dev/api/people/1/";

// fetch(url)
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data);
//   }
//   )
//   .catch((error) => console.log("error", error));

let characters = [];

// Elements
const searchInput = document.querySelector(".search-input");
const characterName = document.querySelector(".character-name");


// Check if characters array is empty
if (characters.length === 0) {
  // Fetch the data from the SWAPI 
  fetch("https://swapi.dev/api/people/")
    .then((response) => response.json())
    .then((data) => {
      characters = data.results;
      console.log(characters);
    });
}

// Add an event listener for the 'input' event
searchInput.addEventListener("input", function (event) {
  // Get the search query
  const query = event.target.value.toLowerCase();
  console.log(query);

  // Filter the characters array
  const filteredCharacters = characters.filter((character) => {
    return character.name.toLowerCase().includes(query);
  });
  console.log(filteredCharacters);
});

