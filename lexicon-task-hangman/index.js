const words = ["apple", "banana", "cherry", "date", "elderberry"];

let word = words[Math.floor(Math.random() * words.length)];

let wrongGuesses = 0;
let guessedLetters = Array(word.length).fill("_");

let usedLetters = [];
let timerId = null;
let timeLeft = 10;

const wordElement = document.getElementById("word-to-guess");
const usedLettersElement = document.getElementById("used-letters");
const gameMessageElement = document.getElementById("game-message");
const restartButton = document.getElementById("restart-btn");
const startButton = document.getElementById("start-btn");
const alphabetLettersSection = document.getElementById("alphabet-letters");

const svgPaths = ["#head", "#body", "#arms", "#legs"].map((id) =>
  document.querySelector(id)
);
function showHangmanParts() {
  switch (wrongGuesses) {
    case 1:
      head.style.display = "block";
      break;
    case 2:
      body.style.display = "block";
      break;
    case 3:
      arms.style.display = "block";
      break;
    case 4:
      legs.style.display = "block";
      break;
    case 5:
      gameMessageElement.textContent = "You lost!";
      restartButton.style.display = "block";
      break;
  }
}
function updateTimerDisplay() {
  document.getElementById("timer").textContent = `Timer: ${timeLeft}`;
}

/**
 * The function starts a timer that counts down from 10 and displays the remaining time, and if the
 * time reaches 0, it displays a message and shows a restart button.
 */
function startTimer() {
  if (timerId !== null) {
    clearInterval(timerId);
  }

  timeLeft = 10;

  timerId = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();

    if (timeLeft <= 0) {
      clearInterval(timerId);
      gameMessageElement.textContent = "You lost!";
      // restartButton.style.display = "block";
    }
  }, 1000);
}

function updateWordDisplay() {
  wordElement.textContent = guessedLetters.join(" ");
}

function updateUsedLettersDisplay() {
  usedLettersElement.textContent = "Used letters: " + usedLetters.join(", ");
}

function checkWin() {
  if (!guessedLetters.includes("_")) {
    gameMessageElement.textContent = "You won!";
    restartButton.style.display = "block";
  }
}

function restartGame() {
  word = words[Math.floor(Math.random() * words.length)];

  guessedLetters = Array(word.length).fill("_");
  usedLetters = [];


  updateWordDisplay();
  updateUsedLettersDisplay();

  gameMessageElement.textContent = "";

  startTimer();
}

function handleGuess(letter) {
  if (usedLetters.includes(letter)) {
    return;
  }

  usedLetters.push(letter);

  const button = document.getElementById(`letter-${letter}`);
  if (button) {
    button.classList.add("used-letter");
  }

  if (word.includes(letter)) {
    for (let i = 0; i < word.length; i++) {
      if (word[i] === letter) {
        guessedLetters[i] = letter;
      }
    }
  } else {
    if (svgPaths[wrongGuesses]) {
      svgPaths[wrongGuesses].style.opacity = 1;
    }
    wrongGuesses++;
    showHangmanParts();
  }
  if (wrongGuesses >= 6) {
    gameMessageElement.textContent = "You lost!";
    restartButton.style.display = "block";
  }

  updateWordDisplay();
  updateUsedLettersDisplay();

  checkWin();
}

alphabetLettersSection.addEventListener("click", (event) => {
  const letter = event.target.textContent;
  handleGuess(letter);
});

for (let i = 0; i < 26; i++) {
  const letter = String.fromCharCode(97 + i);
  const button = document.createElement("button");
  button.textContent = letter;
  button.id = `letter-${letter}`;
  alphabetLettersSection.appendChild(button);

  button.addEventListener("click", function () {
    handleGuess(letter);
  });
}

window.addEventListener("keydown", function (event) {
  const letter = event.key.toLowerCase();

  if (letter >= "a" && letter <= "z") {
    handleGuess(letter);
  }
});

restartButton.addEventListener("click", restartGame);

updateWordDisplay();
startTimer(); 
