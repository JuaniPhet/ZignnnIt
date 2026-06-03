// Hamburger Menu
const navMenu = document.querySelector(".nav-menu");
const navLink = document.querySelectorAll(".nav-link");
const iconMenu = document.querySelector("#icon-menu");
const shopBtn = document.querySelector("#shop-btn");

iconMenu.addEventListener("click", (e) => {
  e.preventDefault();
  navMenu.classList.toggle("left-[0]");
  // iconMenu.classList.toggle("ri-close-large-line");

  const currentValue = e.target.getAttribute("class");
  const newValue =
    currentValue === "ri-menu-line" ? "ri-close-large-line" : "ri-menu-line";
  e.target.setAttribute("class", newValue);

  if (newValue == "ri-close-large-line") {
    shopBtn.classList.remove("hidden");
    shopBtn.classList.add("flex");
  } else {
    shopBtn.classList.add("hidden");
    shopBtn.classList.remove("flex");
  }
});

navLink.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.toggle("left-[0]");

    const currentValue = iconMenu.getAttribute("class");
    const newValue =
      currentValue === "ri-menu-line" ? "ri-close-large-line" : "ri-menu-line";
    iconMenu.setAttribute("class", newValue);

    if (newValue == "ri-close-large-line") {
      shopBtn.classList.remove("hidden");
      shopBtn.classList.add("flex");
    } else {
      shopBtn.classList.add("hidden");
      shopBtn.classList.remove("flex");
    }
  });
});


//  Dark mode
const iconDark = document.querySelector("#icon-dark");

iconDark.addEventListener("click", (e) => {
  e.preventDefault();
  iconDark.classList.toggle("ri-sun-fill");
});


// Title to Span
const captiveTitle = document.querySelector(".captive-title");

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
  tabWithSpan[8] = `<br/>`;
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

  // sliderInfinite();
});


// Animation sur le CTA
zignnnBtn.addEventListener("mouseover", () => {
  gsap.to(emoji1, {
    visibility: "visible",
    scale: 4,
    duration: 2,
    x: 350,
    y: -50,
    rotation: 360,
    opacity: 0,
    display: "inline-block",
  });
  gsap.to(emoji2, {
    visibility: "visible",
    scale: 4,
    duration: 2,
    x: 400,
    rotation: 360,
    opacity: 0,
    display: "inline-block",
  });
  gsap.to(emoji3, {
    visibility: "visible",
    scale: 4,
    duration: 2,
    x: 310,
    y: 50,
    rotation: 360,
    opacity: 0,
    display: "inline-block",
  });
});

zignnnBtn.addEventListener("mouseleave", () => {
  gsap.to(emoji1, {
    visibility: "hidden",
    scale: 0,
    x: 0,
    y: 0,
    opacity: 1,
    duration: 1,
  });
  gsap.to(emoji2, {
    visibility: "hidden",
    scale: 0,
    x: 0,
    y: 0,
    opacity: 1,
    duration: 1,
  });
  gsap.to(emoji3, {
    visibility: "hidden",
    scale: 0,
    x: 0,
    y: 0,
    opacity: 1,
    duration: 1,
    // rotation: 360,
    // duration: 0.1,
    // display: "inline-block",
  });
});


// Animation de la section des domaines d'expertise (le defilement vertical)
gsap.registerPlugin(ScrollTrigger);

// ou let tl = gsap.timeline({
//   scrollTrigger: {
let tl = gsap.timeline();

function verticalPinScroll() {
  gsap.timeline().to(".expertise-domains", {
    scrollTrigger: {
      trigger: ".expertises",
      pin: true, // pin the trigger element while active
      start: "top top", // when the top of the trigger hits the top of the viewport
      end: "+=3500", // end after scrolling 500px beyond the start
      scrub: 2, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
    },
    x: -2000,
    duration: 3,
    ease: "power1.inOut",
    // penser a smooth pour un defilement poseee
  });
}
verticalPinScroll();

// tl.to(".domain", {
//   scrollTrigger: {
//     trigger: ".expertise-domains",
//     pin: true, // pin the trigger element while active
//     start: "center center", // when the top of the trigger hits the top of the viewport
//     end: "+=2000", // end after scrolling 500px beyond the start
//     scrub: 2, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
//   },
//   x: -1910,
// });

// Animation du loader
const preLoader = document.querySelector("#pre-loader");
const principalContent = document.querySelector("#principal-content");

// tl.to(".loader-bar", {
//   width: "100%",
//   duration: 1,
//   ease: "power1.in",
// })
//   .to(".loader-percentage", {
//     textContent: "100%",
//     duration: 1,
//     snap: { textContent: 1 },
//   })
//   .to("#pre-loader", {
//     opacity: 0,
//     duration: 0.8,
//     onComplete: () => {
//       preLoader.style.display = "none";
//       principalContent.classList.remove("hidden");

//       // Animation d'entree du contenu
//       gsap.from(principalContent, {
//         opacity: 0,
//         // y: 50,
//         duration: 1,
//         onComplete: () => {
//           verticalPinScroll();
//         },
//       });
//     },
//   });

// animation de la tech stack
const stackContainer = document.querySelector(".stack-container");
const stack = document.querySelector(".stack");
const imgLogo = document.querySelectorAll(".stack img");

imgLogo.forEach((img) => {
  var clone = img.cloneNode(true);
  stack.appendChild(clone);
});

function sliderInfinite() {
  gsap.set(stack, {
    x: 0,
  });
  let sliding = gsap.to(stack, {
    x: -(stack.scrollWidth / 2),
    duration: 45,
    ease: "linear",
    repeat: -1,
  });

  stack.addEventListener("mouseover", () => {
    sliding.pause();
  });

  stack.addEventListener("mouseleave", () => {
    sliding.play();
  })
};
sliderInfinite();
