// https://api.punkapi.com/v2/

let beerData = [];

let currentBeer = null;

const randomBeerImg = document.querySelector(".random-beer-img");
const randomBeerInfo = document.querySelector(".random-beer-info");
const randomBeerName = document.querySelector(".random-beer-name");
const randomBeerViewMore = document.querySelector(".random-beer-view-more-btn");
const randomBeerBtn = document.querySelector(".random-beer-btn");
const clearLocalStorageBtn = document.querySelector(".clear-local-storage-btn");
const beerList = document.querySelector(".beer-list");

const searchInput = document.querySelector(".search-input");
const beerName = document.getElementById("beer-name");
const dropdown = document.getElementById("dropdown");

const modal = document.querySelector(".modal");
const modalText = document.querySelector(".modal-text");
const span = document.querySelector(".close");

function clearLocalStorage() {
  localStorage.clear();
  location.reload();
}

clearLocalStorageBtn.addEventListener("click", clearLocalStorage);
async function fetchBeerData() {
  document.querySelector(".loading-overlay").style.display = "flex";
  try {
    const storedData = localStorage.getItem("beerData");

    if (!storedData) {
      console.log("Fetching data from API");
      // const response = await fetch("https://api.punkapi.com/v2/beers");
      const response = await fetch("https://api.punkapi.com/v2/beers?per_page=50");
      const data = await response.json();
      beerData = data;
    } else {
      console.log("Fetching data from local storage");
      beerData = JSON.parse(storedData);
    }

    return beerData;
  } catch (error) {
    console.error("Error:", error);
    document.querySelector(".loading-overlay").style.display = "none";
    // Display an error message to the user
    // document.querySelector(".error-message").textContent = "An error occurred while fetching the beer data.";
  } finally {
    document.querySelector(".loading-overlay").style.display = "none";
    console.log(`Fetched ${beerData.length} beers.`);
  }
}

fetchBeerData();

async function initialize() {
  try {
    await fetchBeerData();
    displayRandomBeer();
    displayBeers(beerData);
  } catch (error) {
    console.error("Error:", error);
  }
}

function displayRandomBeer() {
  try {
    const randomBeer = beerData[Math.floor(Math.random() * beerData.length)];
    currentBeer = randomBeer;
    randomBeerInfo.innerHTML = `
      <h3><strong>Name: </strong> ${randomBeer.name}</h3>
      <p><strong>Tagline:</strong> ${randomBeer.tagline}</p>
      <p><strong>Description:</strong> ${randomBeer.description}</p>
      <p><strong>Food Pairing:</strong> ${randomBeer.food_pairing}</p>
    `;
    randomBeerImg.src = randomBeer.image_url;
    randomBeerViewMore.href = `beer.html?beerId=${randomBeer.id}`;
  } catch (error) {
    console.error("Error:", error);
  }
}
initialize();
randomBeerBtn.addEventListener("click", displayRandomBeer);

// displayRandomBeer();

function generateFoodPairingList(food_pairing) {
  return food_pairing.map((food) => `<li>${food}</li>`).join("");
}

function generateHopsList(hops) {
  return hops
    .map(
      (hop) =>
        `<li>${hop.name} (Amount: ${hop.amount.value} ${hop.amount.unit})</li>`
    )
    .join("");
}

function generateMaltList(malt) {
  return malt
    .map(
      (malt) =>
        `<li>${malt.name} (Amount: ${malt.amount.value} ${malt.amount.unit})</li>`
    )
    .join("");
}
// dont like this part gotta refactor
randomBeerViewMore.onclick = function () {
  if (currentBeer) {
    modal.style.display = "block";
    modalText.innerHTML = `
    <h3><strong>Name: </strong> ${currentBeer.name}</h3>
    <p><strong>Tagline:</strong> ${currentBeer.tagline}</p>
    <p><strong>First Brewed:</strong> ${currentBeer.first_brewed}</p>
    <p><strong>Description:</strong> ${currentBeer.description}</p>
    <p><strong>Alcohol by volume (ABV):</strong> ${currentBeer.abv}</p>
    <p><strong>Volume:</strong> ${currentBeer.volume.value} ${currentBeer.volume.unit
      }</p>
    <p><strong>Food Pairing:</strong></p>
    <ul>${generateFoodPairingList(currentBeer.food_pairing)}</ul>
    <p><strong>Brewers Tips:</strong> ${currentBeer.brewers_tips}</p>
    <p><strong>Ingredients:</strong></p>
    <p><strong>Hops:</strong></p>
    <ul>${generateHopsList(currentBeer.ingredients.hops)}</ul>
    <p><strong>Malt:</strong></p>
    <ul>${generateMaltList(currentBeer.ingredients.malt)}</ul>
    <p><strong>Yeast:</strong> ${currentBeer.ingredients.yeast}</p>
    `;
  }
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};



