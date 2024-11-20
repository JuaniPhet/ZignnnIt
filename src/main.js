const iconMenu = document.querySelector(".icon-menu");
const navLinks = document.querySelector(".nav-links");
const iconMoon = document.querySelector(".icon-moon");


iconMenu.addEventListener("click", (e) => {
  const currentValue = e.target.getAttribute("name");
  const newValue = currentValue === "menu" ? "close" : "menu";
  e.target.setAttribute("name", newValue);

  if(newValue == 'close') {
    navLinks.classList.remove('hidden');
    navLinks.classList.add('block');
  }else{
    navLinks.classList.add('hidden');
    navLinks.classList.remove('block');
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
