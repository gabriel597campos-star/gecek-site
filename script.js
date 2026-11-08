
// MENU MOBILE

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    menuToggle.textContent =
        navLinks.classList.contains("active") ? "✕" : "☰";
});

// FECHAR MENU AO CLICAR

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.textContent = "☰";
    });
});

// CARROSSEL

const track = document.getElementById("carouselTrack");
const slides = document.querySelectorAll(".carousel-slide");
const dots = document.querySelectorAll(".dot");

const prevButton = document.getElementById("prevSlide");
const nextButton = document.getElementById("nextSlide");

let currentSlide = 0;
let autoPlay;

function getVisibleSlides() {
    return window.innerWidth <= 700 ? 1 :
           window.innerWidth <= 950 ? 2 : 3;
}

function updateCarousel() {

    const visible = getVisibleSlides();

    const maxSlide = Math.max(0, slides.length - visible);

    currentSlide = Math.min(currentSlide, maxSlide);

    const slideWidth = slides[0].getBoundingClientRect().width;
    const gap = 20;

    track.style.transform =
        `translateX(-${currentSlide * (slideWidth + gap)}px)`;

    dots.forEach((dot, index) => {
        dot.classList.toggle(
            "active",
            index === currentSlide
        );
    });
}

function next() {

    const maxSlide = Math.max(
        0,
        slides.length - getVisibleSlides()
    );

    currentSlide =
        currentSlide >= maxSlide ? 0 : currentSlide + 1;

    updateCarousel();
}

function previous() {

    const maxSlide = Math.max(
        0,
        slides.length - getVisibleSlides()
    );

    currentSlide =
        currentSlide <= 0 ? maxSlide : currentSlide - 1;

    updateCarousel();
}

nextButton.addEventListener("click", () => {
    next();
    restartAutoPlay();
});

prevButton.addEventListener("click", () => {
    previous();
    restartAutoPlay();
});

dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {

        currentSlide = Math.min(
            index,
            Math.max(0, slides.length - getVisibleSlides())
        );

        updateCarousel();
        restartAutoPlay();
    });
});

// PASSAGEM AUTOMATICA

function startAutoPlay() {
    autoPlay = setInterval(next, 4000);
}

function restartAutoPlay() {
    clearInterval(autoPlay);
    startAutoPlay();
}

window.addEventListener("resize", updateCarousel);

updateCarousel();
startAutoPlay();

// WHATSAPP

const whatsappButton = document.getElementById("whatsappButton");

// SUBSTITUA PELO TELEFONE OFICIAL DA GECEK
const whatsappNumber = "55DDDNUMERO";

whatsappButton.href =
    `https://wa.me/${whatsappNumber}?text=` +
    encodeURIComponent(
        "Olá! Conheci a GECEK pelo site e gostaria de conhecer as soluções."
    );

whatsappButton.target = "_blank";
whatsappButton.rel = "5589994291289";


/* =====================================
   GECEK - CARROSSEL INFINITO FUNCIONAL
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    const windowCarousel =
        document.querySelector(".testimonial-window");

    const track =
        document.getElementById("testimonialTrack");

    if (!windowCarousel || !track) return;

    // Evita duplicar os cartões mais de uma vez
    if (track.dataset.carouselReady === "true") return;

    track.dataset.carouselReady = "true";

    // Guarda os seis cartões originais
    const originalCards = Array.from(track.children);

    if (originalCards.length < 2) return;

    // Duplica os cartões para criar o loop infinito
    originalCards.forEach(card => {
        const clone = card.cloneNode(true);

        clone.setAttribute("aria-hidden", "true");

        track.appendChild(clone);
    });

    let position = 0;
    let lastTime = 0;
    let animationFrame = null;
    let paused = false;

    // Velocidade em pixels por segundo
    const speed = 65;

    function animate(time) {

        if (paused || document.hidden) {
            lastTime = 0;
            animationFrame = null;
            return;
        }

        if (lastTime === 0) {
            lastTime = time;
        }

        const delta = Math.min(
            (time - lastTime) / 1000,
            0.05
        );

        lastTime = time;

        // Largura de uma sequência completa de cartões
        const loopWidth = track.scrollWidth / 2;

        if (loopWidth > 0) {

            position += speed * delta;

            if (position >= loopWidth) {
                position -= loopWidth;
            }

            track.style.transform =
                `translate3d(${-position}px, 0, 0)`;
        }

        animationFrame = requestAnimationFrame(animate);
    }

    function startCarousel() {

        if (paused || document.hidden || animationFrame !== null) {
            return;
        }

        lastTime = 0;

        animationFrame = requestAnimationFrame(animate);
    }

    function stopCarousel() {

        paused = true;

        if (animationFrame !== null) {
            cancelAnimationFrame(animationFrame);
            animationFrame = null;
        }

        lastTime = 0;
    }

    function resumeCarousel() {

        paused = false;

        startCarousel();
    }

    // PARA quando o mouse entra no carrossel
    windowCarousel.addEventListener(
        "mouseenter",
        stopCarousel
    );

    // VOLTA quando o mouse sai
    windowCarousel.addEventListener(
        "mouseleave",
        resumeCarousel
    );

    // PARA quando tocar e segurar no celular
    windowCarousel.addEventListener(
        "touchstart",
        stopCarousel,
        { passive: true }
    );

    // VOLTA quando retirar o dedo
    windowCarousel.addEventListener(
        "touchend",
        resumeCarousel,
        { passive: true }
    );

    windowCarousel.addEventListener(
        "touchcancel",
        resumeCarousel,
        { passive: true }
    );

    // Também pausa se a página ficar escondida
    document.addEventListener("visibilitychange", () => {

        if (document.hidden) {
            stopCarousel();
        } else {
            resumeCarousel();
        }

    });

    // Inicia o movimento
    startCarousel();

});
