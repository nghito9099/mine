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
    nav.style.background = "var(--card)";
    nav.style.padding = "18px 22px";
    nav.style.border = "1px solid var(--line)";
    nav.style.borderRadius = "16px";
  }
});