function displayBeers(beers) {
  const beersDiv = document.querySelector(".beers");
  beersDiv.innerHTML = "";

  beers.forEach((beer) => {
    const beerCard = document.createElement("div");
    beerCard.className = "beer-card";

    const beerImage = document.createElement("img");
    beerImage.src = beer.image_url;
    beerImage.alt = "beer image";
    beerCard.appendChild(beerImage);

    const beerName = document.createElement("h3");
    beerName.textContent = beer.name;
    beerCard.appendChild(beerName);

    const beerDescription = document.createElement("p");
    beerDescription.textContent = beer.description;
    beerCard.appendChild(beerDescription);

    const viewMoreBtn = document.createElement("a");
    // viewMoreBtn.href = `beer.html?beerId=${beer.id}`;
    // set so it wont do anything a modal will pop up instead
    viewMoreBtn.href = "#";
    viewMoreBtn.className = "view-more-btn";
    viewMoreBtn.textContent = "View More";
    beerCard.appendChild(viewMoreBtn);

    // Add click event listener to beer card
    beerCard.addEventListener("click", function () {
      event.preventDefault();
      currentBeer = beer;
      modal.style.display = "block";
      modalText.innerHTML = `
        <h3><strong>Name: </strong> ${currentBeer.name}</h3>
        <p><strong>Tagline:</strong> ${currentBeer.tagline}</p>
        <p><strong>First Brewed:</strong> ${currentBeer.first_brewed}</p>
        <p><strong>Description:</strong> ${currentBeer.description}</p>
        <p><strong>Alcohol by volume (ABV):</strong> ${currentBeer.abv}</p>
        <p><strong>Volume:</strong> ${currentBeer.volume.value} ${currentBeer.volume.unit
        }</p>
        <p><strong>Food Pairing:</strong></p>
        <ul>${generateFoodPairingList(currentBeer.food_pairing)}</ul>
        <p><strong>Brewers Tips:</strong> ${currentBeer.brewers_tips}</p>
        <p><strong>Ingredients:</strong></p>
        <p><strong>Hops:</strong></p>
        <ul>${generateHopsList(currentBeer.ingredients.hops)}</ul>
        <p><strong>Malt:</strong></p>
        <ul>${generateMaltList(currentBeer.ingredients.malt)}</ul>
        <p><strong>Yeast:</strong> ${currentBeer.ingredients.yeast}</p>
      `;
    });

    beersDiv.appendChild(beerCard);
  });
}

function getSearchValues() {
  const name = document.querySelector('.name').value;
  const hops = document.querySelector('.hops').value;
  const malt = document.querySelector('.malt').value;
  const brewedBefore = new Date(document.querySelector('.brewed-before').value);
  const brewedAfter = new Date(document.querySelector('.brewed-after').value);
  const abvGt = document.querySelector('.abv-gt').value;
  const abvLt = document.querySelector('.abv-lt').value;

  return { name, hops, malt, brewedBefore, brewedAfter, abvGt, abvLt };
}
function updateDropdownMenu(beerData, name) {
  const matchingBeers = beerData.filter(beer => beer.name.toLowerCase().includes(name.toLowerCase()));

  const dropdownMenu = document.querySelector('.dropdown');
  dropdownMenu.innerHTML = '';

  matchingBeers.forEach(beer => {
    const listItem = document.createElement('li');
    listItem.textContent = beer.name;
    dropdownMenu.appendChild(listItem);
  });

  dropdownMenu.style.display = matchingBeers.length > 0 ? 'block' : 'none';
}
document.querySelector('.name').addEventListener('input', function (event) {
  const name = event.target.value;
  updateDropdownMenu(beerData, name);
});

