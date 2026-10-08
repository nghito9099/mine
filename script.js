document.getElementById("year").textContent = new Date().getFullYear();

const menu = document.querySelector(".menu");
const nav = document.querySelector("nav");

menu?.addEventListener("click", () => {
  const open = nav.style.display === "flex";
  nav.style.display = open ? "" : "flex";
  if (!open) {
    nav.style.position = "absolute";
    nav.style.top = "70px";
    nav.style.right = "20px";
    nav.style.flexDirection = "column";
    nav.style.background = "#fffaf7";
    nav.style.padding = "18px 22px";
    nav.style.border = "1px solid #edc5d4";
    nav.style.borderRadius = "16px";
    nav.style.zIndex = "40";
  }
});

const welcome = document.getElementById("welcome");
const enter = document.getElementById("enter");

if (sessionStorage.getItem("ngi_welcomed")) {
  welcome?.classList.add("hidden");
}

enter?.addEventListener("click", () => {
  sessionStorage.setItem("ngi_welcomed", "1");
  welcome?.classList.add("hidden");
});

document.addEventListener("click", (event) => {
  const heart = document.createElement("span");
  heart.className = "click-heart";
  heart.textContent = ["♡", "♥", "✦"][Math.floor(Math.random() * 3)];
  heart.style.left = event.clientX + "px";
  heart.style.top = event.clientY + "px";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 900);
});

document.addEventListener("mousemove", (event) => {
  document.documentElement.style.setProperty("--mouse-x", event.clientX + "px");
  document.documentElement.style.setProperty("--mouse-y", event.clientY + "px");
});