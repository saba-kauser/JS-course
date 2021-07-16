'use strict';

// 1 - default parameters

// const book = [];
// const DefaultBookings = function (
//   flightNo,
//   Passengerno = 1,
//   price = 100 * Passengerno
// ) {
//   //using default values in case of falsie values
//   const bookings = {
//     // creating an object with just property and no value
//     flightNo,
//     Passengerno,
//     price,
//   };
//   console.log(bookings);
//   book.push(bookings); // pushing the object into the array along with the property defined and the value passed in the parameters
// };

// DefaultBookings('B231');
// DefaultBookings('B231', 2, 800);
// DefaultBookings('B231');
// DefaultBookings('B231', 2);
// DefaultBookings('B231', undefined, 20);

//2- passing primitive types and references types to objects-------------------------------------------------

// const orderNo = 20232;
// const orderSummary = {
//   name: 'Saba',
//   address: 'HYD',
// };

// const deliveryData = function (deliveryNo, passDetails) {
//   deliveryNo = 232121;
//   passDetails.name = 'Ms.' + passDetails.name;
//   if (passDetails.address === 'BLR') {
//     alert('Package Delivered to right address');
//   } else {
//     alert('package Delivered to wrong address');
//   }
// };

// deliveryData(orderNo, orderSummary);
// console.log(orderNo);
// console.log(orderSummary);

//3- functions accepting callback functions-------------------------------------------

//first class - converts string to lower case and replaces space
// const strConvertToOneWord = function (str) {
//   return str.replace(/ /g, '').toLowerCase(); // / / g is used to select the entire string that is passed globally and '' is to remove all the spaces from the string = note - do not use ' ' with extra space
//};

// first class- converst first word to upper csae
// const firstWordUpper = function (word) {
//   const [firstWord, ...others] = word.split(' ');
//   return [firstWord.toUpperCase(), ...others].join(' ');
// };

// //THE HIGHER ORDER FUNCTION

// const transformer = function (str, CallBackfn) {
//   // This is  higher order function is the transformer function which takes call back function as input
//   console.log(`original string : ${str}`);
//   console.log(`Transformed String:${CallBackfn(str)}`);

//   console.log(`Transformed by : ${CallBackfn.name}`); // displays the name of the callback function / first class function ( this is a method of functions)
// };

// transformer('JavaScript is the Best', firstWordUpper); // passing a string and the function that converts the string

// transformer('JavaScript is the Best', strConvertToOneWord);

//5 - Functions returning functions

// 6- Call and apply method

// const lufthansa = {
//   airline: 'Lufthansa',
//   code: 'LH',
//   bookings: [],
//   book(flightNumber, name) {
//     console.log(
//       `${name} has booked a seat in ${this.airline} flight ${this.code}${flightNumber}`
//     );

//     this.bookings.push({ flight: `${this.code}${flightNumber}`, name });
//   },
// };
// lufthansa.book(776, 'Saba Kauser');
// // console.log(lufthansa);

// // suppose lufthansa has added a new airline and we want to reuse the book method code from the above object
// const eurowings = {
//   name: 'Eurowings',
//   code: 'EW',
//   bookings: [],
// };

// // to reuse the book method we can store it to a variable which is also now a function
// const bookFlight = lufthansa.book;

// // bookFlight(24, 'saba'); // this will not work because regular functions do not accept this keyword - in this case this keyword becomes undefined

// // There are 3 ways to tackle thi 1 . call 2. apply 3 . bind

// // 1. call

// bookFlight.call(eurowings, 23, 'Saba K'); //points to the this keyword of the eurorwings object and runs the function book inside books
// bookFlight.call(lufthansa, 232, 'Mary cooper');

// // always use same property names and heirarchy

// //2. apply methods ( accepts array as arguments )

// const flightData = [34, 'William Shakespeare'];
// bookFlight.apply(eurowings, flightData);
// //or
// bookFlight.call(lufthansa, ...flightData); // same as above but used spread operator

// //3. bind - binds the method to a variable in this case a function itslef

// const bindEW = bookFlight.bind(eurowings);
// const bindLH = bookFlight.bind(lufthansa);
// bindEW(33, 'Tom');
// bindLH(56, 'Harry');
// // console.log(eurowings);

// // can also set the arguments using bind along with the object name

