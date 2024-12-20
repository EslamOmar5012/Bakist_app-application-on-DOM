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
const page_links = document.querySelector('.nav__links');
const nav_links = document.querySelectorAll('.nav__link');
const tabbed_btns = document
  .querySelector('.operations__tab-container')
  .querySelectorAll('button');
const nav_elements = page_links.querySelectorAll('.nav__item');
const allSections = document.querySelectorAll('.section');
const allImages = document.querySelectorAll('[data-src]');

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

//TODO implement smooth scroll
btnScrollTo.addEventListener('click', e => {
  section1.scrollIntoView({ behavior: 'smooth' });
});

//TODO implement page navigation with smooth scroll

//old way not good
// nav_links.forEach(link => {
//   link.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = link.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

//new way with Event Delegation
page_links.addEventListener('click', e => {
  e.preventDefault();
  if (e.target.className === 'nav__link') {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//TODO implement tabbed component
tabbed_btns.forEach(btn => {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    for (const el of tabbed_btns) {
      if (el === btn) {
        el.classList.add('operations__tab--active');
        document
          .querySelector(`.operations__content--${el.dataset.tab}`)
          .classList.add('operations__content--active');
      } else {
        el.classList.remove('operations__tab--active');
        document
          .querySelector(`.operations__content--${el.dataset.tab}`)
          .classList.remove('operations__content--active');
      }
    }
  });
});

//TODO implement nav links
nav_elements.forEach(element => {
  element.addEventListener('mouseover', function (e) {
    e.preventDefault();
    for (const el of nav_elements) {
      if (el === e.target.parentElement) {
        el.style.opacity = '1';
      } else {
        el.style.opacity = '0.5';
      }
    }
  });
  element.addEventListener('mouseout', function (e) {
    e.preventDefault();
    for (const el of nav_elements) {
      el.style.opacity = '1';
    }
  });
});

//TODO implement sticky navbar
const observer = new IntersectionObserver(
  (entries, observers) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting)
        document.querySelector('.nav').classList.add('sticky');
      else document.querySelector('.nav').classList.remove('sticky');
    });
  },
  {
    root: null,
    threshold: 0,
    rootMargin: '-' + getComputedStyle(document.querySelector('.nav')).height,
  }
).observe(header);

//TODO revealing elements on scrolling
const elemObs = new IntersectionObserver(
  (entries, observers) => {
    entries.forEach(entry => {
      if (entry.isIntersecting)
        entry.target.classList.remove('section--hidden');
      else return;
      //console.log(entry);
      observers.unobserve(entry.target);
    });
  },
  {
    root: null,
    threshold: 0.1,
  }
);

allSections.forEach(section => {
  elemObs.observe(section);
  section.classList.add('section--hidden');
});

//TODO implement lazy loading images
const imagesObs = new IntersectionObserver(
  function (entries, observers) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        console.log(entry);
        entry.target.src = entry.target.dataset.src;
        entry.target.addEventListener('load', function () {
          this.classList.remove('lazy-img');
        });
        observers.unobserve(entry.target);
      }
    });
  },
  {
    root: null,
    threshold: 1,
  }
);

allImages.forEach(image => imagesObs.observe(image));

//TODO slider component
const slides = document.querySelectorAll('.slide');
const btn_left = document.querySelector('.slider__btn--left');
const btn_right = document.querySelector('.slider__btn--right');

const goToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${(i - slide) * 100}%)`;
  });
};

goToSlide(0);

let currSlide = 0;
let maxSlide = slides.length - 1;
//go to next slide

const nextSlide = () => {
  if (currSlide < maxSlide) currSlide++;
  else currSlide = 0;

  goToSlide(currSlide);
};

btn_right.addEventListener('click', nextSlide);

const prevSlide = () => {
  if (currSlide === 0) currSlide = maxSlide;
  else currSlide--;

  goToSlide(currSlide);
};

btn_left.addEventListener('click', prevSlide);

document.addEventListener('keydown', e => {
  if (e.key === 'e') nextSlide(currSlide);
  else if (e.key === 'q') prevSlide(currSlide);
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

// //example of get and set attributes in DOM
// console.log(document.querySelector('.nav__link').href); //it will get the absolute value of the attribute
// console.log(document.querySelector('.nav__link').getAttribute('href')); //it will get the relative value of the attribute

// document
//   .querySelector('.nav__links')
//   .setAttribute('data-version-number', '3.0');

// console.log(document.querySelector('.nav__links').dataset.versionNumber);

// //example of styles in DOM
// message.classList.add('Eslam');
// message.classList.remove('Eslam');
// message.classList.toggle('Eslam');
// console.log(message.classList.contains('Eslam'));
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// //example of Event Propagation

// function getRandomColor() {
//   return `rgb(${Math.trunc(Math.random() * 256)}, ${Math.trunc(
//     Math.random() * 256
//   )}, ${Math.trunc(Math.random() * 256)})`;
// }

// document.querySelector('.nav').addEventListener('click', function (e) {
//   e.preventDefault();
//   console.log(e.target); //target refers to the source where the event is created
//   console.log(e.currentTarget); // current target refers to the the actual target where the event listener is in it
//   this.style.backgroundColor = getRandomColor();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   e.preventDefault();
//   console.log(e.target); //target refers to the source where the event is created
//   console.log(e.currentTarget); // current target refers to the the actual target where the event listener is in it
//   this.style.backgroundColor = getRandomColor();
// });

// document.querySelector('.nav__item').addEventListener('click', function (e) {
//   e.preventDefault();
//   console.log(e.target); //target refers to the source where the event is created
//   console.log(e.currentTarget); // current target refers to the the actual target where the event listener is in it
//   this.style.backgroundColor = getRandomColor();
// });
