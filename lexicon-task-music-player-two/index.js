import { songsList } from './songList.js';

let currIndex = 0;
let isPlaying = false;
let isRepeating = false;
let isShuffling = false;

let currSong = new Audio();

const songThumb = document.querySelector(".song-thumb");
const songTitle = document.querySelector(".song-info-title");
const songArtist = document.querySelector(".song-info-artist");
const songAlbum = document.querySelector(".song-info-album");

const stateButton = document.querySelector(".player-state-btn");
const songProgressBar = document.querySelector(".song-progress-value");
const volumeSlider = document.querySelector("#volume-slider");
const volumeTrail = document.querySelector(".volume-trail");

let canvas = document.getElementById('eq');
let ctx = canvas.getContext('2d');
let color1 = parseInt('4d3f61', 16);
let color2 = parseInt('ae80d6', 16);

let playedSongs = [];

let audioContext;
let source;
let analyser;
let bufferLength;
let dataArray;


let maxAverage = 0;
let maxAverageDecay = 0.995;
let beatThreshold = 0.99;

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

  // If the current average volume is higher than the beat threshold, consider it a beat
  if (average > maxAverage * beatThreshold) {
    console.log(` Beat! ${average} > ${maxAverage * beatThreshold}`)
    document.querySelector('.song-thumb').classList.add('pulse');
  } else {
    console.log(` No beat! ${average} < ${maxAverage * beatThreshold}`)
    document.querySelector('.song-thumb').classList.remove('pulse');
  }
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
    ag = a >> 8 & 0xff,
    ab = a & 0xff,

    br = b >> 16,
    bg = b >> 8 & 0xff,
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

  const { title, artist, album, thumb, link } = songsList[currIndex];
  songTitle.innerHTML = title;
  songArtist.innerHTML = artist;
  songAlbum.innerHTML = album;
  songThumb.style.backgroundImage = `url(${thumb})`;
  currSong.src = link;

  const listItems = document.querySelectorAll('#song-list li');
  listItems.forEach(item => item.classList.remove('active-song'));

  const activeSong = listItems[currIndex];
  activeSong.classList.add('active-song');

  if (currentStatus) toggleState();
  playedSongs.push(currIndex);


  initializeAudioContext();

  draw();
  drawEQ();


}


/**
 * The function `populateSongList` creates a list of songs and adds them to the DOM, with each song
 * item having a click event listener that triggers the `changeSong` function.
 */
function populateSongList() {
  const songListElement = document.getElementById('song-list');
  songsList.forEach((song, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = song.title; // assuming each song is an object with a title property
    listItem.addEventListener('click', () => {
      currIndex = index;
      changeSong();
    });
    songListElement.appendChild(listItem);
  });
}
/**
 * The function toggles the shuffle mode by adding or removing the 'active' class from the shuffle
 * button and updating the isShuffling variable.
 */

function toggleShuffle() {
  isShuffling = !isShuffling;
  document.querySelector('.shuffle-btn').classList.toggle('active', isShuffling);
  if (isShuffling && currSong.paused) {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * songsList.length);
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
  document.querySelector('.repeat-btn').classList.toggle('active', isRepeating);

  if (isRepeating) {
    currSong.loop = true;
  } else {
    currSong.loop = false;
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
      newIndex = Math.floor(Math.random() * songsList.length);
    } while (newIndex === currIndex);
    currIndex = newIndex;
  } else {
    currIndex = (currIndex + 1) % songsList.length;
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
    currIndex = (currIndex - 1 + songsList.length) % songsList.length;
  }
  changeSong();
}
window.prevSong = prevSong;
/**
 * The function toggles the state of a player between playing and paused, and updates the button icon
 * accordingly.
 */


function toggleState() {
  // if (!audioContext) {
  //   initializeAudioContext();
  //   drawEQ();
  // }

  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  isPlaying ? currSong.pause() : currSong.play();
  stateButton.classList = isPlaying ? "fas fa-play-circle player-state-btn" : "fas fa-pause-circle player-state-btn";
  isPlaying = !isPlaying;

  // Draw() when start playing
  // if (isPlaying) {
  //   draw();
  // }
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
  volumeTrail.style.width = currVol !== "0" && currVol !== 0 ? `${currVol * 100 - 2}%` : "0%";
  volumeSlider.value = currVol;
}
window.adjustVolume = adjustVolume;


/* The code snippet `window.addEventListener('keydown', function(e) { ... })` adds an event listener to
the window object for the 'keydown' event. This event is triggered when a key on the keyboard is
pressed. */
window.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') {
    let newTime = currSong.currentTime + 5;
    if (newTime > currSong.duration) newTime = currSong.duration;
    currSong.currentTime = newTime;
  } else if (e.key === 'ArrowLeft') {
    let newTime = currSong.currentTime - 5;
    if (newTime < 0) newTime = 0;
    currSong.currentTime = newTime;
  }
});


/* The code `currSong.addEventListener('timeupdate', () => { ... })` adds an event listener to the
`currSong` audio element. The event being listened to is the `timeupdate` event, which is fired when
the playback position of the audio changes. */
currSong.addEventListener('timeupdate', () => {
  const currPosition = currSong.currentTime / currSong.duration * 600;
  songProgressBar.setAttribute("stroke-dasharray", !isNaN(currPosition) ? `${currPosition} ${600 - currPosition}` : "0 600");
});

currSong.addEventListener('ended', () => {
  if (isRepeating) {
    currSong.play();
  } else {
    nextSong();
  }
}
);





populateSongList();
changeSong();
