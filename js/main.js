////////////////////////  NAVBAR ///////////////////////////
// `use strict`;

const menu = document.querySelector(".menu");
const navLists = document.querySelector(".nav-links-con");

menu.addEventListener("click", function () {
  navLists.classList.toggle("hidden-m");
});

////////////////////////  link shortner ///////////////////////////
const shortenBtn = document.querySelector(".shorten-btn");
const rawLink = document.querySelector(".url-input");
const displayArea = document.querySelector("#input-section .container .form");
const forCopyBtn = document.querySelector("#input-section .container");
const errorMsg = document.querySelector(".error-msg");

function shortenLink(link) {
  fetch(`https://api.shrtco.de/v2/shorten?url=${link}`)
    .then((res) => {
      if (!res.ok) throw new Error(`${res.status} Invalid link`);
      return res.json();
    })
    .then((data) => {
      console.log(data);
      renderDisplayForm(data.result.short_link);
    })
    .catch((err) => {
      displayErrorMsg(err);
    });
}

function displayErrorMsg(err) {
  errorMsg.classList.remove("hidden");
  errorMsg.textContent = `${err} `;
}

function renderDisplayForm(link) {
  const html = `
  <div class="result-link">
    <div class="link-con">
      <h2 class="link">${rawLink.value}</h2>
    </div>
    <div class="right ">
      <h2 class="shorten-link">${link}</h2>
      <button class="btn btn-color btn-lg btn-sq copy">copy</button>
    </div>
  </div>
  `;

  displayArea.insertAdjacentHTML("afterend", html);
  rawLink.value = "";
}

// event listners
shortenBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (rawLink.value == "") {
    rawLink.classList.add("error");
    errorMsg.classList.remove("hidden");
  } else {
    shortenLink(rawLink.value);
    rawLink.classList.remove("error");
    errorMsg.classList.add("hidden");
  }
});

forCopyBtn.addEventListener("click", function (e) {
  if (e.target.classList.contains("copy")) {
    e.target.style.backgroundColor = "hsl(257, 27%, 26%)";

    setTimeout(() => {
      e.target.style.backgroundColor = "hsl(180, 66%, 49%)";
      e.target.textContent = "copy";
    }, 3000);
    e.target.textContent = "copied !";
    copyToClipBoard(e.target);
  }
});

function copyToClipBoard(btn) {
  const copyText = btn.closest(".right").querySelector(".shorten-link");
  const textArea = document.createElement("textarea");
  textArea.setAttribute("readonly", "");
  textArea.style.position = "absolute";
  textArea.value = copyText.textContent;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  textArea.classList.add("hidden");
}
