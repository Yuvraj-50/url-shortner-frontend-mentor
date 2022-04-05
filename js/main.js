const menu = document.querySelector(".menu");
const navLists = document.querySelector(".nav-links-con");

menu.addEventListener("click", function () {
  navLists.classList.toggle("hidden");
});
