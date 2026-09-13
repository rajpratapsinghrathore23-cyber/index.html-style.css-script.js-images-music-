const pages = document.querySelectorAll(".page");
let currentPage = 0;
let noAttempts = 0;

function showPage(index) {
  if (index < 0 || index >= pages.length) return;
  pages.forEach(p => p.classList.remove("active"));
  pages[index].classList.add("active");
  currentPage = index;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function nextPage() {
  showPage(currentPage + 1);
}

function acceptGift() {
  startMusic();
  createHeartBurst();
  showPage(2);
}

const noBtn = document.getElementById("noBtn");
const noMessage = document.getElementById("noMessage");

function moveNoButton(e) {
  if (e) e.preventDefault();

  noAttempts++;

  if (noAttempts >= 2) {
    noMessage.textContent = "Babuuu, NO option available hi nahi hai 😂💗";
  } else {
    noMessage.textContent = "Hehe... pakad ke dikhao 😏💗";
  }

  // Keep the button inside the visible viewport.
  const padding = 18;
  const maxX = Math.max(padding, window.innerWidth - noBtn.offsetWidth - padding);
  const maxY = Math.max(100, window.innerHeight - noBtn.offsetHeight - padding);

  noBtn.style.position = "fixed";
  noBtn.style.left = Math.random() * (maxX - padding) + padding + "px";
  noBtn.style.top = Math.random() * (maxY - 80) + 60 + "px";
}

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("touchstart", moveNoButton, { passive: false });
noBtn.addEventListener("click", moveNoButton);

function openGift() {
  const box = document.getElementById("giftBox");
  const content = document.getElementById("surpriseContent");

  box.classList.add("opened");
  setTimeout(() => {
    box.style.display = "none";
    content.classList.add("show");
    createHeartBurst();
  }, 500);
}

function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = ["💗", "💕", "💖", "❤️", "✨"][Math.floor(Math.random() * 5)];
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = (14 + Math.random() * 18) + "px";
  heart.style.animationDuration = (4 + Math.random() * 5) + "s";
  document.getElementById("hearts").appendChild(heart);

  setTimeout(() => heart.remove(), 10000);
}

setInterval(createHeart, 650);

function createHeartBurst() {
  for (let i = 0; i < 22; i++) {
    setTimeout(createHeart, i * 45);
  }
}

function startMusic() {
  const music = document.getElementById("bgMusic");
  music.volume = 0.35;
  music.play().catch(() => {
    // Browser autoplay rules may require another user interaction.
  });
}

// Countdown to the next September 14.
function updateCountdown() {
  const now = new Date();
  let target = new Date(now.getFullYear(), 8, 14, 0, 0, 0);

  if (now >= target) {
    target = new Date(now.getFullYear() + 1, 8, 14, 0, 0, 0);
  }

  const diff = target - now;

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor(diff / 3600000) % 24;
  const minutes = Math.floor(diff / 60000) % 60;
  const seconds = Math.floor(diff / 1000) % 60;

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);
