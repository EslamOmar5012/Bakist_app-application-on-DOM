'use strict';

///////////////////////////////////////
// Modal window
const header = document.querySelector('header');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//TODO implement smoothe scroll
btnScrollTo.addEventListener('click', e => {
  section1.scrollIntoView({ behavior: 'smooth' });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////

//LECTURES

// //examples of selecting elements
// console.log(document.querySelector('.nav__links'));
// console.log(document.querySelector('#section--1'));
// console.log(document.querySelector('img')); //it will select the first image
// console.log(document.querySelectorAll('img')); //it will return the NODE list

// console.log(document.getElementsByTagName('div')); //it will return html collection
// console.log(document.getElementById('section--1'));
// console.log(document.getElementsByClassName('nav__links'));

//examples of creating elements I  put it in the main code
const message = document.createElement('div');
message.classList.add('cookie-message');

message.innerHTML =
  'We use cokkies for improved functionality and analytics. <button class = "btn btn--close-cookie">Got It!</button>';

//header.append(message); // to add the element at the end of parent element
header.prepend(message); // to add the element at the top of parent element

// //second way of creating element
// const html = `<div class = 'cookie-message'>We use cokkies for improved functionality and analytics. <button class = "btn btn--close-cookie">Got It!</button></div>`;

// header.insertAdjacentHTML('afterbegin', html);

// //example of deleting element
message.querySelector('button').addEventListener('click', function (e) {
  e.preventDefault();
  message.remove(); //first option --> modern one
  //message.parentElement.removeChild(); //second option --> old one
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//example of styles in DOM
message.style.backgroundColor = '#37383d'; // it will be in the indline style of html element and it will not be in the css fil
console.log(message.style.width); //you can't get the element in css style file

//example of edeting on styles in css style file

message.style.width =
  Number.parseFloat(getComputedStyle(message).width) + 60 + 'px';

// console.log(message.style.width, getComputedStyle(message).width);

// //example of edeting the variables in js
// document.documentElement.style.setProperty('--color-primary', 'orangered');

//example of get and set attributes in DOM
console.log(document.querySelector('.nav__link').href); //it will get the absolute value of the attribute
console.log(document.querySelector('.nav__link').getAttribute('href')); //it will get the relative value of the attribute

document
  .querySelector('.nav__links')
  .setAttribute('data-version-number', '3.0');

console.log(document.querySelector('.nav__links').dataset.versionNumber);

//example of styles in DOM
message.classList.add('Eslam');
message.classList.remove('Eslam');
message.classList.toggle('Eslam');
console.log(message.classList.contains('Eslam'));
