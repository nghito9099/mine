document.getElementById("year").textContent = new Date().getFullYear();

const menu = document.querySelector(".menu");
const nav = document.querySelector("nav");
menu?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menu.setAttribute("aria-expanded", String(open));
});
nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menu?.setAttribute("aria-expanded", "false");
}));

const welcome = document.getElementById("welcome");
document.getElementById("enter")?.addEventListener("click", () => {
  welcome?.classList.add("hidden");
});

const themeToggle = document.getElementById("theme-toggle");
themeToggle?.addEventListener("click", () => {
  const dark = document.body.classList.toggle("dark");
  themeToggle.textContent = dark ? "☀" : "☾";
  themeToggle.setAttribute("aria-label", dark ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối");
});

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("is-visible"));
}

document.addEventListener("click", event => {
  if (event.target.closest("button, a, label, input")) return;
  const heart = document.createElement("span");
  heart.className = "click-heart";
  heart.textContent = ["♡", "♥", "✦"][Math.floor(Math.random() * 3)];
  heart.style.left = event.clientX + "px";
  heart.style.top = event.clientY + "px";
  document.body.appendChild(heart);
  window.setTimeout(() => heart.remove(), 900);
});

const avatarInput = document.getElementById("avatar-upload");
const avatarPreview = document.getElementById("avatar-preview");
let avatarUrl = "";
avatarInput?.addEventListener("change", () => {
  const file = avatarInput.files?.[0];
  if (!file || !file.type.startsWith("image/")) return;
  if (avatarUrl) URL.revokeObjectURL(avatarUrl);
  avatarUrl = URL.createObjectURL(file);
  avatarPreview.querySelector("img")?.remove();
  const img = document.createElement("img");
  img.src = avatarUrl;
  img.alt = "Ảnh đại diện bạn vừa chọn";
  avatarPreview.appendChild(img);
  avatarPreview.classList.add("has-image");
  avatarPreview.setAttribute("aria-label", "Ảnh đại diện do bạn chọn");
});

const galleryInput = document.getElementById("gallery-upload");
const galleryGrid = document.getElementById("gallery-grid");
const galleryUrls = [];
galleryInput?.addEventListener("change", () => {
  const files = Array.from(galleryInput.files || []).filter(file => file.type.startsWith("image/"));
  files.forEach(file => {
    const url = URL.createObjectURL(file);
    galleryUrls.push(url);
    const card = document.createElement("article");
    card.className = "memory-card";
    const img = document.createElement("img");
    img.src = url;
    img.alt = file.name ? "Ảnh: " + file.name : "Ảnh trong thư viện của Nghi";
    const caption = document.createElement("span");
    caption.textContent = file.name ? file.name.replace(/\.[^.]+$/, "").slice(0, 32) : "little memory ♡";
    card.append(img, caption);
    galleryGrid.appendChild(card);
  });
  galleryInput.value = "";
});

const musicInput = document.getElementById("music-upload");
const music = document.getElementById("background-music");
const musicToggle = document.getElementById("music-toggle");
const musicStatus = document.getElementById("music-status");
let musicUrl = "";
musicInput?.addEventListener("change", () => {
  const file = musicInput.files?.[0];
  if (!file || !file.type.startsWith("audio/")) return;
  if (musicUrl) URL.revokeObjectURL(musicUrl);
  musicUrl = URL.createObjectURL(file);
  music.src = musicUrl;
  music.load();
  musicToggle.disabled = false;
  musicToggle.textContent = "▶ phát";
  musicStatus.textContent = file.name;
});
musicToggle?.addEventListener("click", async () => {
  if (!music.src) return;
  if (music.paused) {
    try {
      await music.play();
      musicToggle.textContent = "Ⅱ dừng";
    } catch {
      musicStatus.textContent = "Hãy chọn lại file nhạc";
    }
  } else {
    music.pause();
    musicToggle.textContent = "▶ phát";
  }
});
music?.addEventListener("ended", () => { musicToggle.textContent = "▶ phát"; });
