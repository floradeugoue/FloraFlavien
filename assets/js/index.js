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

//Section modeles
function toggleModels() {
    document.getElementById('extra-models').classList.toggle('hidden');
    document.getElementById('toggle-button').textContent = 
        document.getElementById('extra-models').classList.contains('hidden') ? 'Voir tous les modèles' : 'Voir moins';
}

function openPreview(imageSrc) {
    document.getElementById('preview-image').src = imageSrc;
    document.getElementById('preview-modal').classList.remove('hidden');
}

function closePreview() {
    document.getElementById('preview-modal').classList.add('hidden');
}

//Section utilisation
document.addEventListener("DOMContentLoaded", function () {
    const boxes = document.querySelectorAll(".utilisation-box");
    let index = 0;
    
    function highlightNextBox() {
    // Supprimer l'effet actif de toutes les divs
    boxes.forEach(box => box.classList.remove("active"));
    
    // Ajouter l'effet actif à la div actuelle
    boxes[index].classList.add("active");
    
    // Passer à la div suivante
    index = (index + 1) % boxes.length;
    
    // Relancer après 2 secondes
    setTimeout(highlightNextBox, 2000);
    }
    
    // Lancer l'animation au chargement
    highlightNextBox();
    });

    //Section Temoignages
    let index = 0;
    function nextTestimonial() {
        const carousel = document.getElementById("testimonial-carousel");
        index = (index + 1) % 5;
        carousel.style.transform = `translateX(-${index * 100}%)`;
    }
    function prevTestimonial() {
        const carousel = document.getElementById("testimonial-carousel");
        index = (index - 1 + 5) % 5;
        carousel.style.transform = `translateX(-${index * 100}%)`;
    }

    //Section Faq's
    function toggleFAQ(id) {
        const content = document.getElementById(id);
        content.classList.toggle('hidden');
    }

    //Gerer affichage dynamique du bouton connexion deconnexion
    // Vérifier si les informations de l'utilisateur sont dans le localStorage
    window.onload = () => {
        const authButtonsContainer = document.getElementById('auth-buttons');
        const isUserLoggedIn = localStorage.getItem('user'); // Remplace 'user' par la clé que tu utilises pour enregistrer les infos utilisateur

        if (isUserLoggedIn) {
            // Si l'utilisateur est connecté, afficher le bouton Déconnexion
            authButtonsContainer.innerHTML = `
                <button id="logoutBtn" class="bg-[#E9212E] text-white px-2 py-1 rounded w-full md:w-auto transition duration-300 border-2 border-transparent hover:border-[#E9212E] hover:text-[#E9212E] hover:bg-white">
                    Déconnexion
                </button>
            `;
            
            // Ajouter l'événement de déconnexion
            document.getElementById('logoutBtn').addEventListener('click', () => {
                localStorage.removeItem('user'); // Supprimer les informations de l'utilisateur du localStorage
                window.location.reload(); // Rafraîchir la page
            });
        } else {
            // Si l'utilisateur n'est pas connecté, afficher le bouton Connexion
            authButtonsContainer.innerHTML = `
                <button id="loginBtn" class="bg-[#E9212E] text-white px-2 py-1 rounded w-full md:w-auto transition duration-300 border-2 border-transparent hover:border-[#E9212E] hover:text-[#E9212E] hover:bg-white">
                    Connexion
                </button>
            `;
            
            // Ajouter l'événement de connexion (ici tu peux ajouter ton propre code pour gérer la connexion)
            document.getElementById('loginBtn').addEventListener('click', () => {
                // Code pour la connexion (par exemple, rediriger vers une page de connexion)
                window.location.href = '/connexion'; // Remplace par l'URL de ta page de connexion
            });
        }
    }