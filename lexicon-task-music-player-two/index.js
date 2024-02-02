// import { songsList } from "./songList.js";

let currIndex = 0;
let isPlaying = false;
let isRepeating = false;
let isShuffling = false;
let sizeOfBar = 2.5;

let currSong = new Audio();

const songThumb = document.querySelector(".song-thumb");
const songTitle = document.querySelector(".song-info-title");
const songArtist = document.querySelector(".song-info-artist");
const songAlbum = document.querySelector(".song-info-album");

const stateButton = document.querySelector(".player-state-btn");
const songProgressBar = document.querySelector(".song-progress-value");
const volumeSlider = document.querySelector("#volume-slider");
const volumeTrail = document.querySelector(".volume-trail");
const songListElement = document.querySelector(".song-list");
const songListFavorit = document.querySelector(".song-list-favorit");
const toggleButton = document.querySelector(".toggle-song-lists");
const tutorial = document.querySelector(".tutorial");

const repeatBtn = document
  .getElementById("repeatBtn")
  .addEventListener("click", toggleRepeat);
const prevBtn = document
  .getElementById("prevBtn")
  .addEventListener("click", prevSong);
const playBtn = document
  .getElementById("playBtn")
  .addEventListener("click", toggleState);
const nextBtn = document
  .getElementById("nextBtn")
  .addEventListener("click", nextSong);
const shuffleBtn = document
  .getElementById("shuffleBtn")
  .addEventListener("click", toggleShuffle);

const canvas = document.getElementById("eq");
const canvasTwo = document.getElementById("eqTwo");
const starsCanvas = document.getElementById("stars-canvas");

const ctx = canvas.getContext("2d");
const ctxTwo = canvasTwo.getContext("2d");
const starsCtx = starsCanvas.getContext("2d");

const color1 = parseInt("4d3f61", 16);
const color2 = parseInt("ae80d6", 16);

let primaryList;
let playedSongs = [];
let favoritList = [];

async function fetchData() {
  try {
    const response = await fetch("./jsonList.json");
    const data = await response.json();
    console.log(data);
    primaryList = data;
  } catch (error) {
    console.error(
      `There has been a problem with your fetch operation: ${error}`
    );
  }
}

fetchData();

async function main() {
  await fetchData();
  populateSongList();
  addEventListeners();
}

main();

let activeList = primaryList;

let audioContext;
let source;
let analyser;
let bufferLength;
let dataArray;

let maxAverage = 0;
let maxAverageDecay = 0.995;
let beatThreshold = 0.9;

let timeout = null;
const elementsToHide = document.querySelectorAll(
  ".song-info, .player-controls, .player-wrapper, .volume-wrapper, .song-list, .song-list-favorit, .song-list-wrapper, .tutorial, .player-state-btn, .toggle-song-lists,  .eq, .eqTwo, .stars-canvas"
);

document.addEventListener("mousemove", () => {
  if (timeout !== null) {
    clearTimeout(timeout);
  }

  elementsToHide.forEach((element) => {
    element.classList.remove("fade-out");
  });

  timeout = setTimeout(() => {
    elementsToHide.forEach((element) => {
      element.classList.add("fade-out");
    });
  }, 1000);
});

function draw() {
  requestAnimationFrame(draw);

  analyser.getByteFrequencyData(dataArray);

  let sum = 0;
  for (let i = 0; i < bufferLength; i++) {
    sum += dataArray[i];
  }

  let average = sum / bufferLength;

  // Decay the max average volume over time
  maxAverage *= maxAverageDecay;

  // If the current average volume is higher than the max, update the max
  if (average > maxAverage) {
    maxAverage = average;
  }

  // If the current average volume is higher than the beat threshold, consider it a beat and pulse the background
  if (average > maxAverage * beatThreshold) {
    // console.log(` Beat! ${average} > ${maxAverage * beatThreshold}`)
    document.querySelector(".song-thumb").classList.add("pulse");
    // drawSpace();
  } else {
    // console.log(` No beat! ${average} < ${maxAverage * beatThreshold}`)
    document.querySelector(".song-thumb").classList.remove("pulse");
  }

  // starsCtx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
}

