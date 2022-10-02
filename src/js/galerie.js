
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(Flip);
gsap.registerPlugin(ScrollTrigger);





  // DOM elements
const frame = {
	menu: document.querySelector('.button-menu'),
	logo: document.querySelector('.logo'),
};

menuOverlay = document.querySelector('.menu_overlay');

frame.menu.addEventListener('click', function(){
	if (menuOverlay.classList.contains('active')) {
		menuOverlay.classList.remove('active')
	}else{
		menuOverlay.classList.add('active')
	}
})  

//GALERIE

// Variables
const activeClass = "is-active";
const cards = document.querySelectorAll("[data-card]");

const updateCard = (card, idx, active) => {
  const cardInner = card.querySelector(".card__inner");
  const image = card.querySelector(".card__image");

  // Bail out if we're in the middle of a flip
  if (Flip.isFlipping(cardInner)) return;

  const cardState = Flip.getState(cardInner, {
    props: "box-shadow, border-radius" });

  const imageState = Flip.getState(image);
  card.classList.toggle(activeClass, active);

  const duration = active ? 0.7 : 0.5;
  const ease = "quint.out";

  const cardContent = document.querySelectorAll(".content__group")[idx];
  gsap.killTweensOf(cardContent);

//   gsap.to(cardContent, {
//     duration: active ? 1 : 0.2,
//     ease: "expo.out",
//     stagger: 0.1,
//     alpha: active ? 1 : 0,
//     y: active ? 0 : 20,
//     delay: active ? 0.4 : 0 });


  Flip.from(cardState, {
    duration: duration,
    ease: ease,
    absolute: true,
    zIndex: 1 });


  Flip.from(imageState, {
    duration: duration,
    absolute: true,
    ease: ease,
    simple: true });


};

// Init
cards.forEach((card, idx) => {
  updateCard(card, idx, false);
  card.addEventListener("click", evt => {
    updateCard(card, idx, !card.classList.contains(activeClass));
  });
});
