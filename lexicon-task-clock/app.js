// Get a reference to the canvas
const canvas = document.getElementById("canvas");

// Get the 2D context from the canvas
const ctx = canvas.getContext("2d");

// Set the center of the clock
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

// Draw a circle for the clock face
ctx.beginPath();
ctx.arc(centerX, centerY, 100, 0, 2 * Math.PI);
ctx.stroke();

// Generate a random time
const date = new Date();
date.setHours(Math.floor(Math.random() * 24));
date.setMinutes(Math.floor(Math.random() * 60));
date.setSeconds(Math.floor(Math.random() * 60));

// Get the hours, minutes, and seconds
const hours = date.getHours();
const minutes = date.getMinutes();
const seconds = date.getSeconds();

// Calculate the angles for the clock hands
const hoursAngle =
  (((hours % 12) + minutes / 60) * 2 * Math.PI) / 12 - Math.PI / 2;
const minutesAngle =
  ((minutes + seconds / 60) * 2 * Math.PI) / 60 - Math.PI / 2;
const secondsAngle = (seconds * 2 * Math.PI) / 60 - Math.PI / 2;

// Draw the hour hand
ctx.beginPath();
ctx.moveTo(centerX, centerY);
ctx.lineTo(
  centerX + 50 * Math.cos(hoursAngle),
  centerY + 50 * Math.sin(hoursAngle)
);
ctx.stroke();

// Draw the minute hand
ctx.beginPath();
ctx.moveTo(centerX, centerY);
ctx.lineTo(
  centerX + 75 * Math.cos(minutesAngle),
  centerY + 75 * Math.sin(minutesAngle)
);
ctx.stroke();

// Draw the second hand
ctx.beginPath();
ctx.moveTo(centerX, centerY);
ctx.lineTo(
  centerX + 90 * Math.cos(secondsAngle),
  centerY + 90 * Math.sin(secondsAngle)
);
ctx.stroke();

// Get the time in 24-hour format, Swedish locale (sv-SE)
// const timeText = date.toLocaleTimeString('sv-SE', { hour12: false });
const timeText = date.toLocaleTimeString("en-US", { hour12: true });

// console.log(timeText);

// Get a reference to the time element
const timeElement = document.getElementById("time");

// Get the numbers
const numbers = document.querySelectorAll(".number");

// Update the rotation of the numbers
numbers.forEach((number, index) => {
  const angle = (index * 360) / 12;
  number.style.transform = `rotate(${angle}deg) translateY(-40px)`;
});

//Probably better way to convert this probably should used a library:)
const numberToWords = {
  0: "zero",
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
  10: "ten",
  11: "eleven",
  12: "twelve",
  13: "thirteen",
  14: "fourteen",
  15: "fifteen",
  16: "sixteen",
  17: "seventeen",
  18: "eighteen",
  19: "nineteen",
  20: "twenty",
  30: "thirty",
  40: "forty",
  50: "fifty",
};

function timeToWords(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return `${numberToWords[hours]} ${
    minutes < 20
      ? numberToWords[minutes]
      : numberToWords[minutes - (minutes % 10)] +
        " " +
        numberToWords[minutes % 10]
  }`;
}

// Convert the time to words
const timeInWords = timeToWords(timeText);
timeElement.textContent = "It's " + timeInWords + " o'clock";

// use timeNum display number
const timeNum = document.getElementById("timeNum");
timeNum.textContent = timeText;
// console.log(timeNum.textContent);
