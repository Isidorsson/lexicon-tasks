import { clearLocalStorage } from './utils.js';
import { fetchBeerData } from './fetch.js';

let currentBeer = null;

let beerData = [];
async function initializeList() {
    try {
        beerData = [];
        beerData = await fetchBeerData();
        sendToFilter(beerData);
        displayBeers(beerData);

    } catch (error) {
        console.error(`Error: ${error}`);


    }

}
initializeList();


const modal = document.querySelector(".modal");
const modalText = document.querySelector(".modal-text");
const span = document.querySelector(".close");

const clearLocalStorageBtn = document.querySelector(".clear-local-storage-btn");
const beerList = document.querySelector(".beer-list");



const searchInput = document.querySelector(".search-input");
const dropdown = document.querySelector(".dropdown");


// clearLocalStorageBtn.addEventListener("click", clearLocalStorage());

if (clearLocalStorageBtn) {
    clearLocalStorageBtn.addEventListener('click', clearLocalStorage);
}



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




function displayBeers(beers) {
    let beerDataElement = document.querySelector('.current-beers');
    const beersDiv = document.querySelector(".beers");
    beersDiv.innerHTML = "";

    const observer = new IntersectionObserver(entries => {
        console.log(entries);
        entries.forEach(entry => {
            entry.target.classList.toggle('is-visible', entry.isIntersecting);
            // if (entry.isIntersecting) {
            //     entry.target.src = entry.target.dataset.src;
            //     observer.unobserve(entry.target);
            // }
        });
    },
        {
            rootMargin: '100px',
            threshold: 0.2

        }
    )


    beers.forEach((beer) => {

        const beerCard = document.createElement("div");
        beerCard.className = "beer-card";

        const beerImage = document.createElement("img");
        beerImage.src = beer.image_url || "https://images.punkapi.com/v2/keg.png";
        beerImage.alt = "beer image";
        beerCard.appendChild(beerImage);
        const beerName = document.createElement("h3");
        beerName.textContent = beer.name;
        beerCard.appendChild(beerName);

        const beerDescription = document.createElement("p");
        beerDescription.textContent = beer.description;
        beerCard.appendChild(beerDescription);

        const viewMoreBtn = document.createElement("a");
        viewMoreBtn.href = "#";
        viewMoreBtn.className = "view-more-btn";
        viewMoreBtn.textContent = "View More";
        viewMoreBtn.addEventListener('click', function (event) {
            event.preventDefault();
        });
        beerCard.appendChild(viewMoreBtn);

        // Add click event listener to beer card
        viewMoreBtn.addEventListener("click", function () {
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
        beerDataElement.textContent = `Displaying ${beers.length} beers`;
        observer.observe(beerCard);
        beersDiv.appendChild(beerCard);
    });
}

// Assuming `modal` is a reference to your modal element
window.addEventListener('click', function (event) {
    if (event.target == modal) {
        modal.style.display = 'none'; // Or however you're hiding your modal
    }
});

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}


function getSearchValues() {
    const name = document.querySelector('.name').value;
    const hops = document.querySelector('.hops').value;
    const malt = document.querySelector('.malt').value;
    const brewedBefore = new Date(document.querySelector('.brewed-before').value);
    const brewedAfter = new Date(document.querySelector('.brewed-after').value);
    // const abvGt = document.querySelector('.abv-gt').value;
    // const abvLt = document.querySelector('.abv-lt').value;

    let abvRangeInput = document.querySelector('.abv-range').value;
    let abvRange = abvRangeInput.split('-').map(Number);

    if (abvRange.length === 1) {
        abvRange = [abvRange[0], Infinity];
        // abvRange = [abvRange[0], ''];
    }

    // abvRange[0] is the "greater than" value
    // abvRange[1] is the "less than" value


    // return { name, hops, malt, brewedBefore, brewedAfter, abvGt, abvLt };
    return { name, hops, malt, brewedBefore, brewedAfter, abvGt: abvRange[0], abvLt: abvRange[1] };
}

function updateDropdownMenu(beerData, searchTerm) {
    // console.log('Updating dropdown menu with search term:', searchTerm);

    const matchingBeers = beerData.filter(beer => beer.name.toLowerCase().includes(searchTerm.toLowerCase()));

    // console.log('Found', matchingBeers.length, 'matching beers');

    const dropdownMenu = document.querySelector('.dropdown');
    dropdownMenu.innerHTML = '';

    matchingBeers.forEach(beer => {
        const listItem = document.createElement('li');
        listItem.textContent = beer.name;
        dropdownMenu.appendChild(listItem);
    });
    displayBeers(matchingBeers);
    dropdownMenu.style.display = matchingBeers.length > 0 ? 'block' : 'none';
}

document.querySelector('.name').addEventListener('input', function (event) {
    const name = event.target.value;
    updateDropdownMenu(beerData, name);
});

/**
 * The function `filterBeers` filters an array of beer data based on various criteria such as name,
 * hops, malt, brewed date, and ABV (alcohol by volume).
 * @param beerData - An array of objects representing beer data. Each object should have the following
 * properties:
 * @returns a filtered array of beer objects that match the specified filter criteria.
 */
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


/**
 * The function `sendToFilter` takes an array of beer data, extracts the unique beer types, and adds
 * them as options to a select element with the class `beerFilter`.
 * @param beerData - The `beerData` parameter is an array of objects representing different beers. Each
 * object in the array has properties such as `tagline`, which is a string representing the tagline of
 * the beer.
 */
function sendToFilter(beerData) {
    const beerFilter = document.querySelector('.beer-filter');
    const beerTypes = beerData.map(beer => beer.tagline.split(' ')[0].toLowerCase());
    const uniqueBeerTypes = [...new Set(beerTypes)];
    uniqueBeerTypes.forEach(beerType => {
        const option = document.createElement('option');
        option.value = beerType;
        option.textContent = beerType[0].toUpperCase() + beerType.slice(1);
        beerFilter.appendChild(option);
    });
}



document.querySelector('.beer-filter').addEventListener('change', function (event) {
    const beerType = event.target.value;
    const results = beerData.filter(beer => beer.tagline.toLowerCase().includes(beerType.toLowerCase()));
    displayBeers(results);
}
);





document.querySelector('.search-form').addEventListener('input', function (event) {
    event.preventDefault();

    const searchValues = getSearchValues();
    const results = filterBeers(beerData, searchValues);

    displayBeers(results);
});

document.querySelector('.name').addEventListener('input', function (event) {
    const searchTerm = event.target.value;
    updateDropdownMenu(beerData, searchTerm);
});

dropdown.addEventListener('click', function (event) {
    if (event.target.tagName.toLowerCase() === 'li') {
        const selectedBeerName = event.target.textContent;
        document.querySelector('.name').value = selectedBeerName;
        this.style.display = 'none';

        const selectedBeer = beerData.find(beer => beer.name === selectedBeerName);
        displayBeers([selectedBeer]);
    }
});

document.addEventListener('click', function (event) {


    if (!dropdown.contains(event.target) && !document.querySelector('.name').contains(event.target)) {
        dropdown.style.display = 'none';
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        dropdown.style.display = "none";
    }
});

document.querySelector('.name').addEventListener("click", function () {
    updateDropdownMenu(beerData, "");
});

document.querySelector('.search-btn-clear').addEventListener('click', function () {
    document.querySelector('.search-form').reset();
    displayBeers(beerData);
});

