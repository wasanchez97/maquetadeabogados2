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

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(btn => btn.classList.remove("active"));
    contents.forEach(content => content.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});

// Inicializar primera pestaña
window.addEventListener("DOMContentLoaded", () => {
  tabs[0].classList.add("active");
  contents[0].classList.add("active");
});

//valores
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".valores-cards");
  const cards = Array.from(track.querySelectorAll(".valor-card"));
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");

  let index = 0; // siempre inicia en el primer card

  const isMobile = () => window.innerWidth <= 650;

  function scrollToIndex(i, smooth = true) {
    if (!cards[i]) return;
    const card = cards[i];
    // centramos el card en pantalla
    const target = card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;
    track.scrollTo({ left: target, behavior: smooth ? "smooth" : "auto" });
    index = i;
    updateButtons();
  }

  function updateButtons() {
    if (!isMobile()) {
      prevBtn.style.display = "none";
      nextBtn.style.display = "none";
      return;
    }
    prevBtn.style.display = "block";
    nextBtn.style.display = "block";
    prevBtn.disabled = index <= 0;
    nextBtn.disabled = index >= cards.length - 1;
    prevBtn.style.opacity = prevBtn.disabled ? 0.4 : 1;
    nextBtn.style.opacity = nextBtn.disabled ? 0.4 : 1;
  }

  // Flechas
  nextBtn.addEventListener("click", () => {
    if (index < cards.length - 1) scrollToIndex(index + 1);
  });
  prevBtn.addEventListener("click", () => {
    if (index > 0) scrollToIndex(index - 1);
  });

  // Swipe/manual scroll → actualiza index
  track.addEventListener("scroll", () => {
    if (!isMobile()) return;
    const trackCenter = track.scrollLeft + track.clientWidth / 2;
    let nearest = 0, minDist = Infinity;
    cards.forEach((card, i) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(cardCenter - trackCenter);
      if (dist < minDist) {
        minDist = dist;
        nearest = i;
      }
    });
    index = nearest;
    updateButtons();
  });

  // Resize
  window.addEventListener("resize", () => {
    if (isMobile()) {
      scrollToIndex(index, false);
    } else {
      track.scrollTo({ left: 0, behavior: "auto" });
      index = 0;
    }
    updateButtons();
  });

  // Inicializar
  setTimeout(() => {
    scrollToIndex(0, false); // siempre arranca en la PRIMER card
    updateButtons();
  }, 100);
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

