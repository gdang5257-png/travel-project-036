let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const sliderBox = document.getElementById("sliderBox");

function showSlide(index) {
    currentSlide = (index + slides.length) % slides.length;
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.toggle("active", i === currentSlide);
        dots[i].classList.toggle("active", i === currentSlide);
    }
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

let autoPlay = setInterval(nextSlide, 3500);

function resetAutoPlay() {
    clearInterval(autoPlay);
    autoPlay = setInterval(nextSlide, 3500);
}

if (sliderBox) {
    let touchStartX = 0;
    sliderBox.addEventListener("touchstart", function (e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    sliderBox.addEventListener("touchend", function (e) {
        const touchEndX = e.changedTouches[0].screenX;
        if (touchEndX < touchStartX - 40) {
            nextSlide();
            resetAutoPlay();
        } else if (touchEndX > touchStartX + 40) {
            prevSlide();
            resetAutoPlay();
        }
    }, { passive: true });

    let mouseStartX = 0;
    let isDragging = false;

    sliderBox.addEventListener("mousedown", function (e) {
        if (e.target.closest("button")) return;
        isDragging = true;
        mouseStartX = e.screenX;
    });

    sliderBox.addEventListener("mouseup", function (e) {
        if (!isDragging) return;
        isDragging = false;
        const mouseEndX = e.screenX;
        if (mouseEndX < mouseStartX - 40) {
            nextSlide();
            resetAutoPlay();
        } else if (mouseEndX > mouseStartX + 40) {
            prevSlide();
            resetAutoPlay();
        }
    });
}