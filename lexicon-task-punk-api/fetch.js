
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
        const response = await fetch(`https://api.punkapi.com/v2/beers?page=${page}&per_page=80`);
        data = await response.json();
        beerData = beerData.concat(data);
        page++;
      } while (data.length === 80);
      localStorage.setItem("beerData", JSON.stringify(beerData));
    } else {
      console.log("Fetching data from local storage");
      beerData = JSON.parse(storedData);
    }

    return beerData;

  } catch (error) {
    console.error("Error:", error);
    document.querySelector(".loading-overlay").style.display = "none";
  } finally {
    document.querySelector(".loading-overlay").style.display = "none";
    console.log(`Fetched ${beerData.length} beers.`);
  }

}

export { fetchBeerData };

