const header = document.querySelector("header");
const hamburgerBtn = document.querySelector("#hamburger-btn");
const closeMenuBtn = document.querySelector("#close-menu-btn");

hamburgerBtn.addEventListener("click", () => header.classList.toggle("show-mobile-menu"));



let myVariable = false;
// Close mobile menu on close button click
closeMenuBtn.addEventListener("click", () => hamburgerBtn.click());