import { songsList } from './songList.js';

let currIndex = 0;
let isPlaying = false;
let isRepeating = false;
let isShuffling = false;

const currSong = new Audio();

const songThumb = document.querySelector(".song-thumb");
const songTitle = document.querySelector(".song-info-title");
const songArtist = document.querySelector(".song-info-artist");
const songAlbum = document.querySelector(".song-info-album");

const stateButton = document.querySelector(".player-state-btn");
const songProgressBar = document.querySelector(".song-progress-value");
const volumeSlider = document.querySelector("#volume-slider");
const volumeTrail = document.querySelector(".volume-trail");
 


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
  if (isShuffling) {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * songsList.length);
    } while (newIndex === currIndex);
    currIndex = newIndex;
    changeSong();
  }
}
window.toggleShuffle = toggleShuffle;


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
}
window.nextSong = nextSong;

/**
 * The function "prevSong" changes the current song to the previous song in a list of songs.
 */
function prevSong() {
  if (isShuffling) {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * songsList.length);
    } while (newIndex === currIndex);
    currIndex = newIndex;
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
  isPlaying ? currSong.pause() : currSong.play();
  stateButton.classList = isPlaying ? "fas fa-play-circle player-state-btn" : "fas fa-pause-circle player-state-btn";
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
  volumeTrail.style.width = currVol !== "0" && currVol !== 0 ? `${currVol * 100 - 2}%` : "0%";
  volumeSlider.value = currVol;
}
window.adjustVolume = adjustVolume;

/* The code `currSong.addEventListener('timeupdate', () => { ... })` adds an event listener to the
`currSong` audio element. The event being listened to is the `timeupdate` event, which is fired when
the playback position of the audio changes. */
currSong.addEventListener('timeupdate', () => {
  const currPosition = currSong.currentTime / currSong.duration * 600;
  songProgressBar.setAttribute("stroke-dasharray", !isNaN(currPosition) ? `${currPosition} ${600-currPosition}` : "0 600");
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
