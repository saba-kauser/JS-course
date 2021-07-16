'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//display movements
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = ''; // empty the container before loading with new array

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach(function (mov, i) {
    const depOrWithdrew = mov > 0 ? 'deposit' : 'withdrawal'; //to check if it is a deposit or withdrawal
    const movementsHtml = `
    <div class="movements__row">
    <div class="movements__type movements__type--${depOrWithdrew}">${
      i + 1
    } ${depOrWithdrew}</div>
    <div class="movements__value">${mov} EUR</div>
  </div>`;

    // printing the html values

    containerMovements.insertAdjacentHTML('afterbegin', movementsHtml); // filling the html container with the new values
  });
};

// displayMovements(account1.movements);

//display balance
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, value, i, arr) => acc + value, 0);
  labelBalance.textContent = `${acc.balance} EUR`;
};

// calcDisplayBalance(account1.movements);

//display summary
const calcDisplaySummary = function (acc) {
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = `${income} EUR`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumOut.textContent = `${Math.abs(out)} EUR`; // removing negative sign

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(intfilter => intfilter >= 1)
    .reduce((acc, inter) => acc + inter, 0);

  labelSumInterest.textContent = `${interest} EUR`;
};

// calcDisplaySummary(account1.movements);

//creating new property called username from owner
const transformUser = function (accs) {
  accs.forEach(function (userId) {
    // using the array to get each object inside of it
    userId.Username = userId.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  }); // adding new property to the object
};

transformUser(accounts);

const updateUI = function (acc) {
  displayMovements(currentAccount.movements);
  //display balance
  calcDisplayBalance(currentAccount);
  //display summary
  calcDisplaySummary(currentAccount);
  // console.log('LOGIN');
};
//implementing LOGIN

