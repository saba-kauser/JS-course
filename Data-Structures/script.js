'use strict';

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours,
  order: function (firstOrder, secondOrder) {
    return [this.starterMenu[firstOrder], this.mainMenu[secondOrder]];
  },
  orderPizza(ing1, ...ing2) {
    console.log(ing1);
    console.log(ing2);
  },
  OrderPasta: function (ingrediant1, ingrediant2, ingrediant3) {
    console.log(
      `Your past with ${ingrediant1}, ${ingrediant2} and ${ingrediant3} is ready !!😋`
    );
  },
};

const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

for (const flight of flights.split('+')) {
  // console.log(flight);
  const [status, source, destination, time] = flight.split(';');
  const output = `${
    status.startsWith('_Delayed') ? '🔴' : ' '
  }${status.replaceAll('_', ' ')} from ${source
    .toUpperCase()
    .slice(0, 3)} to ${destination.toUpperCase().slice(0, 3)} (${time.replace(
    ':',
    'h'
  )})`.padStart(44);
  console.log(output);
}

//CODING challenge 4 ---------------------

// document.body.append(document.createElement('textarea'));
// document.body.append(document.createElement('button'));
// // unutilised

// document.querySelector('button').addEventListener('click', function () {
//   const text = document.querySelector('textarea').value;
//   const newArrayofInputs = text.split('\n');
//   for (const [i, str] of newArrayofInputs.entries()) {
//     const [first, second] = str.toLowerCase().trim().split('_');
//     // const splitString = newLowercaseString.split('_');
//     const output = `${first}${second.replace(
//       second[0],
//       second[0].toUpperCase()
//     )}`;
//     console.log(`${output.padEnd(20)}${'✅'.repeat(i + 1)}`); //use entries to get index of array
//   }
// });

// CamelCaseConverter('underscore_case');
// CamelCaseConverter('first_name');
// CamelCaseConverter('Some_Variable');s
// CamelCaseConverter('calculate_AGE');
// CamelCaseConverter('delayed_departure');
// werking with string part 3

// SPLIT

// console.log('Saba Kauser'.split(' '));

// const [first, last] = 'Saba Kauser'.split(' ');
// console.log(first, last);

// //JOIN
// const FullName = ['Ms.', first, last.toUpperCase()].join(' ');
// console.log(FullName);

// //capitalisation of name - function

// const capitalisation = function (name) {
//   const nameLower = name.toLowerCase();
//   const names = nameLower.split(' ');
//   const finalName = [];
//   for (const n of names) {
//     //finalName.push(n[0].toUpperCase() + n.slice(1));
//     finalName.push(n.replace(n[0], n[0].toUpperCase()));
//   }
//   console.log(finalName.join(' '));
// };

// capitalisation('SAba KAuser');
// capitalisation('DaEnerys stoMborn');

// // padding

// const msg = 'Saba';
// console.log(msg.padStart(15, '*'));
// console.log('Test'.padStart(10, '/'));

// console.log(msg.padEnd(30, '*'));
// console.log(msg.padStart(5, '-').padEnd(15, '^'));

// //masking credit card numbers with the help of padding

// const maskCredit = function (number) {
//   const no = String(number); // convert number to string
//   const lastFourDigits = no.slice(-4).padStart(no.length, '*');
//   console.log(lastFourDigits);
// };

// maskCredit(12345678);
// maskCredit(11110000000);

// //REPEAT

// const message = 'Due to covid ,all stores are closed...';
// console.log(message.repeat(3));

// const planesInLine = function (n) {
//   console.log(`there are ${n} planes in line ${'✈'.repeat(n)}`);
// };

// planesInLine(7);
// planesInLine(1);
// working with string part 2

// to lower case and to upper case
// const plane = 'TAP air India';

// console.log(plane.toLowerCase());
// console.log(plane.toUpperCase());
// console.log('Saba'.toUpperCase());

// // fixing capitalisation in name - UPPER AND LOWER CASE

// const passenger = 'SaBa KaUsEr';

// const passToLower = passenger.toLocaleLowerCase();
// const finalPassenger = passToLower[0].toUpperCase() + passToLower.slice(1);
// console.log(finalPassenger);

// // comparing emails - TRIM

// const actualEmail = 'sabakauser411@gmail.com';
// const enteredEmail = ' SABaKauser411@GmaIL.cOM\n';

// const normaliseEnteredEmail = enteredEmail.toLocaleLowerCase().trim(); // CHAINING - converting to lower case and trimming extra spaces
// console.log(normaliseEnteredEmail);

