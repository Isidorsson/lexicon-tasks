### Objects

An object can be described as its counterpart in real life. Take a car for example, it is an object and it has **_properties_** like make, model, color, engine, number of wheels and so on. It also has **_methods_**, (_things you can do with the car_), like starting the car, breaking, using the blinkers and such things.

All cars have these properties but different car of course has different values on these properties. Methods works the same way, all cars have them, although some cars might have extra methods (addons) that other cars don't have. But in general, you can do the same things with every car, like starting, like stopping and so on.

In JavaScript objects works in this way as well. It has properties and methods. We have already been using objects during the last couple of week without knowing it.

**Arrays** for example are a type of object. It has at least one property that we know of, the `.length`. Which represents the number of elements in an array. It has also methods, of which we have used a few. `.push`, `.pop`, `.unshift` and `.includes` for example. All those methods and the property are shared among **all** the arrays that we create in our programs.

**Strings** are also an object in JavaScript, it has properties - `.length` also exists here. It also has methods. We haven't used any of those yet, but they exists. Try them out, create a string in a JavaScript-file and add a dot (_period_) in the end and see what pops up.

How do we create custom objects in JavaScritpt then?

It's rather easy, we do need a variable and we need a variable name, but after the equal sign we don't just put a value there but instead we put a pair of brackets. Like this:

```js
const someObject = {};
```

That's an empty object right there. Good practise is to use the const keyword here since objects (_like arrays_) are passed by reference. The variable name is just a reference, a pointer to the place on the hard drive where the actual data is stored.

Let's create a `car` instead, and fill it with some useful information.

```js
const car = {
  make: "Volvo",
  model: "V70",
  year: 2016,
  manualTransmission: true,
};
```

This car represents an object, and it has **_properties_**, four of them. four properties that represent some sort of information of the car. As you can see, the properties can be of different data types. The structure of a property is key-value; The key to the left, and the value to the right after the colon.

An object can also have **_methods_** that represents an action the the object can do. Methods are exactly the same as function, the only different is that methods are connected to some sort of object wheras function are standalone Let's use our car again but add a method.

```js
const car = {
  make: "Volvo",
  model: "V70",
  year: 2016,
  manualTransmission: true,
  start: function () {
    console.log("The car is running");
  },
};
```

How do we work with objects then, we know know how to create them, but what if we want to access a specific property of a specific object, how would we do then?

```js
const person = {
  name: "Niklas",
  age: 32;
}
```

To access one property of an objects, there are two ways to do it. We use dot notation or square brackets. Let's log the name and age to the console together with a nice template literal.

```js
// With dot notation
const str = `Hello, my name is ${person.name}, and I am ${person.age} years old.`;

//With square brackets, important that it's a string inside the square brackdts
const str1 = `Hello, my name is ${person["name"]}, and I am ${person["age"]} years old.`;

console.log(str);
// Hello, my name is Niklas, and I am 32 years old.
```

We can also update the values in an object via dot notation and square brackets.

```js
person.name = "Henrik";
person.age = 35;

console.log(str);
// Hello, my name is Henrik, and I am 35 years old.

person["name"] = "Erik";
persona.age = 30;

console.log(str);
// Hello, my name is Erik, and I am 30 years old.
```

So, both accessing and updating values are done with dot notation or square brackets. Simple stuff! How do we access methods then? BUT, since it's a method we need tha parenthesis and any arguments if any agrument is defined that is. Back to the car:

```js
const car = {
  make: "Volvo",
  model: "V70",
  year: 2016,
  manualTransmission: true,
  start: function () {
    console.log("The car is running");
  },
};

console.log(car[make]); // "Volvo"
console.log(car.year); // 2016;

car.start();
// Or, but dot notation looks better..
car["start"]();
```

`car.start()` or `car["start"]()` will just log _"The car is running"_ to the console. But it's a valid method regardless.

We can do more things with an object. We can add properties _(or methods)_ on the fly. Which means we don't need to have all properties defined at the start. Take the car for example. Right now it is absent color. Let's add a color.

```js
car.color = "Navy";

console.log(car.model); // "Volvo"
console.log(car.color); // "Navy"
```

#### Looping through objects

Looping through an object is very similar to looping through an array. We still use a foreach, but for arrays the foreach is usually called `for-of loop` while for objects it's called `for-in loop`. Indentical syntax except for the keyword `in` that is used instead of `of`.

```js
const car = {
  make: "Volvo",
  model: "V70",
  year: 2016,
  manualTransmission: true,
  start: function () {
    console.log("The car is running");
  },
};

for (let key in car) {
  console.log(car[key]);
}

// This loop will print out the value of each property

/**
 * Volvo,
 * V70,
 * 2016
 * true
 * f(){console.log("The car is running")}
 */
```

When we want to access a property inside a for loop like the one above, you'll have to use the square bracket syntax since you can't use dot notation with dynamic values. With dot-notation you need to access the property in a literal sense. The property must exist on the object or the value will be undefined. In an loop, like in the example, the key _(just a variable that is reused in every iteration, can be named anything)_, is a string that the loop creates for us before each iteration, and the value it has is the key of the property as a string.

```js
for (let key in car) {
  console.log(key);
}

// This loop will just print out the key of each property

/**
 * make
 * model
 * year
 * manualTransmission
 * start
 */
```
