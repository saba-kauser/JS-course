'use strict';

const modal = document.querySelector('.modal'); // selecting class and storing in the variable
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');

const btnShowModal = document.querySelectorAll('.show-modal'); // select multiple elements using same class

//using one function for adding hidden class
const closeWindow = function () {
  modal.classList.add('hidden'); // dont use . here its not a selector just remover
  overlay.classList.add('hidden'); // add the hidden class style from css
};

const openWindow = function () {
  modal.classList.remove('hidden'); // dont use . here its not a selector just remover
  overlay.classList.remove('hidden'); // removing the hidden class style from css
};

for (let i = 0; i < btnShowModal.length; i++) {
  // adding event listener to each element for click action
  btnShowModal[i].addEventListener('click', openWindow);
  //enabling closing the window button
  btnCloseModal.addEventListener('click', closeWindow);
  //closing window by clicking anywhere on the
  overlay.addEventListener('click', closeWindow);
  document.addEventListener('keydown', function (eventName) {
    console.log(eventName.key);
    if (eventName.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeWindow();
    }
  });
}