// console.log(actualEmail === normaliseEnteredEmail);

// // REPLACE STRING -- replacing the currency

// const britainPounds = '200,89E';
// const usDollars = britainPounds.replace('E', '$').replace(',', '.'); // chaining
// console.log(usDollars);

// const flightAnnounce =
//   ' All the passengers boarding to B322 please proceed to door no 4 , and towards the door B';
// console.log(flightAnnounce.replaceAll('door', 'gate'));

// const airplane = 'Airbus A320neo';
// console.log(airplane.includes('Air'));
// console.log(airplane.includes('A50'));
// console.log(airplane.startsWith('Air'));
// console.log(airplane.startsWith('A320'));

// if (airplane.startsWith('Airbus') && airplane.endsWith('neo')) {
//   console.log(`The new airplane belongs to the airbus family`);
// }

////////////////////////////////////////////////////////////
// const plane = 'TAP air India';

// console.log(plane[0]);
// console.log(plane.length);

// console.log('APPLE'[2]);
// console.log('APPLE'.length);

// //slicing of string

// console.log(plane.slice(4));
// console.log(plane.slice(4, 7));

// // to display the first word of the string without knowing the string

// console.log(plane.slice(0, plane.indexOf(' ')));
// console.log(plane.slice(plane.lastIndexOf(' ') + 1));

// //negative slicing

// console.log(plane.slice(-2)); // displays IA from india - starts slicing from the end
// console.log(plane.slice(1, -1)); // displays AP air indi - slices from first postition
// console.log(plane[1]);

// // example function to display if the passanger got a middle seat
// const passengerSeat = function (seatNo) {
//   //console.log(seatNo.slice(-1));
//   const s = seatNo.slice(-1);
//   if (s === 'B' || s === 'E') {
//     console.log('you got the middle seat :(');
//   } else {
//     console.log('Yay you get the window or aisle seat');
//   }
// };

// passengerSeat('11A'); // boxes the string to an objects
// passengerSeat('17C');
// passengerSeat('19B');
// passengerSeat('10E');

// CODING CHALLENGE 3

// const gameEvents = new Map([
//   [17, '⚽️ GOAL'],
//   [36, '🔁 Substitution'],
//   [47, '⚽️ GOAL'],
//   [61, '🔁 Substitution'],
//   [64, '🔶 Yellow card'],
//   [69, '🔴 Red card'],
//   [70, '🔁 Substitution'],
//   [72, '🔁 Substitution'],
//   [76, '⚽️ GOAL'],
//   [80, '⚽️ GOAL'],
//   [92, '🔶 Yellow card'],
// ]);

// const events = [...new Set(gameEvents.values())];
// console.log(events);

// gameEvents.delete(64);
// console.log(gameEvents);
// const sizeOfMap = gameEvents.size;
// console.log(`An event happened, on average , every ${90 / sizeOfMap} minutes`);

// const mapValues = [...gameEvents]; // converting map to an array
// console.log(mapValues);
// for (const [min, event] of mapValues) {
//   // destructuring array and looping key and value
//   if (min > 47) {
//     // comparing key value
//     console.log(`[second half] ${min} :${event}`); // display key value with ${a} and displaying value of map by passing the key to map ${gameevents.get(a)}
//   } else {
//     console.log(`[first half] ${min} :${event}`);
//   }
// }
// console.log(gameEvents.size());

//MAP ITERATIONS

// const quiz = new Map([
//   ['question', 'what is my fav color?'],
//   [1, 'Black'],
//   [2, 'white'],
//   [3, 'Purple'],
//   [4, 'blue'],
//   ['correct', 3],
//   [true, 'correct :)'],
//   [false, 'not correct :('],
// ]);

// console.log(quiz);

// //convert object to map
// const hoursMap = new Map(Object.entries(openingHours));
// console.log(hoursMap);

// //iterating over maps (key value pair)
// console.log(quiz.get('question'));
// for (const [key, value] of quiz) {
//   if (typeof key === 'number') console.log(`Answer ${key}:${value}`);
// }

// const answer = Number(prompt('what is the answer?'));
// console.log(answer);

// console.log(quiz.get(quiz.get('correct') === answer));

//------CODING CHALLENGE 2--------------------//
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};
// 1 --------------------
// console.log(game.scored);
// const gScored = [...game.scored];
// for (const [i, name] of game.scored.entries()) {
//   console.log(`Goal ${i + 1}: ${name}`);
// }

