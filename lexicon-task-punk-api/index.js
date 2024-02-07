// https://api.punkapi.com/v2/

// generate some random data to display on the page for testing and adjusting

let beerData = [];

const randomBeerImg = document.querySelector(".random-beer-img");
const randomBeerInfo = document.querySelector(".random-beer-info");
const randomBeerName = document.querySelector(".random-beer-name");
const randomBeerViewMore = document.querySelector(".random-beer-view-more-btn");
const randomBeerBtn = document.querySelector(".random-beer-btn");
const clearLocalStorageBtn = document.querySelector(".clear-local-storage-btn");

function clearLocalStorage() {
  localStorage.clear();
  location.reload();
}

clearLocalStorageBtn.addEventListener("click", clearLocalStorage);

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

  randomBeerInfo.innerHTML = `
   <h3><strong>Name: </strong> ${randomBeer.name}</h3>
    <p><strong>Tagline:</strong> ${randomBeer.tagline}</p>
    <p><strong>First Brewed:</strong> ${randomBeer.first_brewed}</p>
    <p><strong>Description:</strong> ${randomBeer.description}</p>
    <p><strong>Food Pairing:</strong> ${randomBeer.food_pairing}</p>
    <p><strong>ABV:</strong> ${randomBeer.abv}%</p>
    <p><strong>IBU:</strong> ${randomBeer.ibu}</p>
  `;

  randomBeerImg.src = randomBeer.image_url;
  randomBeerViewMore.href = `beer.html?beerId=${randomBeer.id}`;
}

randomBeerBtn.addEventListener("click", displayRandomBeer);
