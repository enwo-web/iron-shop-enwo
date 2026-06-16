document.addEventListener('DOMContentLoaded', () => {
  updateCartUI();
  initNavScroll();
  initDebris();
  initGlitch();
});

function initNavScroll() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });
}

function initDebris() {
  const container = document.querySelector('.floating-debris');
  if (!container) return;
}

function initGlitch() {
  const brand = document.querySelector('.navbar-brand');
  if (!brand) return;
  setInterval(() => {
    brand.style.textShadow = '2px 0 var(--neon-red), -2px 0 var(--neon-cyan), 0 0 20px var(--neon-red)';
    setTimeout(() => brand.style.textShadow = '0 0 8px var(--neon-red)', 80);
  }, 3000);
}
// light mode
const themeBtn = document.getElementById('themeToggle');

if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light-mode');
  themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
}

themeBtn?.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');

  if (document.body.classList.contains('light-mode')) {
    localStorage.setItem('theme', 'light');
    themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    localStorage.setItem('theme', 'dark');
    themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
  }
});