function filterBeers(beerData, { name, hops, malt, brewedBefore, brewedAfter, abvGt, abvLt }) {
  return beerData.filter(beer => {
    const beerName = beer.name.toLowerCase();
    const beerHops = beer.ingredients.hops.map(hop => hop.name.toLowerCase());
    const beerMalt = beer.ingredients.malt.map(malt => malt.name.toLowerCase());
    const beerBrewed = new Date(beer.first_brewed.split('/').reverse().join('-'));
    const beerAbv = beer.abv;

    return beerName.includes(name.toLowerCase()) &&
      beerHops.some(hop => hop.includes(hops.toLowerCase())) &&
      beerMalt.some(malt => malt.includes(malt.toLowerCase())) &&
      (isNaN(brewedBefore) || beerBrewed <= brewedBefore) &&
      (isNaN(brewedAfter) || beerBrewed >= brewedAfter) &&
      (abvGt === '' || beerAbv > abvGt) &&
      (abvLt === '' || beerAbv < abvLt);
  });
}




document.querySelector('.search-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const searchValues = getSearchValues();
  const results = filterBeers(beerData, searchValues);

  displayBeers(results);
});

document.querySelector('.name').addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase();
  updateDropdownMenu(beerData, searchTerm);
});

document.querySelector('.dropdown').addEventListener('click', function(event) {
  if (event.target.tagName.toLowerCase() === 'li') {
    const selectedBeerName = event.target.textContent;
    document.querySelector('.name').value = selectedBeerName;
    this.style.display = 'none';

    const selectedBeer = beerData.find(beer => beer.name === selectedBeerName);
    displayBeers([selectedBeer]);
  }
});
document.addEventListener('click', function (event) {
  const dropdown = document.querySelector('.dropdown');
  if (!dropdown.contains(event.target) && !document.querySelector('.name').contains(event.target)) {
    dropdown.style.display = 'none';
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    document.querySelector('.dropdown').style.display = "none";
  }
});

document.querySelector('.name').addEventListener("click", function () {
  updateDropdownMenu(beerData, "");
});

// document.querySelector('#search-form').addEventListener('submit', function(event) {
//   event.preventDefault();

//   const name = document.querySelector('#name').value;
//   const hops = document.querySelector('#hops').value;
//   const malt = document.querySelector('#malt').value;
//   const brewedBefore = new Date(document.querySelector('#brewed-before').value);
//   const brewedAfter = new Date(document.querySelector('#brewed-after').value);
//   const abvGt = document.querySelector('#abv-gt').value;
//   const abvLt = document.querySelector('#abv-lt').value;

//   const results = beerData.filter(beer => {
//     const beerName = beer.name.toLowerCase();
//     const beerHops = beer.ingredients.hops.map(hop => hop.name.toLowerCase());
//     const beerMalt = beer.ingredients.malt.map(malt => malt.name.toLowerCase());
//     const beerBrewed = new Date(beer.first_brewed.split('/').reverse().join('-'));
//     const beerAbv = beer.abv;

//     return beerName.includes(name.toLowerCase()) &&
//       beerHops.some(hop => hop.includes(hops.toLowerCase())) &&
//       beerMalt.some(malt => malt.includes(malt.toLowerCase())) &&
//       (isNaN(brewedBefore) || beerBrewed <= brewedBefore) &&
//       (isNaN(brewedAfter) || beerBrewed >= brewedAfter) &&
//       (abvGt === '' || beerAbv > abvGt) &&
//       (abvLt === '' || beerAbv < abvLt);
//   });

//   // Display the results
//   displayBeers(results);
// });

// // Search and display beers in dropdown need to fix this
// function searchAndDisplayBeers(searchTerm) {
//   dropdown.innerHTML = "";

//   const matchingBeers = beerData
//     .filter((beer) => beer.name.toLowerCase().includes(searchTerm))
//     .sort((a, b) => a.name.localeCompare(b.name));

//   if (matchingBeers.length > 0) {
//     matchingBeers.forEach((beer) => {
//       const listItem = document.createElement("li");
//       listItem.textContent = beer.name;
//       dropdown.appendChild(listItem);

//       const option = document.createElement("option");
//       option.value = beer.name;

//       listItem.addEventListener("click", function () {
//         searchInput.value = beer.name;
//         searchAndDisplayBeers(beer.name.toLowerCase());
//         dropdown.style.display = "none";
//       });
//     });

//     dropdown.style.display = "block";
//   } else {
//     dropdown.style.display = "none";
//   }
//   displayBeers(matchingBeers);
// }
