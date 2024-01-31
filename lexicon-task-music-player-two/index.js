import { songsList } from "./songList.js";

let currIndex = 0;
let isPlaying = false;
let isRepeating = false;
let isShuffling = false;

let currPlaylist = songsList; // The current playlist
let currPlaylistIndex = 0; // The current index within the playlist

let currSong = new Audio();

const songThumb = document.querySelector(".song-thumb");
const songTitle = document.querySelector(".song-info-title");
const songArtist = document.querySelector(".song-info-artist");
const songAlbum = document.querySelector(".song-info-album");

const stateButton = document.querySelector(".player-state-btn");
const songProgressBar = document.querySelector(".song-progress-value");
const volumeSlider = document.querySelector("#volume-slider");
const volumeTrail = document.querySelector(".volume-trail");
const songListElement = document.getElementById("song-list");
const songListFavorit = document.getElementById("song-list-favorit");

let canvas = document.getElementById("eq");
let canvasTwo = document.getElementById("eqTwo");
let starsCanvas = document.getElementById("stars-canvas");

let ctx = canvas.getContext("2d");
let ctxTwo = canvasTwo.getContext("2d");
let starsCtx = starsCanvas.getContext("2d");

const color1 = parseInt("4d3f61", 16);
const color2 = parseInt("ae80d6", 16);

let playedSongs = [];
// let primaryList = [...songsList];
let primaryList = songsList;
let favoritList = [];

let activeList = primaryList;

let audioContext;
let source;
let analyser;
let bufferLength;
let dataArray;

let maxAverage = 0;
let maxAverageDecay = 0.995;
let beatThreshold = 0.9;

// let timeout = null;
// const elementsToHide = document.querySelectorAll("");

// document.addEventListener("mousemove", () => {
//   if (timeout !== null) {
//     clearTimeout(timeout);
//   }

//   elementsToHide.forEach((element) => {
//     element.style.display = "block";
//   });

//   timeout = setTimeout(() => {
//     elementsToHide.forEach((element) => {
//       element.style.display = "none";
//     });
//   }, 5000);
// });


const toggleButton = document.getElementById('toggle-song-lists');

toggleButton.addEventListener('click', () => {
  songListElement.classList.toggle('visible');
  songListFavorit.classList.toggle('visible');
});
songListElement.addEventListener("click", () => {
  activeList = primaryList;
});

songListFavorit.addEventListener("click", () => {
  activeList = favoritList;
});

// TODO - It works for now
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
    drawSpace();
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
  }, 150);
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
 * The function `drawEQ` is responsible for drawing an equalizer visualization on a canvas using
 * frequency data from an audio analyser.
 */
function drawEQ() {
  requestAnimationFrame(drawEQ);

  let dataArray = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(dataArray);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let barWidth = (canvas.width / bufferLength) * 2.5;
  let barHeight;
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i];

    // ctx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';

    ctx.fillStyle = lerpColor(color1, color2, barHeight / 255);
    ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);

    x += barWidth + 1;
  }
}
function drawEQTwo() {
  requestAnimationFrame(drawEQTwo);

  let dataArray = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(dataArray);

  ctxTwo.clearRect(0, 0, canvasTwo.width, canvasTwo.height);

  let barWidth = (canvasTwo.width / bufferLength) * 2.5;
  let barHeight;
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i];

    // ctx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';

    ctxTwo.fillStyle = lerpColor(color1, color2, barHeight / 255);
    ctxTwo.fillRect(
      x,
      canvasTwo.height - barHeight / 2,
      barWidth,
      barHeight / 2
    );

    x += barWidth + 1;
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
 * The function "changeSong" updates the song information and audio source based on the current index
 * in the songsList array.
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
  drawEQ();
  drawEQTwo();
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

/**
 * The function `handleDrop` is used to handle the drop event when dragging and dropping songs between
 * two lists.
 * @param sourceList - sourceList is an array that represents the list of songs from which a song is
 * being dragged and dropped.
 * @param targetList - The targetList parameter represents the list where the dragged item will be
 * dropped. It can be either the primaryList or the favoritList, depending on the event listener that
 * triggers the handleDrop function.
 * @param event - The event parameter is the event object that is triggered when the drop event occurs.
 * It contains information about the event, such as the target element and any data that is being
 * transferred.
 */

function handleDrop(sourceList, targetList, event) {
  event.preventDefault();

  const index = event.dataTransfer.getData("text/plain");

  // const [song] = sourceList.splice(index, 1); // Remove the song from the source list and store it in a variable
  
  if (event.currentTarget.id === "song-list" && listName === "favorit") {
    return;
  }
  const song = sourceList[index];
  

  if (targetList.includes(song)) {
    return;
  }

  targetList.push(song);

  populateSongList();
}

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
window.toggleShuffle = toggleShuffle;

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

window.toggleRepeat = toggleRepeat;

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
window.nextSong = nextSong;
/**
 * The function "prevSong" changes the current song to the previous song in a list of songs.
 */
function prevSong() {
  if (playedSongs.length > 1) {
    playedSongs.pop();
    currIndex = playedSongs.pop();
  } else {
    currIndex = (currIndex - 1 + activeList.length) % activeList.length;
  }
  changeSong();
}
window.prevSong = prevSong;
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
window.toggleState = toggleState;

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
window.adjustVolume = adjustVolume;

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

populateSongList();
changeSong();
