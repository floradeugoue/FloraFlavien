//Toggle menu
function toggleMenu() {
    document.getElementById('mobile-menu').classList.toggle('hidden');
}

//Section 1
document.addEventListener("DOMContentLoaded", function () {
    let slides = document.querySelectorAll("#carousel .slide");
    let currentSlide = 0;

    function showSlide(nextSlide) {
        slides[currentSlide].classList.remove("opacity-100", "translate-y-0");
        slides[currentSlide].classList.add("opacity-0", "translate-y-5");
    
        setTimeout(() => {
            slides[currentSlide].classList.add("hidden");
            slides[nextSlide].classList.remove("hidden");
        }, 300); // Petit délai pour lisser la transition

        slides[nextSlide].classList.remove("opacity-0", "translate-y-5");
        slides[nextSlide].classList.add("opacity-100", "translate-y-0");

        currentSlide = nextSlide;
    }

    function nextSlide() {
        let next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    setInterval(nextSlide, 6000); // Augmente à 6s pour une transition plus calme
});