// // 2--------------------
// //correct result
// const val = Object.values(game.odds);
// console.log(val);
// let sum = 0;
// for (const i of val) {
//   sum = sum + i;
// }
// const avg = `${sum}` / `${val.length}`;
// console.log(`The average of odds is ${avg}`);
// //OR
// // console.log(`${val[0] + val[1] + val[2]}`);
// // const avg = (val[0] + val[1] + val[2]) / 3;
// // console.log(`The average of odds is ${Math.trunc(avg)}`);

// //3---------------------

// for (let [team, v] of Object.entries(game.odds)) {
//   const teamStr = team == 'x' ? 'draw' : `victory ${game[team]}`;
//   console.log(`Odd of victory ${teamStr} : ${v}`);
// }
// ****************************************************************************************************/
//LOOPING OBJECTS

// on property values

// for (const day of Object.keys(openingHours)) {
//   console.log(day);
// }

// //or

// const propertyKeys = Object.keys(openingHours);
// console.log(propertyKeys);
// let objString = `We are open on ${propertyKeys.length} days:`;
// for (const days of propertyKeys) {
//   objString = objString + `${days} `;
// }
// console.log(objString);

// //property value

// const objValues = Object.values(openingHours);
// console.log(objValues);

// //entire object

// const entireObj = Object.entries(openingHours);
// console.log(entireObj);

// for (const [day, { open, close }] of entireObj) {
//   console.log(`on ${day} we open at ${open} and close at ${close}`);
//} // the opening hour object has three arrays - first is the day name and second has the object open and close hours - here we are destructuring the object inside the array
//********************************************************************************************************/
// OPTIONAL CHAINING

// console.log(openingHours.mon?.open); // checks if the property of the object is present and prevents errors and displays if exists
// const daysOfWeek = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
// for (const day of daysOfWeek) {
//   console.log(day);
//   const open = openingHours[day]?.open ?? 'closed'; // using null coalescing operator to check for null or undefined values and display closed instead
//   console.log(`On ${day} the restaurant opens at ${open}`);
// }

// // for methods

// console.log(restaurant.order?.(0, 1) ?? 'method does not exist');
// console.log(restaurant.orderDrinks?.(0, 1) ?? 'method does not exist');
// //for Arrays

// const users = [{ name: 'saba', mail: 'sabak@gmail.com' }]; // users array with object properties as elements
// console.log(users[0]?.name ?? 'array element does not exist');
// console.log(users[2]?.name ?? 'array element does not exist');
//*******************************************************************************************************/
// OBJECT Literal - 3 ways

// can call one object that is outside the object in which its being called - refer opening hours object above
//can change method names to direct property names by removing function - refer orderPizza  function
// can change property names or be called from an external value - refer days of week from opening hours object
//*******************************************************************************************************/
// for -of looping

// const finalMenu = [...restaurant.mainMenu, ...restaurant.starterMenu];
// // for (const item of finalMenu) {
// //   console.log(item);
// // }

// for (let item of finalMenu.entries()) {
//   // returns the key value pair , that is index and its value
//   console.log(item);
// }

// //OR we can also destructure an array
// for (let [index, name] of finalMenu.entries()) {
//   console.log(`${index + 1}:${name}`); // since array begins from 0 we are adding 1 and displaying as a table
// }
//***********************************/

//coding challenge #1
// const [player1, player2] = game.players; // destructuring of an array
// console.log(player1, player2);

// const [gk, ...fieldPlayers] = player1;
// console.log(gk, fieldPlayers);

// const allPlayers = [...player1, ...player2];
// console.log(allPlayers);

// const players1Final = [...player1, 'Thiago', 'cuthino', 'perisic'];
// console.log(players1Final);

// const { team1, x: draw, team2 } = { ...game.odds }; // object renaming
// console.log(team1, draw, team2);

// const printGoals = function (...players) {
//   console.log(players);
//   console.log(`${players.length} goals were scored`);
// };

// printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
// printGoals(...game.scored);
// team1 < team2 && console.log('Team 1 is more likely to win');
// team1 > team2 && console.log('Team 2 is more likely to win');

//SHORTCIRCUITING (&& and ||)
// returns the first operant if it is a truthy value else checks for next and returns that

// console.log('----or operator-----');
// console.log(3 || 'Saba');
// console.log('' || 'Saba');
// console.log(undefined || 3);
// console.log(0 || null);

// console.log(undefined || null || '' || 0 || 'Hello world');

// const checkGuests = restaurant.numGuests ? restaurant.numGuests : 10;
// console.log(checkGuests);

