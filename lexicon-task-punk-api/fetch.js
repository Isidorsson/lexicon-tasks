const API_URL = 'https://api.punkapi.com/v2/beers';
const PAGE_SIZE = 80;

let beerData = [];

async function fetchBeerData() {
  document.querySelector(".loading-overlay").style.display = "flex";
  try {
    const storedData = localStorage.getItem("beerData");
    if (!storedData) {
      console.log("Fetching data from API");
      beerData = [];
      let page = 1;
      let data = [];
      do {
        const response = await fetch(`${API_URL}?page=${page}&per_page=${PAGE_SIZE}`);
        data = await response.json();
        beerData = beerData.concat(data);
        page++;
      } while (data.length === PAGE_SIZE);
      localStorage.setItem("beerData", JSON.stringify(beerData));
    } else {
      console.log("Fetching data from local storage");
      beerData = JSON.parse(storedData);
    }

    return beerData;

  } catch (error) {
    console.error("Error:", error);
    throw error;
  } finally {
    document.querySelector(".loading-overlay").style.display = "none";
    console.log(`Fetched ${beerData.length} beers.`);
  }
}

export { fetchBeerData };