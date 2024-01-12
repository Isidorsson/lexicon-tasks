// 1.
let userName = prompt('What is your name?');

console.log(`Hello ${userName}!`); 

let userAge = prompt('How old are you?');

// 2.
let currentYear = new Date().getFullYear();

console.log(`You were born in ${currentYear - userAge}!`);

// 3. 4. 5. 6. 
let firstNumber = parseFloat(prompt('Enter a number'));
let secondNumber = parseFloat(prompt('Enter another number'));
let operation = prompt('What operation do you want to perform? (add, sub, mul, div)');

let result = eval(`${firstNumber} ${operation === 'add' ? '+' : operation === 'sub' ? '-' : operation === 'mul' ? '*' : operation === 'div' ? '/' : 'Invalid'} ${secondNumber}`);

alert(`The result is ${result}`);
console.log(`The result is ${result}`);


// Okej, nu är det dags att programmera en ordentlig, fast enkel miniräknare i JavaScript. Nedan kommer instruktionerna. Ni behöver som alltid en index.html och en index.js som måste vara ihopkopplade.
// 1. Skapa en prompt som frågar om ett valfritt tal. Spara undan i en variabel.
// 2. Skapa en prompt till som frågar om ett annat tal. Spara i en variabel.
// 3. Skapa ny en tredje prompt som frågar vilket räknesätt användare vill använda. Det bör framgå att endast +, -, \* och / är möjliga. Denna ska också sparas i en variabel.
// 4. Skapa en if-else-if check där du checkar de olika alternativen. Till exempel. Om räknesättet är lika med addition, så ska en addition utföras mellan de två talen och en alert ska poppa upp och redovisa resultatet. Är det subtraktion som gäller så ska subtraktion ske mellan talen och så vidare.
// 5. Inkludera en else i slutet som hanterar alla utfall, om till exempel räknesättet skrivs in fel så det inte känns igen eller liknande.
// 6. Lägga gärna till lite skjyssta alerts innan och efter som hälsar en välkommen och säger hejdå och så.

let firstNumber1 = parseFloat(prompt('Enter a number'));
let secondNumber1 = parseFloat(prompt('Enter another number'));

let operation1 = prompt('What operation1 do you want to perform? (add, sub, mul, div)');
let result1;

if (operation1 === 'add') {
    result1 = firstNumber1 + secondNumber1;
    alert(`The result1 is ${result1}`);
}
else if (operation1 === 'sub') {
    result1 = firstNumber1 - secondNumber1;
    alert(`The result1 is ${result1}`);
}
else if (operation1 === 'mul') {
    result1 = firstNumber1 * secondNumber1;
    alert(`The result1 is ${result1}`);
}
else if (operation1 === 'div') {
    result1 = firstNumber1 / secondNumber1;
    alert(`The result1 is ${result1}`);
}
else {
    alert('Invalid operation');
}