let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.Username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UI
    labelWelcome.textContent = `Welcome back , ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    //clear the input fields
    inputLoginPin.value = inputLoginUsername.value = '';
    //lose focus of cursor from pin field
    inputLoginPin.blur();
    //Diplsay movements

    //updateUI
    updateUI(currentAccount);
  }
});

//Transfer amount

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.Username === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc.Username !== currentAccount.Username
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);
  const loanGrant = currentAccount.movements.some(mov => mov >= amount * 0.1); // ten percent of the amount
  if (loanGrant && amount > 0) {
    currentAccount.movements.push(amount); // add the loan amount to the array

    //update UI
    updateUI(currentAccount);
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.Username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.Username === currentAccount.Username
    );
    console.log(index);
    //delete account
    accounts.splice(index, 1);

    //hide UI
    containerApp.style.opacity = 0;
  }
  //empty fields
  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const dogsJulia = [3, 5, 2, 12, 7];
// const dogsKate = [4, 1, 15, 8, 3];

// const checkDogs = function (arr1, arr2) {
//   const copyOfjulia = arr1.slice();
//   copyOfjulia.splice(0, 1);
//   copyOfjulia.splice(-2);

//   const finalConcatenated = copyOfjulia.concat(arr2);

//   console.log(finalConcatenated);
//   finalConcatenated.forEach(function (dogsAge, i) {
//     if (dogsAge >= 3) {
//       console.log(
//         `Dog number ${i + 1} is an adult, and is ${dogsAge} years old`
//       );
//     } else {
//       console.log(`Dog number ${i + 1} is still a puppy 🐶`);
//     }
//   });
// };

// checkDogs(dogsJulia, dogsKate);
// checkDogs([9, 16, 6, 8, 3, 10, 5, 6, 1, 4]);

// Coding Challenge #2

// Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

// Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

// 1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
// 2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
// 3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
// 4. Run the function for both test datasets

// TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
// TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

// GOOD LUCK 😀
/////////////////////////////////////////////////////////////////////////

// const val = 2;

// const calcAverageHumanAge = function (agesofDogs) {
//   const humanAges = agesofDogs
//     .map(val => (val <= 2 ? 2 * val : 16 + val * 4))
//     .filter(val => (val > 18 ? val : null));

//   console.log(humanAges);

//   // const avg = humanAges.reduce((acc, val) => acc + val, 0) / humanAges.length; //or
//   const avg = humanAges.reduce((acc, val, i, arr) => acc + val / arr.length, 0);

//   return avg;
// };

// const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
// console.log(avg1, avg2);
/////////////////////////////////////////////////
/////////////////////////////////////////////////

// Coding Challenge #2

// const calcAverageHumanAge = ages =>
//   ages
//     .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
//     .filter(age => age >= 18)
//     .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

// const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
// console.log(avg1, avg2);
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

//const arr = ['a', 'b', 'c', 'd', 'e', 'f'];

//1 - SLICE--------------

// console.log(arr.slice(3)); //op- def
// console.log(arr.slice(3, 4)); //op -d // displays first element as 4th(3+1) element and does not display elemets after 4th index

// //negative slicing

// console.log(arr.slice(-2)); // displays last two elements of the arraycl
// console.log(arr.slice(1, -3)); // first element as 2nd element of the array and does not display last three elements of array

// // creating shallow copy of an array using slice
// console.log(arr.slice());

// //2- SPLICE - changes the original array-------------

// // console.log(arr.splice(2)); // op= cdef -- original array will be left with - [a,b]
// // console.log(arr); //op=[a,b]

// console.log(arr);
// console.log(arr.splice(1, 2));
// console.log(arr);

// //3-REVERSE - mutates array

// const arr1 = ['z', 'y', 'x', 'w'];
// console.log(arr1.reverse());

// //4- CONCAT - concatenate two arrays

// const letters = arr.concat(arr1);
// console.log(letters);

// //5- JOIN

// console.log(letters.join('*'));

//FOR EACH LOOP

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// //first looping using for OF

// for (const [i, val] of movements.entries()) {
//   if (val > 0) {
//     console.log(`Movement ${i + 1}: You deposited ${val} rupees`);
//   } else {
//     console.log(`Movement ${i + 1}: You withdrew ${Math.abs(val)} rupees`);
//   }
// }

// // implementing the same using FOR EACH

// console.log(`-----for EACH------`);
// movements.forEach(function (val, i, arr) {
//   if (val > 0) {
//     console.log(`Movement ${i + 1}:You deposited ${val} rupees`);
//   } else {
//     console.log(`Movement ${i + 1}:You withdrew ${Math.abs(val)} rupees`);
//   }
// });

//forEach on Map and sets

//MAP
// const currencies = new Map([
//   ['USD', 'United States dollar'], // its an array of key and value pair
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function (val, key, map) {
//   console.log(`${key}:${val}`);
// });

// //SET

// const currenciesForSet = new Set([`USD`, 'EUR', 'RUP', 'POU', 'EUR', 'EUR']);
// console.log(currenciesForSet); // displays unique values

// currenciesForSet.forEach(function (currentValue, keys, set) {
//   console.log(`${keys}:${currentValue}`);
// });

//MAP method

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const USD = 1.1;
// const mappedArray = movements.map(function (mov) {
//   return mov * USD;
// });

// console.log(mappedArray);

// //the above function can be written using an arrow function as well
// const newArrow = movements.map(mov => mov * USD);

// console.log(newArrow);

// const usingMap = movements.map(
//   (val, i) =>
//     `Movement ${i + 1}:You ${val > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
//       val
//     )} rupees`
// );
// console.log(usingMap);

//FILTER METHOD - same as map can also use (var, index and array)

// const deps = movements.filter(mov => mov > 0); // returns an array of only positive numbers from the movement array (using arrow function)

// console.log(movements);
// console.log(deps);

// const withdrawals = movements.filter(mov => mov < 0);
// console.log(withdrawals);

//REDUCE METHOD

// console.log(movements);

// const balanceOftransactions = movements.reduce(
//   (accum, curr, i, arr) => accum + curr,
//   0
// ); // the accumulator keeps on adding to the current value// second paramter is the initial value of the accumulator

// console.log(balanceOftransactions);

// //using reduce to display max value in the movements array

// const maxVal = movements.reduce(function (accr, curr) {
//   if (accr > curr) return accr;
//   else return curr;
// }, movements[0]);

// console.log(maxVal);

//chaining methods

// const USD = 1.1;
// const convertedDeposits = movements
//   .filter(mov => mov > 0)
//   .map(mov => mov * USD)
//   .reduce((acc, mov) => acc + mov, 0);

// console.log(convertedDeposits);

//find method

// console.log(accounts);

// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account); // returns the entire object that matches the condition

//SOME method

// const anyDeposits = movements.some(mov => mov > 0);
// console.log(anyDeposits);

// //EVERY method

// const posDeposits = account4.movements.every(mov => mov > 0);
// console.log(posDeposits);

// FLAT and FLAT map

//add all the movements in all accounts of the bankist app

// const overAllBalance = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(overAllBalance);

// //flat map
// const overAllBalance2 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(overAllBalance2);

//SORTING ARRAYS

//ascending order
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (a < b) return -1;
// });

// console.log(movements);

// //or
// movements.sort((a, b) => a - b);

// console.log(movements);

// //descending order
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (a < b) return 1;
// });

// console.log(movements);

// //or

// movements.sort((a, b) => b - a);

// console.log(movements);

//fill method

// const x = new Array(7);

// x.fill(1);
// console.log(x);

// x.fill(13, 3, 5);
// console.log(x);

// //Array From

// const z = Array.from({ length: 7 }, () => 1);
// console.log(z);

// const y = Array.from({ length: 7 }, (cur, i) => i + 1);
// console.log(y);

// //dice rolls for an array with size 100
// const diceRolls = Array.from(
//   { length: 100 },
//   (cur, i, arr) => Math.trunc(Math.random() * 6) + 1
// );
// console.log(diceRolls);

// //array from used for creating arrays from the dom elements
// labelBalance.addEventListener('click', function () {
//   const movemnetsUI = Array.from(
//     document.querySelectorAll('.movements__value'),
//     el => Number(el.textContent.replace('EUR', ''))
//   );
//   console.log(movemnetsUI);
// });

//more array methods --------------

//1. exercise 1 - adding all the deposits of the account array
// const bankDepositSum = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov > 0)
//   .reduce((acc, sum) => acc + sum, 0);
// console.log(bankDepositSum);

// //2. exercise 2 - How many number of deposist are in the bank with at least 1000 dollars

// // const numDepositsThousand = accounts
// //   .flatMap(acc => acc.movements)
// //   .filter(mov => mov >= 1000).length;
// // console.log(numDepositsThousand);

// //OR can be done using reduce
// const numDepositsThousand1 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);
// console.log(numDepositsThousand1);

// //here the the zero value keeps incrementing if the conditions suffices - and count value is returned
// //in this case zero is a counter

// //3. exercise 3 - create a new object by using reduce - (instead of a number or a array)
// //create an object with sum of dep and sum of withdrawals

// const sumTotal = accounts
//   .flatMap(acc => acc.movements)
//   .reduce(
//     (sums, cur) => {
//       // cur > 0 ? (sums.deposists += cur) : (sums.withdrawals += cur);

//       //or

//       sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
//       return sums;
//     },
//     { deposits: 0, withdrawals: 0 }
//   );

// console.log(sumTotal);

// //here sums is nothing but the acc and the object can be accessed using that

// //4. exercise 4 - convert a string to title case
// //Title case ==> ' this is a nice title' -> This Is a Nice Title

// const convertTitleCase = function (title) {
//   const capitalize = str => str[0].toUpperCase() + str.slice(1);
//   const expectations = [
//     'a',
//     'an',
//     'and',
//     'the',
//     'but',
//     'or',
//     'on',
//     'in',
//     'with',
//   ];

//   const titleCase = title
//     .toLowerCase()
//     .split(' ')
//     .map(word => (expectations.includes(word) ? word : capitalize(word)))
//     .join(' ');
//   return capitalize(titleCase);
// };

// console.log(convertTitleCase('this is a nice title'));
// console.log(convertTitleCase('this is a LONG title but not too long'));
// console.log(
//   convertTitleCase('and here is another long title but not too long')
// );

// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/

// /*
// const dogs = [
//   { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
//   { weight: 8, curFood: 200, owners: ['Matilda'] },
//   { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
//   { weight: 32, curFood: 340, owners: ['Michael'] },
// ];

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)

