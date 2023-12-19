const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

ctx.beginPath();
ctx.arc(centerX, centerY, 100, 0, 2 * Math.PI);
ctx.stroke();

const date = new Date();
date.setHours(Math.floor(Math.random() * 24));
date.setMinutes(Math.floor(Math.random() * 60));
date.setSeconds(Math.floor(Math.random() * 60));

const hours = date.getHours();
const minutes = date.getMinutes();
const seconds = date.getSeconds();

const hoursAngle =
  (((hours % 12) + minutes / 60) * 2 * Math.PI) / 12 - Math.PI / 2;
const minutesAngle =
  ((minutes + seconds / 60) * 2 * Math.PI) / 60 - Math.PI / 2;
const secondsAngle = (seconds * 2 * Math.PI) / 60 - Math.PI / 2;

ctx.beginPath();
ctx.moveTo(centerX, centerY);
ctx.lineTo(
  centerX + 50 * Math.cos(hoursAngle),
  centerY + 50 * Math.sin(hoursAngle)
);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(centerX, centerY);
ctx.lineTo(
  centerX + 75 * Math.cos(minutesAngle),
  centerY + 75 * Math.sin(minutesAngle)
);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(centerX, centerY);
ctx.lineTo(
  centerX + 90 * Math.cos(secondsAngle),
  centerY + 90 * Math.sin(secondsAngle)
);
ctx.stroke();

const timeText = date.toLocaleTimeString("sv-SE", { hour12: false });

const timeElement = document.getElementById("time");

timeElement.textContent = timeText;
