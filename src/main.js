const iconMenu = document.querySelector(".icon-menu");
const navLinks = document.querySelector(".nav-links");
const iconMoon = document.querySelector(".icon-moon");
const captiveTitle = document.querySelector(".captive-title");

iconMenu.addEventListener("click", (e) => {
  const currentValue = e.target.getAttribute("name");
  const newValue = currentValue === "menu" ? "close" : "menu";
  e.target.setAttribute("name", newValue);

  if (newValue == "close") {
    navLinks.classList.remove("hidden");
    navLinks.classList.add("block");
  } else {
    navLinks.classList.add("hidden");
    navLinks.classList.remove("block");
  }
});

iconMoon.addEventListener("click", (e) => {
  const currentValue = e.target.getAttribute("name");
  const newValue = currentValue === "moon" ? "sunny" : "moon";
  e.target.setAttribute("name", newValue);

  // if(newValue == 'close') {
  //   navLinks.classList.remove('hidden');
  //   navLinks.classList.add('block');
  // }else{
  //   navLinks.classList.add('hidden');
  //   navLinks.classList.remove('block');
  // }
});

function titleToSpan(someTextToSpan) {
  const tab = someTextToSpan.textContent.trim().split("");
  const tabWithSpan = [tab.length];
  for (let i = 0; i < tab.length; i++) {
    if (tab[i] === " ") {
      tabWithSpan[i] = `<span>&nbsp;</span>`;
    } else {
      tabWithSpan[i] = `<span>${tab[i]}</span>`;
    }
  }
  someTextToSpan.innerHTML = tabWithSpan.join("");
}
titleToSpan(captiveTitle);

// vars to GSAP
const spanCaptiveTitle = document.querySelectorAll(".captive-title span");
const weHelpYouTo = document.querySelector(".we-help-you-to");
const emoji1 = document.querySelectorAll(".emoji-1");
const emoji2 = document.querySelectorAll(".emoji-2");
const emoji3 = document.querySelectorAll(".emoji-3");
const zignnnBtn = document.querySelector(".zignnn-btn");

document.addEventListener("DOMContentLoaded", () => {
  gsap.fromTo(
    spanCaptiveTitle,
    {
      autoAlpha: 0,
      display: "inline-block",
    },
    {
      autoAlpha: 1,
      duration: 1,
      repeat: -1,
      repeatDelay: 5,
      stagger: 0.05,
      display: "inline-block",
    }
  );

  // gsap.from(
  //   spanCaptiveTitle,
  //   {
  //   opacity: 0.7,
  //   duration: 2,
  //   repeat: -1,
  //   delay: 5,
  //   repeatDelay: 2,
  //   display: "inline-block",
  // });

  gsap.to(weHelpYouTo, {
    x: 10,
    skew: 1.1,
    duration: 1,
    delay: 1.2,
  });

  gsap.to(weHelpYouTo, {
    x: 0,
    skew: 1,
    duration: 1,
    delay: 2,
  });
});

zignnnBtn.addEventListener('mouseover', () => {
  gsap.to(
    emoji1,
    {
      visibility : "visible",
      scale: 4,
      duration: 2,
      x: 350,
      y: -50,
      rotation: 360,
      opacity: 0,
      display: "inline-block",
    }
  );
  gsap.to(
    emoji2,
    {
      visibility : "visible",
      scale: 4,
      duration: 2,
      x: 400,
      rotation: 360,
      opacity: 0,
      display: "inline-block",
    }
  );
  gsap.to(
    emoji3,
    {
      visibility : "visible",
      scale: 4,
      duration: 2,
      x: 310,
      y: 50,
      rotation: 360,
      opacity: 0,
      display: "inline-block",
    }
  );
});

zignnnBtn.addEventListener('mouseleave', () => {
  gsap.to(
    emoji1,
    {
      visibility : "hidden",
      scale: 0,
      x: 0,
      y: 0,
      opacity: 1,
      duration: 1,
    }
  );
  gsap.to(
    emoji2,
    {
      visibility : "hidden",
      scale: 0,
      x: 0,
      y: 0,
      opacity: 1,
      duration: 1,
    }
  );
  gsap.to(
    emoji3,
    {
      visibility : "hidden",
      scale: 0,
      x: 0,
      y: 0,
      opacity: 1,
      duration: 1,
      // rotation: 360,
      // duration: 0.1,
      // display: "inline-block",
    }
  );
})

gsap.registerPlugin(ScrollTrigger);

// let tl = gsap.timeline({
//   scrollTrigger: {

let tl = gsap.timeline();
tl.to(
  ".domain", {
  scrollTrigger: {
    trigger: '.expertise-domains',
    pin: true, // pin the trigger element while active
    start: 'center center', // when the top of the trigger hits the top of the viewport
    // end: '+=2000', // end after scrolling 500px beyond the start
    scrub: 2,
  },
  x: -1910,
});

// tl.to(
//   "header-nav", {
//   scrollTrigger: {
//     trigger: '.expertise-domains',
//     pin: true, // pin the trigger element while active
//     start: 'top top', // when the top of the trigger hits the top of the viewport
//     end: '+=2000', // end after scrolling 500px beyond the start
//     scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
//   }, 
// });