function drawSpace() {
  let x = Math.random() * starsCanvas.width;
  let y = Math.random() * starsCanvas.height;
  starsCtx.fillStyle = lerpColor(color1, color2, Math.random());
  starsCtx.beginPath();
  starsCtx.arc(x, y, 1, 0, 2 * Math.PI); // x, y, radius, startAngle, endAngle
  starsCtx.fill();

  // setTimeout(function () {
  //   starsCtx.clearRect(x - 1, y - 1, 3, 3);
  // }, 100);

  setTimeout(function () {
    starsCtx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
  }, 1000);
}

/**
 * The lerpColor function takes two RGB color values and a blending amount, and returns a new color
 * that is a linear interpolation between the two input colors.
 * @param a - The parameter `a` represents the starting color value in RGB format.
 * @param b - The parameter `b` represents the end color that you want to interpolate towards.
 * @param amount - The `amount` parameter represents the interpolation amount between color `a` and
 * color `b`. It is a value between 0 and 1, where 0 represents color `a` and 1 represents color `b`.
 * @returns a string representing an RGB color value.
 */
function lerpColor(a, b, amount) {
  const ar = a >> 16,
    ag = (a >> 8) & 0xff,
    ab = a & 0xff,
    br = b >> 16,
    bg = (b >> 8) & 0xff,
    bb = b & 0xff,
    rr = ar + amount * (br - ar),
    rg = ag + amount * (bg - ag),
    rb = ab + amount * (bb - ab);

  return `rgb(${Math.round(rr)}, ${Math.round(rg)}, ${Math.round(rb)})`;
}

/**
 * The function `drawEQ` is a JavaScript function that continuously draws an equalizer visualization on
 * a canvas using frequency data from an audio analyser.
 * @param canvas - The canvas parameter is the HTML canvas element on which the equalizer will be
 * drawn. It is used to access the canvas context and set its properties.
 * @param ctx - The `ctx` parameter is the 2D rendering context of the canvas element. It is used to
 * draw on the canvas using various drawing methods and properties.
 */

function drawEQ(canvas, ctx) {
  requestAnimationFrame(() => drawEQ(canvas, ctx));

  let dataArray = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(dataArray);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let barWidth = (canvas.width / bufferLength) * sizeOfBar;
  let barHeight;
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i];

    ctx.fillStyle = lerpColor(color1, color2, barHeight / 255);
    ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);

    x += barWidth + 1; // Add spacing between the bars
  }
}

/**
 * The function initializes the audio context, creates a media element source, connects it to the audio
 * context destination, creates an analyser, and sets up a buffer and array for frequency analysis.
 */
function initializeAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    source = audioContext.createMediaElementSource(currSong);
    source.connect(audioContext.destination);
    analyser = audioContext.createAnalyser();
    source.connect(analyser);
    bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);
  }
}

/**
 * The function `changeSong()` updates the currently playing song and its details, updates the active
 * song in the song list, toggles the play/pause state if necessary, adds the current song to the list
 * of played songs, and redraws the audio equalizer.
 */
function changeSong() {
  const currentStatus = isPlaying;
  if (currentStatus) toggleState();

  const { title, artist, album, thumb, link } = activeList[currIndex];
  songTitle.innerHTML = title;
  songArtist.innerHTML = artist;
  songAlbum.innerHTML = album;
  songThumb.style.backgroundImage = `url(${thumb})`;
  currSong.src = link;

  const listItems = document.querySelectorAll(
    "#song-list li, #song-list-favorit li"
  );
  listItems.forEach((item) => item.classList.remove("active-song"));

  const activeSong = document.querySelector(
    `#${
      activeList === primaryList ? "song-list" : "song-list-favorit"
    } li[data-index='${currIndex}']`
  );
  if (activeSong) {
    activeSong.classList.add("active-song");
  }

  if (currentStatus) toggleState();
  playedSongs.push(currIndex);
  initializeAudioContext();

  draw();
  drawEQ(canvas, ctx);
  drawEQ(canvasTwo, ctxTwo);
}

