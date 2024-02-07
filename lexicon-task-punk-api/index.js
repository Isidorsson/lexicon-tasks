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

// Fetch beer data from API might change later
async function fetchBeerData() {
  // document.querySelector(".loader").style.display = "block";
  document.querySelector(".loading-overlay").style.display = "flex";
  try {
    // Check if data is in local storage
    let storedData = localStorage.getItem("beerData");

    // If data is not in local storage, fetch from API
    if (!storedData) {
      console.log("Fetching data from API");
      const response = await fetch("https://api.punkapi.com/v2/beers");
      const data = await response.json();
      beerData = data; // update the global beerData variable

      // Store data in local storage
      // localStorage.setItem("beerData", JSON.stringify(beerData));
    } else {
      console.log("Fetching data from local storage");
      // If data is in local storage, parse it to JSON
      beerData = JSON.parse(storedData); // update the global beerData variable
    }

    document.querySelector(".loading-overlay").style.display = "none";
    // document.querySelector(".loader").style.display = "none";

    return beerData;
  } catch (error) {
    console.error("Error:", error);
    document.querySelector(".loading-overlay").style.display = "none";
    // document.querySelector(".loader").style.display = "none";
  }
}
fetchBeerData();

async function initialize() {
  try {
    await fetchBeerData();
    displayRandomBeer();
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
    <p><strong>Volume:</strong> ${currentBeer.volume.value} ${
      currentBeer.volume.unit
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

    // const viewMoreBtn = document.createElement("a");
    // viewMoreBtn.href = `beer.html?beerId=${beer.id}`;
    // viewMoreBtn.className = "view-more-btn";
    // viewMoreBtn.textContent = "View More";
    // beerCard.appendChild(viewMoreBtn);

    // Add click event listener to beer card
    beerCard.addEventListener("click", function () {
      currentBeer = beer;
      modal.style.display = "block";
      modalText.innerHTML = `
        <h3><strong>Name: </strong> ${currentBeer.name}</h3>
        <p><strong>Tagline:</strong> ${currentBeer.tagline}</p>
        <p><strong>First Brewed:</strong> ${currentBeer.first_brewed}</p>
        <p><strong>Description:</strong> ${currentBeer.description}</p>
        <p><strong>Alcohol by volume (ABV):</strong> ${currentBeer.abv}</p>
        <p><strong>Volume:</strong> ${currentBeer.volume.value} ${
        currentBeer.volume.unit
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

displayBeers(beerData);

// function displayBeers(beerData) {

//   beerList.innerHTML = beerData
//     .map(
//       (beer) => `
//   <li class="beer-card">
//     <img src="${beer.image_url}" alt="beer image" />
//     <h3>${beer.name}</h3>
//     <p>${beer.description}</p>
//     <a href="beer.html?beerId=${beer.id}" class="view-more-btn">View More</a>
//   </li>

//   `
//     )
//     .join("");
//   // console.log(`Displaying ${beerData.length} beers.`);
// }

// displayBeers(beerData);

// Search and display beers in dropdown need to fix this
function searchAndDisplayBeers(searchTerm) {
  dropdown.innerHTML = "";

  const matchingBeers = beerData
    .filter((beer) => beer.name.toLowerCase().includes(searchTerm))
    .sort((a, b) => a.name.localeCompare(b.name));

  if (matchingBeers.length > 0) {
    matchingBeers.forEach((beer) => {
      const listItem = document.createElement("li");
      listItem.textContent = beer.name;
      dropdown.appendChild(listItem);

      const option = document.createElement("option");
      option.value = beer.name;

      listItem.addEventListener("click", function () {
        searchInput.value = beer.name;
        searchAndDisplayBeers(beer.name.toLowerCase());
        dropdown.style.display = "none";
      });
    });

    dropdown.style.display = "block";
  } else {
    dropdown.style.display = "none";
  }
  displayBeers(matchingBeers);
}

searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value.toLowerCase();
  searchAndDisplayBeers(searchTerm);
});

document.addEventListener("click", function (event) {
  if (!dropdown.contains(event.target) && !searchInput.contains(event.target)) {
    dropdown.style.display = "none";
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    dropdown.style.display = "none";
  }
});
searchInput.addEventListener("click", function () {
  searchAndDisplayBeers("");
});
