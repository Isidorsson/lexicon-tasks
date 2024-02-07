// https://api.punkapi.com/v2/

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

function clearLocalStorage() {
  localStorage.clear();
  location.reload();
}

clearLocalStorageBtn.addEventListener("click", clearLocalStorage);

// Fetch beer data from API might change later
async function fetchBeerData() {
  try {
    // Check if data is in local storage
    let beerData = localStorage.getItem("beerData");

    // If data is not in local storage, fetch from API
    if (!beerData) {
      console.log("Fetching data from API");
      const response = await fetch("https://api.punkapi.com/v2/beers");
      const data = await response.json();
      beerData = data;

      // Store data in local storage
      localStorage.setItem("beerData", JSON.stringify(beerData));
    } else {
      console.log("Fetching data from local storage");
      // If data is in local storage, parse it to JSON
      beerData = JSON.parse(beerData);
      // console.log(beerData);
    }

    return beerData;
  } catch (error) {
    console.error("Error:", error);
  }
}

fetchBeerData();

async function displayRandomBeer() {
  const beerData = await fetchBeerData();
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
}

randomBeerBtn.addEventListener("click", displayRandomBeer);

displayRandomBeer();

randomBeerViewMore.onclick = function () {
  if (currentBeer) {
    modal.style.display = "block";
    modalText.innerHTML = `
    <h3><strong>Name: </strong> ${currentBeer.name}</h3>
    <p><strong>Tagline:</strong> ${currentBeer.tagline}</p>
    <p><strong>First Brewed:</strong> ${currentBeer.first_brewed}</p>
    <p><strong>Description:</strong> ${currentBeer.description}</p>
    <p><strong>Alcohol by volume (ABV):</strong> ${currentBeer.abv}</p>
    <p><strong>Volume:</strong> ${currentBeer.volume.value} ${currentBeer.volume.unit}</p>
    <p><strong>Food Pairing:</strong></p>
    <ul>
    ${currentBeer.food_pairing
      .map((food) => `<li>${food}</li>`)
      .join("")}
    </ul>
    <p><strong>Brewers Tips:</strong> ${currentBeer.brewers_tips}</p>
    <p><strong>Ingredients:</strong></p>
    <p><strong>Hops:</strong></p>
    <ul>
    ${currentBeer.ingredients.hops
      .map(
        (hop) =>
          `<li>${hop.name} (Amount: ${hop.amount.value} ${hop.amount.unit})</li>`
      )
      .join("")}
    </ul>
    <p><strong>Malt:</strong></p>
    <ul>
    ${currentBeer.ingredients.malt
      .map(
        (malt) =>
          `<li>${malt.name} (Amount: ${malt.amount.value} ${malt.amount.unit})</li>`
      )
      .join("")}
    </ul>
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
