### Create an Object

Create an object representing a person with properties like name, age, and city.

```js
const person = {
  name: "John",
  age: 35,
  city: "New York",
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
  make: "Subaru",
  model: "123",
  year: 123,
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
  name: "John",
  age: 30,
  city: "New York",
  subjects: {
    math: 1,
    science: 2,
    english: 3,
  },
};
```

### Modify Nested Object Property

Modify the science grade of the student from the previous exercise.

```js
student.subjects.science = 10;
```

### Array of Objects

Create an array of objects representing different books with properties like title and author.

```js
const books = [
  {
    title: "Harry Potter",
    author: "J.K. Rowling",
  },
  {
    title: "Lord of the Rings",
    author: "J.R.R. Tolkien",
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
  },
];
```

### Loop through Array of Objects

Loop through the books array from the previous exercise and print the title and author of each book.

```js
for (let book of books) {
  console.log(`${book.title} by ${book.author}`);
}
```
