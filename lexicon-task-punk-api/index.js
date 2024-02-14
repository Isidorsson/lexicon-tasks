// https://api.punkapi.com/v2/

import { clearLocalStorage } from './utils.js';
import { fetchBeerData } from "./fetch.js";

let beerData = [];

let currentBeer = null;

const randomBeerImg = document.querySelector(".random-beer-img");
const randomBeerInfo = document.querySelector(".random-beer-info");
const randomBeerName = document.querySelector(".random-beer-name");
const randomBeerViewMore = document.querySelector(".random-beer-view-more-btn");
const randomBeerBtn = document.querySelector(".random-beer-btn");
const clearLocalStorageBtn = document.querySelector(".clear-local-storage-btn");

const modal = document.querySelector(".modal");
const modalText = document.querySelector(".modal-text");
const span = document.querySelector(".close");


// clearLocalStorageBtn.addEventListener("click", clearLocalStorage);
if (clearLocalStorageBtn) {
  clearLocalStorageBtn.addEventListener('click', clearLocalStorage);

}


async function initializeRandom() {
  try {
    beerData = []; // Clear the array
    beerData = await fetchBeerData();
    displayRandomBeer();

  } catch (error) {
    console.error(`Error: ${error}`);
  }
}
initializeRandom();

/**
 * The function `displayRandomBeer` selects a random beer from an array of beer data, updates the HTML
 * elements on the page with information about the beer, and sets the URL for a "View More" link.
 */
function displayRandomBeer() {
  try {
    if (randomBeerInfo) {
      const randomBeer = beerData[Math.floor(Math.random() * beerData.length)];
      currentBeer = randomBeer;
      randomBeerInfo.innerHTML = `
    <h3><strong>Name: </strong> ${randomBeer.name}</h3>
    <p><strong>Description:</strong> ${randomBeer.description}</p>
    <p><strong>Food Pairing:</strong> ${randomBeer.food_pairing}</p>
  `;
      randomBeerImg.src = randomBeer.image_url;
      randomBeerViewMore.href = `beer.html?beerId=${randomBeer.id}`;

    }
  } catch (error) {
    console.error("Error:", error);
  }
}

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


