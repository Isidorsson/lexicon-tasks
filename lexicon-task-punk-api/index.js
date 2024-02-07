// https://api.punkapi.com/v2/

// generate some random data to display on the page for testing and adjusting

const randomData = [
  {
    id: 1,
    name: "Beer 1",
    tagline: "Tagline 1",
    first_brewed: "01/2020",
    description: "Description 1",
    image_url: "https://images.punkapi.com/v2/keg.png",
  },
  {
    id: 2,
    name: "Beer 2",
    tagline: "Tagline 2",
    first_brewed: "02/2020",
    description: "Description 2",
    image_url: "https://images.punkapi.com/v2/keg.png",
  },
  {
    id: 3,
    name: "Beer 3",
    tagline: "Tagline 3",
    first_brewed: "03/2020",
    description: "Description 3",
    image_url: "https://images.punkapi.com/v2/keg.png",
  },
  {
    id: 4,
    name: "Beer 4",
    tagline: "Tagline 4",
    first_brewed: "04/2020",
    description: "Description 4",
    image_url: "https://images.punkapi.com/v2/keg.png",
  },
  {
    id: 5,
    name: "Beer 5",
    tagline: "Tagline 5",
    first_brewed: "05/2020",
    description: "Description 5",
    image_url: "https://images.punkapi.com/v2/keg.png",
  },
  {
    id: 6,
    name: "Beer 6",
    tagline: "Tagline 6",
    first_brewed: "06/2020",
    description: "Description 6",
    image_url: "https://images.punkapi.com/v2/keg.png",
  },
  {
    id: 7,
    name: "Beer 7",
    tagline: "Tagline 7",
    first_brewed: "07/2020",
    description: "Description 7",
    image_url: "https://images.punkapi.com/v2/keg.png",
  },
  {
    id: 8,
    name: "Beer 8",
    tagline: "Tagline 8",
    first_brewed: "08/2020",
    description: "Description 8",
    image_url: "https://images.punkapi.com/v2/keg.png",
  },
  {
    id: 9,
    name: "Beer 9",
    tagline: "Tagline 9",
    first_brewed: "09/2020",
    description: "Description 9",
    image_url: "https://images.punkapi.com/v2/keg.png",
  },
  {
    id: 10,
    name: "Beer 10",
    tagline: "Tagline 10",
    first_brewed: "10/2020",
    description: "Description 10",
    image_url: "https://images.punkapi.com/v2/keg.png",
  },
];


const randomBeerImg = document.querySelector(".random-beer-img");
const randomBeerInfo = document.querySelector(".random-beer-info");
const randomBeerName = document.querySelector(".random-beer-name");


function displayRandomBeer(data) {
  randomBeerImg.src = data.image_url;
  randomBeerName.textContent = data.name;
  randomBeerInfo.innerHTML = `
    <p>${data.tagline}</p>
    <p>${data.first_brewed}</p>
    <p>${data.description}</p>
  `;
}

displayRandomBeer(randomData[0]);

