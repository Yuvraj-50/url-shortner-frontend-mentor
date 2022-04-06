////////////////////////  NAVBAR ///////////////////////////
const menu = document.querySelector(".menu");
const navLists = document.querySelector(".nav-links-con");

menu.addEventListener("click", function () {
  navLists.classList.toggle("hidden-m");
});

////////////////////////  link shortner ///////////////////////////
const shortenBtn = document.querySelector(".shorten-btn");
const resultLink = document.querySelector(".result-link");
const rawLink = document.querySelector(".url-input");
const displayArea = document.querySelector("#input-section .container .form");
const forCopyBtn = document.querySelector("#input-section .container");

function shortenLink(link) {
  fetch(`https://api.shrtco.de/v2/shorten?url=${link}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      renderDisplayForm(data.result.short_link);
    });
}

function renderDisplayForm(link) {
  const html = `<div class="result-link">
      <h2 class="link">${rawLink.value}</h2>
      <div class=" right">
        <h2 class="shorten-link">${link}</h2>
        <button class="btn btn-color btn-lg btn-sq copy">copy</button>
      </div>
    </div>`;
  displayArea.insertAdjacentHTML("afterend", html);
  rawLink.value = "";
}

// event listners
shortenBtn.addEventListener("click", function (e) {
  e.preventDefault();
  shortenLink(rawLink.value);
});

forCopyBtn.addEventListener("click", function (e) {
  if (e.target.classList.contains("copy")) {
    e.target.style.backgroundColor = "hsl(257, 27%, 26%)";
    e.target.textContent = "copied !";
  }
});
