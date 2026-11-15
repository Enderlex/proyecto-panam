function initCarousel(carousel) {
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const btnPrev = carousel.querySelector('.carousel-btn.prev');
    const btnNext = carousel.querySelector('.carousel-btn.next');
    const dotsContainer = carousel.querySelector('.carousel-dots');

    let index = 0;
    let autoplay;

    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.classList.add('dot');
        dot.setAttribute('aria-label', 'Ir a la imagen ' + (i + 1));
        dot.addEventListener('click', () => {
            index = i;
            updateCarousel();
        });
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.dot');

    function updateCarousel() {
        track.style.transform = 'translateX(-' + index * 100 + '%)';
        dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    }

    function nextSlide() {
        index = (index + 1) % slides.length;
        updateCarousel();
    }

    function prevSlide() {
        index = (index - 1 + slides.length) % slides.length;
        updateCarousel();
    }

    btnNext.addEventListener('click', nextSlide);
    btnPrev.addEventListener('click', prevSlide);

    function startAutoplay() {
        autoplay = setInterval(nextSlide, 2000);
    }

    function stopAutoplay() {
        clearInterval(autoplay);
    }

    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    updateCarousel();
    startAutoplay();
}

document.querySelectorAll('.carousel').forEach(initCarousel);