dogs.forEach(
  cur => (cur.recommendedFood = Math.trunc(cur.weight ** 0.75 * 28))
);
// console.log(cur.recommendedFood));

console.log(dogs);

// 2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓

const dogSarah = dogs.find(name => name.owners.includes('Sarah'));
console.log(dogSarah);
if (dogSarah.recommendedFood < dogSarah.curFood) {
  console.log('Eating too much');
} else {
  console.log('Eating too less');
}
// const account = accounts.find(acc => acc.owner === 'Jessica Davis');

// 3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').

// const eatResult = dogs.flatMap(function (cur, i, arr) {
//   if (cur.recommendedFood > cur.curFood) {
//     return cur.owners;
//   } else {
//     return '';
//   }
// });
// console.log(eatResult);

const ownersEatTooMuch = dogs
  .filter(function (cur, i, arr) {
    if (cur.recommendedFood < cur.curFood) {
      return cur.owners;
    }
  })
  .flatMap((cur, i) => cur.owners);
console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter(function (cur, i, arr) {
    if (cur.recommendedFood > cur.curFood) {
      return cur.owners;
    }
  })
  .flatMap((cur, i) => cur.owners);
console.log(ownersEatTooLittle);

// 4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"

const str1 = ownersEatTooMuch.join(' ', 'and').concat('s dogs Eat too Much !');
console.log(str1);

const str2 = ownersEatTooLittle
  .join(' ', 'and')
  .concat('s dogs Eat too Little !');
console.log(str2);

// 5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)

const anyDog = dogs.some(cur => cur.curFood === cur.recommendedFood);
console.log(anyDog);

// 6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
// HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

const okDog = cur =>
  cur.curFood > cur.recommendedFood * 0.9 &&
  cur.curFood < cur.recommendedFood * 1.1;
console.log(dogs.some(okDog));

// 7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)

const dogsWithOkay = dogs.filter(okDog);
console.log(dogsWithOkay);

// 8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

const newDogs = dogs.slice();
const sorting = newDogs.map(cur => cur.recommendedFood).sort();
console.log(sorting);

//or

const dogssorted = dogs
  .slice()
  .sort((a, b) => a.recommendedFood - b.recommendedFood);
console.log(dogssorted);
