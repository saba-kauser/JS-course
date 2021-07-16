'use strict';
// dom manipulation

// console.log(document.querySelector('.message').textContent);
// console.log((document.querySelector('.message').textContent = 'Yipeee!!'));

// console.log((document.querySelector('.number').textContent = 10));
// console.log((document.querySelector('.score').textContent = 18));

// console.log((document.querySelector('.guess').value = 4));

// **handling clicks**

let secretNumber = Math.trunc(Math.random() * 20 + 1); // trunc= truncates the decimal value ; 20+1 =- bcoz it will generate only frm 1 to 19
//document.querySelector('.guess').textContent = secretNumber;
let score = Number(document.querySelector('.score').textContent);
let highScore = Number(document.querySelector('.highscore').textContent);
//console.log(score);
//console.log(secretNumber);

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};
const a = function () {
  const guess = Number(document.querySelector('.guess').value);
  //console.log(guess, typeof guess);
  if (!guess) {
    //when there is no input
    displayMessage('🎃 No number');
  } else if (guess === secretNumber) {
    //document.querySelector('.message').textContent = ' Correct Number 🎉 ';
    displayMessage('Correct Number 🎉');
    // when player wins
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';

    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(
        guess > secretNumber
          ? ' The number is too High  '
          : 'The number is too low'
      );
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage(' You lost the game !!');
      document.querySelector('.score').textContent = 0;
    }
    // } else if (guess > secretNumber) {
    //   //when guess is too high
    //   if (score > 1) {
    //     document.querySelector('.message').textContent =
    //       ' The number is too High  ';
    //     score--;
    //     document.querySelector('.score').textContent = score;
    //   } else {
    //     document.querySelector('.message').textContent = ' You lost the game !!';
    //     document.querySelector('.score').textContent = 0;
    //   }
    // } else if (guess < secretNumber) {
    //   // when guess is too low
    //   if (score > 1) {
    //     document.querySelector('.message').textContent = 'The number is too low ';
    //     score--;
    //     document.querySelector('.score').textContent = score;
    //   } else {
    //     document.querySelector('.message').textContent = ' You lost the game !!';
    //     document.querySelector('.score').textContent = 0;
    //   }
  }
};

const reset = function () {
  secretNumber = Math.trunc(Math.random() * 20 + 1);
  //console.log(secretNumber);
  score = 20;
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.score').textContent = score;
  document.querySelector('.guess').value = '';
  document.querySelector('.number').textContent = '?';
  displayMessage('Start guessing...');
};
document.querySelector('.check').addEventListener('click', a);
document.querySelector('.again').addEventListener('click', reset);
