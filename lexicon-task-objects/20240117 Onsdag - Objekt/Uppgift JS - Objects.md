### Create an Object

Create an object representing a person with properties like name, age, and city.

```js
const person = {
  name: "Henrik",
  age: 35,
  city: "Stockholm",
};

console.log(person);
```

### Access Object Properties

Access and print the values of the person's properties.

```js
console.log(person.name); 
```

### Modify Object Properties

Modify the age of the person and add a new property for their email.

```js
person.age = 30;
```

### Object with Methods

Create an object representing a car with properties like make, model, and a method to display its details.

```js
const car = {
  make: "Volvo",
  model: "V70",
  year: 2016,
  manualTransmission: true,
  start: function () {
    console.log("The car is running");
  }
};
car.start();
```

### Loop through Object Properties

Loop through the person object from exercise 1 and print each property and its value.

```js
for (let key in person) {
  console.log(`${key}: ${person[key]}`);
}
```

### Object with Nested Properties

Create an object representing a student with nested properties for subjects and grades.

```js
const student = {
  name: "Niklas",
  age: 32,
  city: "Stockholm",
  subjects: {
    math: 5,
    science: 4,
    english: 5,
  },
};
```

### Modify Nested Object Property

Modify the science grade of the student from the previous exercise.

### Array of Objects

Create an array of objects representing different books with properties like title and author.

### Loop through Array of Objects

Loop through the books array from the previous exercise and print the title and author of each book.