// function changeSong() {
//   const currentStatus = isPlaying;
//   if (currentStatus) toggleState();

//   const { title, artist, album, thumb, link } = songsList[currIndex];
//   songTitle.innerHTML = title;
//   songArtist.innerHTML = artist;
//   songAlbum.innerHTML = album;
//   songThumb.style.backgroundImage = `url(${thumb})`;
//   currSong.src = link;

//   const listItems = document.querySelectorAll("#song-list li");
//   listItems.forEach((item) => item.classList.remove("active-song"));

//   const activeSong = listItems[currIndex];
//   activeSong.classList.add("active-song");

//   if (currentStatus) toggleState();
//   playedSongs.push(currIndex);

//   initializeAudioContext();

//   draw();
//   drawEQ();
//   drawEQTwo();
// }

/**
 * The function `populateSongList` creates a list of songs and adds them to the DOM, with each song
 * item having a click event listener that triggers the `changeSong` function.
 */
// function populateSongList() {
//   const songListElement = document.getElementById("song-list");
//   songsList.forEach((song, index) => {
//     const listItem = document.createElement("li");
//     listItem.textContent = song.title; // assuming each song is an object with a title property
//     listItem.addEventListener("click", () => {
//       currIndex = index;
//       changeSong();
//     });
//     songListElement.appendChild(listItem);
//   });
// }

// function populateSongList() {
//   const songListElement = document.getElementById("song-list");
//   songsList.forEach((song, index) => {
//     const listItem = document.createElement("li");
//     listItem.textContent = song.title;
//     listItem.draggable = true;  // Make the list item draggable
//     listItem.addEventListener("click", () => {
//       currIndex = index;
//       changeSong();
//     });
//     songListElement.appendChild(listItem);
//   });
// }

function populateSongList() {
  songListElement.innerHTML = "";
  songListFavorit.innerHTML = "";

  const createListItem = (song, index, list) => {
    const listItem = document.createElement("li");
    listItem.textContent = song.title;
    listItem.draggable = true;
    listItem.dataset.index = index;
    listItem.classList.add("song-list-item");

    listItem.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", event.target.dataset.index);
      event.dataTransfer.setData(
        "text/list",
        list === primaryList ? "primary" : "favorit"
      );
      event.stopPropagation();
    });

    listItem.addEventListener("click", () => {
      activeList = list;
      currIndex = index;
      changeSong();
    });

    if (list === favoritList) {
      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.classList.add("remove-btn");
      removeButton.addEventListener("click", (event) => {
        event.stopPropagation();

        list.splice(index, 1);

        populateSongList();
      });

      listItem.appendChild(removeButton);
    }

    return listItem;
  };

  primaryList.forEach((song, index) => {
    const listItem = createListItem(song, index, primaryList);
    songListElement.appendChild(listItem);
  });

  favoritList.forEach((song, index) => {
    const listItem = createListItem(song, index, favoritList);
    songListFavorit.appendChild(listItem);
  });
}

function handleDrop(sourceList, targetList, event) {
  event.preventDefault();

  const index = event.dataTransfer.getData("text/plain");

  // const [song] = sourceList.splice(index, 1); // Remove the song from the source list and store it in a variable

  if (event.currentTarget.id === "song-list" && listName === "favorit") {
    // If the song is being dropped from the favorit list to the primary list,
    return;
  }
  const song = sourceList[index]; 

  if (targetList.includes(song)) {
    
    return;
  }

  targetList.push(song);

  populateSongList();
}

function addEventListeners() {
  songListFavorit.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  songListFavorit.addEventListener(
    "drop",
    handleDrop.bind(null, primaryList, favoritList)
  );

  songListElement.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  songListElement.addEventListener(
    "drop",
    handleDrop.bind(null, favoritList, primaryList)
  );
}

/**
 * The function toggles the shuffle mode by adding or removing the 'active' class from the shuffle
 * button and updating the isShuffling variable.
 */