// const bindSetArgs = bookFlight.bind(lufthansa, 33);
// bindSetArgs('Martha');

// // with event listeners

// lufthansa.plane = 20;
// lufthansa.buyNewPlane = function () {
//   this.plane++;
//   console.log(this.plane);
// };

// //lufthansa.buyNewPlane();this is a function call hence works

// // document.querySelector('.buy').addEventListener('click', lufthansa.buyNewPlane); // this will not work as the this function points to the element that is attached to the event listener ( here the this key will return the button Buy new plane)

// //RATHER
// document
//   .querySelector('.buy')
//   .addEventListener('click', lufthansa.buyNewPlane.bind(lufthansa)); // binding the method to the lufthansa object will return a new function as argument to the event handler
// // this will work as it BIND returns a function

// //Partial application using bind (presetting parameter value)

// const addTax = (rate, value) => value + value * rate;
// console.log(addTax(0.1, 200));

// const addVAT = addTax.bind(null, 0.5);
// //same as addTax=value=>value+value*0.5;
// // adding null as the first arguments that bind call and apply accept are all this keyworkd objects to point to

// console.log(addVAT(200));

// // implementing above using functions returning other functions

// const addTaxNew = function (rate) {
//   return function (value) {
//     console.log(`${value + value * rate}`);
//   };
// };

// addTaxNew(0.1)(200);
// const test = addTaxNew(0.1);
// test(200);

///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

// const poll = {
//   question: 'What is your favourite programming language?',
//   options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
//   // This generates [0, 0, 0, 0]. More in the next section 😃
//   answers: new Array(4).fill(0),
//   registerNewAnswer() {
//     const userInput = prompt(
//       `${this.question}\n${this.options.join('\n')}\n(Write option number)`
//     );
//     if (userInput < this.answers.length) {
//       this.answers[userInput]++;
//       this.displayResults(this.answers);
//     } else {
//       alert('Invalid input');
//     }
//     // console.log(this.answers);
//     // const arrayToString = this.answers.toString();
//     // // console.log(arrayToString.replaceAll(',', ''));
//     // // console.log(typeof arrayToString);
//     // this.displayResults(arrayToString.replaceAll(',', ''));
//   },

//   displayResults(type = 'array') {
//     if (typeof type === 'string') {
//       console.log(`Poll results are ${this.answers.join(',')}`);
//     } else {
//       console.log(this.answers);
//     }
//   },
// };

// document
//   .querySelector('.poll')
//   .addEventListener('click', poll.registerNewAnswer.bind(poll));

// const bonusArray = 'Saba';

// const Results = poll.displayResults;

// Results.call(null, bonusArray);

//CLOSURES

// const secureBooking = function () {
//   let passengerCount = 0; // the variable that the function will have access too

//   return function () {
//     passengerCount++;
//     console.log(`${passengerCount} passengers`);
//   };
// };

// const booker = secureBooking(); // booker function is the function that will have access to the variables of the securebooking function ( this is the closure)

// booker(); // op-1
// booker(); // op-2
// booker(); // op-3

// console.dir(booker);

// /// more closure examples-----------------------------------

// // example 1 ( function re assignment even without returning)
// let f;

// const g = function () {
//   const a = 20;
//   f = function () {
//     console.log(a * 2);
//   };
// };

// const h = function () {
//   const b = 200;
//   f = function () {
//     console.log(b * 2);
//   };
// };

// g(); // here g exist from exec context
// f(); // f closes on all variables of g

// console.dir(f); // has value of a
// // re assigning to the f variable using h function
// h();
// f();

// console.dir(f); // has value of b

// // EXample 2

// const baordpassengers = function (n, wait) {
//   const perGroup = n / 3;

//   // the following function displays the op after some time
//   // uses all variables and behaves independantly
//   setTimeout(function () {
//     console.log(`We are now boarding all ${n} passengers`);
//     console.log(`There are 3 groups, each with ${perGroup} groups`);
//   }, wait * 1000); // the set timer funcion accepst two arguments 1 fn and 1 time paramter in ms and displays the output of the fn after that amount of time

//   console.log(`Will start boarding in ${wait} seconds`); // this will display before the above funtion
// };

// baordpassengers(18, 5);

// coding challenge 2

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