// //checking above cond with shortcircuiting
// // restaurant.numGuests = 50;//if we add the property
// const guests = restaurant.numGuests || 10;
// console.log(guests);

// console.log('-----AND operator-------');

// console.log(0 && 'Saba');
// // op- 0 as it returns first falsy value
// console.log('Hello' && 23 && undefined && 0 && null);
// // op - undefined as it is first falsy value

// // if (restaurant.orderPizza) {
// //   restaurant.orderPizza('mushroom', 'spinach');
// // }

// console.log(restaurant.orderPizza && 0);
// console.log(
//   restaurant.orderPizza && restaurant.orderPizza('cheese', 'cabbage')
// );
//**************************************************************/

//Rest pattern and parameters

// opposite of spread - on the left side of the ass operator

// const [a, b, ...others] = [1, 2, 3, 4, 5];
// console.log(a, b, others);

// // on both sides
// // rest should always be last one in array
// const [Pizza, , Risotto, ...otherFood] = [
//   ...restaurant.mainMenu,
//   ...restaurant.starterMenu,
// ]; // skips middle element // rest on left // spread on right
// console.log(Pizza, Risotto, otherFood);

// //Object
// const { sat, ...weekdays } = restaurant.openingHours;
// console.log(weekdays);

// //functions

// const add = function (...numbers) {
//   console.log(numbers);
//   let sum = 0;
//   for (let i = 0; i < numbers.length; i++) {
//     sum = sum + numbers[i];
//   }
//   console.log(`The sum of the numbers is ${sum}`);
// };

// add(2, 9);
// add(1, 3, 4, 5);
// add(1, 3, 5, 6, 5, 5);

// //or

// const x = [3, 4, 9];
// add(...x); // using spread operator to pass the array and unpack into the add function
//****************************************************************
// Spread Operator

// const arr = [1, 2, 3];
// const newArr = [3, 4, ...arr];
// console.log(newArr);

// const newMenu = [...restaurant.mainMenu, 'Brocolli'];
// console.log(newMenu);

// //copy of an array
// const mainMenuCopy = [...restaurant.mainMenu];

// //join 2 arrays
// const finalMenu = [...mainMenuCopy, ...restaurant.starterMenu];
// console.log(finalMenu);

// const str = 'saba';
// console.log(...str);

// on functions
// const inputToPasta = [
//   prompt("Let's make pasta , enter your first ingrediant ?"),
//   prompt(' second ingrediant'),
//   prompt('finally , third ingrediant ?'),
// ];

// console.log(inputToPasta);

//restaurant.OrderPasta(...inputToPasta);

// on objects

// const newRestarant = { foundedBy: 'Saba', ...restaurant, FoundedIn: 1997 };

// console.log(newRestarant);

// const restaurantCopy = { ...restaurant };
// restaurantCopy.name = 'Sona';
// console.log(restaurantCopy.name);
// console.log(restaurant.name);
//************************************************ */
// //OBJECT DESTRUCTURING
// const { name, starterMenu, openingHours } = restaurant;
// console.log(name, starterMenu, openingHours);

// // renaming properties of an object
// const { name: newName, starterMenu: menu } = restaurant;
// console.log(newName, menu);

// //default values
// const { mu = [], starterMenu: starter = [] } = restaurant;
// console.log(mu, starter);

// //Nested objects

// const {
//   fri: { open: o, close: c },
// } = openingHours;
// console.log(o, c);
// //*********************************************************
// // ARRAY DESTRUCTURING
// const arr = [4, 6, 8];
// const [a, b, c] = arr;
// console.log(a, b, c);

// let [first, second] = restaurant.categories;
// console.log(first, second);

// //omitting values in an array
// const [firstValue, , thirdValue] = restaurant.starterMenu;
// console.log(firstValue, thirdValue);

// //switching the values
// // const temp = first;
// // first = second;
// // second = temp;
// // console.log(first, second);

// //OR

// //another way of switching values
// [first, second] = [second, first];
// console.log(first, second);

// //return values from a function (array) and destructure it
// const [x, y] = restaurant.test(0, 1);
// console.log(x, y);

// //nested array destructuring
// const arrNew = [3, 4, [8, 9]];
// const [cat, dog, rat] = arrNew;
// console.log(cat, dog, rat);

// const [i, o, [p, q]] = arrNew;
// console.log(i, o, p, q);

// //default arrays for small ones
// const newArr = [2, 8];
// const [m, n, u] = newArr; // will display undefined
// console.log(m, n, u);

// const [l = 1, k = 1, f = 1] = newArr; // will display undefined
// console.log(l, k, f);