function toggleShuffle() {
  isShuffling = !isShuffling;
  document
    .querySelector(".shuffle-btn")
    .classList.toggle("active", isShuffling);
  if (isShuffling && currSong.paused) {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * activeList.length);
    } while (newIndex === currIndex);
    currIndex = newIndex;
    changeSong();
  }
}

/**
 * The function toggles the repeat functionality of a song by changing the loop property of the current
 * song and updating the class of the repeat button.
 */
function toggleRepeat() {
  isRepeating = !isRepeating;
  document.querySelector(".repeat-btn").classList.toggle("active", isRepeating);

  if (isRepeating) {
    currSong.loop = true;
  } else {
    currSong.loop = false;
    // It should target new song if not active
    if (isShuffling) {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * activeList.length);
      } while (newIndex === currIndex);
      currIndex = newIndex;
      changeSong();
    }
  }
}

/**
 * The function "nextSong" increments the current index by 1 and wraps around to the beginning of the
 * songs list if it reaches the end, then calls the "changeSong" function.
 */
function nextSong() {
  if (isShuffling) {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * activeList.length);
    } while (newIndex === currIndex);
    currIndex = newIndex;
  } else {
    currIndex = (currIndex + 1) % activeList.length;
  }
  changeSong();
  playedSongs.push(currIndex);
}

/**
 * The function "prevSong" changes the current song to the previous song in a list of songs.
 */
function prevSong() {
  if (playedSongs.length > 1) {
    playedSongs.pop(); // Remove the last played song
    currIndex = playedSongs.pop(); // Get the last played song
  } else {
    currIndex = (currIndex - 1 + activeList.length) % activeList.length; // Wrap around to the end of the list
  }
  changeSong();
}
/**

 * The function toggles the state of a player between playing and paused, and updates the button icon
 * accordingly.
 */

function toggleState() {
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }
  isPlaying ? currSong.pause() : currSong.play();
  stateButton.classList = isPlaying
    ? "fas fa-play-circle player-state-btn"
    : "fas fa-pause-circle player-state-btn";
  isPlaying = !isPlaying;
}

/**
 * The function adjusts the volume of a current song and updates the volume trail and slider
 * accordingly.
 * @param currVol - The `currVol` parameter represents the current volume level. It is a numeric value
 * between 0 and 1, where 0 represents no volume (muted) and 1 represents maximum volume.
 */
function adjustVolume(currVol) {
  currSong.volume = currVol;
  volumeTrail.style.width =
    currVol !== "0" && currVol !== 0 ? `${currVol * 100 - 2}%` : "0%";
  volumeSlider.value = currVol;
}

/* The code snippet `window.addEventListener('keydown', function(e) { ... })` adds an event listener to
the window object for the 'keydown' event. This event is triggered when a key on the keyboard is
pressed. */
window.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") {
    let newTime = currSong.currentTime + 5;
    if (newTime > currSong.duration) newTime = currSong.duration;
    currSong.currentTime = newTime;
  } else if (e.key === "ArrowLeft") {
    let newTime = currSong.currentTime - 5;
    if (newTime < 0) newTime = 0;
    currSong.currentTime = newTime;
  }
});

/* The code `currSong.addEventListener('timeupdate', () => { ... })` adds an event listener to the
`currSong` audio element. The event being listened to is the `timeupdate` event, which is fired when
the playback position of the audio changes. */
currSong.addEventListener("timeupdate", () => {
  const currPosition = (currSong.currentTime / currSong.duration) * 600;
  songProgressBar.setAttribute(
    "stroke-dasharray",
    !isNaN(currPosition) ? `${currPosition} ${600 - currPosition}` : "0 600"
  );
});

currSong.addEventListener("ended", () => {
  if (isRepeating) {
    currSong.play();
  } else {
    nextSong();
  }
});

toggleButton.addEventListener("click", () => {
  songListElement.classList.toggle("visible");
  songListFavorit.classList.toggle("visible");
  //change so if mouseover it gets removed
  tutorial.classList.toggle("visible");
});
songListElement.addEventListener("click", () => {
  activeList = primaryList;
});

songListFavorit.addEventListener("click", () => {
  activeList = favoritList;
});
