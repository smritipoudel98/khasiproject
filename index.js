function setLanguage(lang) {
  document
    .querySelectorAll(".lang")
    .forEach((el) => el.classList.add("hidden"));
  document
    .querySelectorAll(`.lang-${lang}`)
    .forEach((el) => el.classList.remove("hidden"));
  localStorage.setItem("language", lang);
  slideIndex = 1;
  heroSlideIndex = 1;
  showSlides();
  showHeroSlides();
}

function showSection(id) {
  document
    .querySelectorAll(".page-section")
    .forEach(
      (section) => (section.style.display = id === "home" ? "block" : "none")
    );
  if (id !== "home") {
    document.getElementById(id).style.display = "block";
  }
  document
    .querySelectorAll(".nav-link")
    .forEach((a) => a.classList.remove("active"));
  document
    .querySelector(`.nav-link[data-section="${id}"]`)
    .classList.add("active");
  document.getElementById("main-nav").classList.remove("open");
  document.body.classList.remove("menu-open");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleMenu() {
  const nav = document.getElementById("main-nav");
  nav.classList.toggle("open");
  document.body.classList.toggle("menu-open");
}

function sendWhatsApp(e) {
  e.preventDefault();
  const adminNumber = "9779864676207";
  const name = encodeURIComponent(document.getElementById("name").value.trim());
  const address = encodeURIComponent(
    document.getElementById("address").value.trim()
  );
  const email = encodeURIComponent(
    document.getElementById("email").value.trim()
  );
  const message = encodeURIComponent(
    document.getElementById("message").value.trim()
  );
  let text = `New Order Form Submission:%0AName: ${name}%0AAddress: ${address}%0AEmail: ${email}`;
  if (message) text += `%0AMessage: ${message}`;
  window.open(`https://wa.me/${adminNumber}?text=${text}`, "_blank");
}

// let slideIndex = 1;
let heroSlideIndex = 1;

let slideIndex = 0;

function showSlides() {
  const lang = localStorage.getItem("language") || "ne";
  const slides = document.querySelectorAll(`.lang-${lang} .about-slide`);
  const dots = document.querySelectorAll(`.lang-${lang} .slider-dot`);

  slides.forEach((slide, i) => {
    slide.classList.add("hidden");
    slide.classList.remove("active");
    if (dots[i]) dots[i].classList.remove("bg-green-700");
  });

  slideIndex++;
  if (slideIndex > slides.length) slideIndex = 1;

  slides[slideIndex - 1].classList.remove("hidden");
  slides[slideIndex - 1].classList.add("active");
  if (dots[slideIndex - 1]) dots[slideIndex - 1].classList.add("bg-green-700");

  setTimeout(showSlides, 5000); // Change slide every 4 seconds
}

function currentSlide(n) {
  slideIndex = n - 1;
  showSlides();
}

// Start automatic slide rotation
document.addEventListener("DOMContentLoaded", showSlides);

function showHeroSlides() {
  const slides = document.querySelectorAll(".hero-image .slide");
  const dots = document.querySelectorAll(".hero-slider-dot");
  if (slides.length === 0) {
    console.error(
      "No hero slides found. Check .hero-image .slide elements in HTML."
    );
    return;
  }
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i + 1 === heroSlideIndex);
    console.log(
      `Hero slide ${i + 1}: ${
        slide.classList.contains("active") ? "active" : "inactive"
      }`
    );
  });
  if (dots.length > 0) {
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i + 1 === heroSlideIndex);
    });
  }
}

function currentHeroSlide(n) {
  heroSlideIndex = n;
  showHeroSlides();
}

function nextHeroSlide() {
  const slides = document.querySelectorAll(".hero-image .slide");
  if (slides.length === 0) {
    console.warn("No hero slides found for cycling.");
    return;
  }
  heroSlideIndex++;
  if (heroSlideIndex > slides.length) heroSlideIndex = 1;
  showHeroSlides();
}

setInterval(() => {
  const lang = localStorage.getItem("language") || "ne";
  const slides = document.querySelectorAll(`.lang-${lang} .about-slide`);
  if (slides.length === 0) return;
  slideIndex++;
  if (slideIndex > slides.length) slideIndex = 1;
  showSlides();
}, 3000);

setInterval(nextHeroSlide, 1000);

document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("language") || "ne";
  setLanguage(savedLang);
  showSection("home");
  showSlides();
  showHeroSlides();
  console.log("Website initialized successfully");
});
