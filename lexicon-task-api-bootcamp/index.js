fetch("https://majazocom.github.io/Data/pokemons.json")
  .then((response) => response.json())
  .then((data) => {
    const parentDiv = document.querySelector(".display-pok");
    data.forEach((pokemon) => {
      const pokDiv = document.createElement("grid-pok");
      pokDiv.innerHTML = `<p>Pokemon name: ${pokemon.name}</p>`;
      parentDiv.appendChild(pokDiv);
    });
  })

  .catch((error) => console.error("Error:", error));

fetch("https://majazocom.github.io/Data/dogs.json")
  .then((response) => response.json())
  .then((data) => {
    const parentDiv = document.querySelector(".display-dog");
    data.forEach((dog) => {
      const dogDiv = document.createElement("grid-dog");
      dogDiv.innerHTML = `<h3>Dog name: ${dog.name}</h3>`;
      dogDiv.innerHTML += `<img src="${dog.img}">`;
      dogDiv.innerHTML += `<h3>Owner: ${dog.owner.name} ${dog.owner.lastName}</h3>`;
      dogDiv.innerHTML += `<p>Dog breed: ${dog.breed}</p>`;
      dogDiv.innerHTML += `<p>Dog age: ${dog.age}</p>`;
      dogDiv.innerHTML += `<p>Phone: ${dog.owner.phoneNumber}</p>`;
      dogDiv.innerHTML += `<p>Dog sex: ${dog.sex}</p>`;
      dogDiv.innerHTML += `<p>Dog chip: ${dog.chipNumber}</p>`;
      dogDiv.innerHTML += `<p>Present: ${dog.present}</p>`;

      parentDiv.appendChild(dogDiv);
    });
  })
  .catch((error) => console.error("Error:", error));

fetch("https://majazocom.github.io/Data/books.json")
  .then((response) => response.json())
  .then((data) => {
    const parentDiv = document.querySelector(".display-book");
    data.forEach((book) => {
      // console.log(book);
      const bookDiv = document.createElement("grid-book");
      if (book.pages < 500) {
        bookDiv.innerHTML += `<h3>Book title: ${book.title}</h3>`;
        bookDiv.innerHTML += `<p>Author: ${book.author}</p>`;
        bookDiv.innerHTML += `<p>Pages: ${book.pages}</p>`;
        bookDiv.innerHTML += `<p>Genre: ${book.genre}</p>`;
        parentDiv.appendChild(bookDiv);
      }
    });
  })
  .catch((error) => console.error("Error:", error));

fetch("https://majazocom.github.io/Data/attendees.json")
  .then((response) => response.json())
  .then((data) => {
    // console.log(data);
    const parentDiv = document.querySelector(".display-attendees");
    const attendeesWithAllergies = data.filter(
      (attendee) => attendee.allergies.length > 0
    );
    attendeesWithAllergies.forEach((attendee) => {
      if (attendee.attending === true) {
        const attendeeDiv = document.createElement("grid-attendee");
        attendeeDiv.innerHTML = `<h2>Attendees</h2>`;
        attendeeDiv.innerHTML += `<h3>Name: ${attendee.name}</h3>`;
        attendeeDiv.innerHTML += `<p>Age: ${attendee.age}</p>`;
        attendeeDiv.innerHTML += `<p>Allergies: ${attendee.allergies}</p>`;
        attendeeDiv.innerHTML += `<p>Attending: ${attendee.attending}</p>`;
        attendeeDiv.innerHTML += `<img src="${attendee.image}">`;
        parentDiv.appendChild(attendeeDiv);
      }
    });
  })
  .catch((error) => console.error("Error:", error));
