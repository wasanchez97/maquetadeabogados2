// Navbar color al scrollear
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Animaciones reveal al scrollear
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);
reveals.forEach((el) => observer.observe(el));

// --- Menú hamburguesa ---
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Cerrar menú al hacer clic en un link
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

// Servicios


const tabs = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".tab-content");

function showTab(tabId) {
  // Ocultar todas
  contents.forEach(content => content.classList.remove("active"));

  // Mostrar pestaña seleccionada
  const target = document.getElementById(tabId);
  target.classList.add("active");
}


// Eventos de click
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(btn => btn.classList.remove("active"));
    tab.classList.add("active");
    showTab(tab.dataset.tab);
  });
});

// Inicializar primera pestaña
window.addEventListener("DOMContentLoaded", () => {
  tabs[0].classList.add("active");
  showTab(tabs[0].dataset.tab);
});







//Testimonios
const slides = document.querySelectorAll('.testimonial-slide');
slides.forEach(slide => {
  slide.querySelector('.carousel-arrow.left').addEventListener('click', () => changeSlide(-1));
  slide.querySelector('.carousel-arrow.right').addEventListener('click', () => changeSlide(1));
});

let currentSlide = 0;

function changeSlide(direction) {
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + direction + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
}

