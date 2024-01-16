//Just run this inside of the console in the browser to see it work. Will prompt you to input a temperature in Fahrenheit like 165 ish and then it will convert it to Celsius and tell you if it's too hot or too cold or just right. If it's too hot or too cold it will prompt you to enter a new temperature in Fahrenheit. If it's just right it will tell you it's perfect and stop the loop.

const MIN_TEMP = 73;
const MAX_TEMP = 77;

function getTempCelsius(tempFahrenheit) {
  return (tempFahrenheit - 32) * 5 / 9; 
}

function checkTemp(tempCelsius) {
  if (tempCelsius < MIN_TEMP) {
    return "It's too cold, turn up the heat!";
  } else if (tempCelsius > MAX_TEMP) {
    return "It's too hot, turn down the heat!";
  } else {
    return "The temperature is perfect!";
  }
}

let tempCelsius = 0;
do {
  const tempFahrenheit = prompt("Enter a temperature in Fahrenheit");
  tempCelsius = getTempCelsius(tempFahrenheit);
  console.log(tempCelsius);
  console.log(checkTemp(tempCelsius));
} while (tempCelsius < MIN_TEMP || tempCelsius > MAX_TEMP);


