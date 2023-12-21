const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.9;
//drawClock();
setInterval(drawClock, 1000);

function drawClock() {
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
  const grad = ctx.createRadialGradient(
    0,
    0,
    radius * 0.95,
    0,
    0,
    radius * 1.05
  );
  grad.addColorStop(0, "#333");
  grad.addColorStop(0.5, "white");
  grad.addColorStop(1, "#333");

  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.fillStyle = "white";
  ctx.fill();

  ctx.strokeStyle = grad;
  ctx.lineWidth = radius * 0.05;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
  ctx.fillStyle = "#333";
  ctx.fill();
}

let displayNumbers = true;

function drawNumbers(ctx, radius) {
  if (!displayNumbers) {
    return;
  }
  ctx.font = radius * 0.15 + "px arial";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  for (let num = 1; num < 13; num++) {
    let ang = (num * Math.PI) / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius * 0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius * 0.85);
    ctx.rotate(-ang);
  }
}

const toggleNumbersButton = document.getElementById("toggleNumbers");
const img = document.querySelector("img"); 

toggleNumbersButton.addEventListener("click", function () {
  displayNumbers = !displayNumbers;
  
  if (displayNumbers) {
    img.style.display = "none"; 
  } else {
    img.style.display = "block";
  }

  drawClock();
});



function drawTime(ctx, radius) {
  const now = new Date();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();
  hour = hour % 12;
  hour =
    (hour * Math.PI) / 6 +
    (minute * Math.PI) / (6 * 60) +
    (second * Math.PI) / (360 * 60);
  drawHand(ctx, hour, radius * 0.5, radius * 0.05);
  minute = (minute * Math.PI) / 30 + (second * Math.PI) / (30 * 60);
  drawHand(ctx, minute, radius * 0.8, radius * 0.05);
  second = (second * Math.PI) / 30;
  drawHand(ctx, second, radius * 0.9, radius * 0.03);
}

function drawHand(ctx, pos, length, width) {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.moveTo(0, 0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-pos);
}

const button = document.querySelector("button");
const timeWord = document.querySelector(".time-word");
const timeNum = document.querySelector(".time-num");

function timeToWords(hours, minutes) {
  const numbersToWords = {
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
    15: "quarter",
    16: "sixteen",
    17: "seventeen",
    18: "eighteen",
    19: "nineteen",
    20: "twenty",
    21: "twenty-one",
    22: "twenty-two",
    23: "twenty-three",
    24: "twenty-four",
    25: "twenty-five",
    26: "twenty-six",
    27: "twenty-seven",
    28: "twenty-eight",
    29: "twenty-nine",
    30: "half",
  };

  let words = "";

  if (minutes <= 30) {
    words += numbersToWords[minutes] + " past " + numbersToWords[hours];
  } else {
    words +=
      numbersToWords[60 - minutes] + " to " + numbersToWords[(hours % 12) + 1];
  }

  return words;
}

function updateTime() {
  let currentTime = new Date();
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();

  let timeWords = timeToWords(hours, minutes);

  if (timeWord.style.display === "none") {
    timeWord.style.display = "block";
    timeNum.style.display = "none";
    timeWord.textContent = timeWords;
  } else {
    timeWord.style.display = "none";
    timeNum.style.display = "block";
    timeNum.textContent = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  }
}
button.addEventListener("click", updateTime);
updateTime();
