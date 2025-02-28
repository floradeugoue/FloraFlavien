//ajout des informations du profil

document.getElementById("formProfil").addEventListener("submit", function(event) {
    event.preventDefault(); // Empêche l'envoi du formulaire

    // Récupération des valeurs
    let photoInput = document.getElementById("photo-profil");
    let nom = document.getElementById("nom").value.trim();
    let age = document.getElementById("age").value.trim();
    let sexe = document.getElementById("sexe").value;
    let titre = document.getElementById("titre").value.trim();
    let situation = document.getElementById("situation").value.trim();
    let email = document.getElementById("email").value.trim();
    let adresse = document.getElementById("adresse").value.trim();
    let tel = document.getElementById("tel").value.trim();
    let description = document.getElementById("description").value.trim();

    // Vérification des champs vides (sauf la photo qui est optionnelle)
    if (!nom || !age || !titre || !situation || !email || !adresse || !tel || !description) {
        alert("Veuillez remplir tous les champs obligatoires.");
        return;
    }

    // Vérification de l'âge
    age = parseInt(age);
    if (isNaN(age) || age < 18 || age > 65) {
        alert("L'âge doit être compris entre 18 et 65 ans.");
        return;
    }

    // Vérification du format email
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Veuillez entrer un email valide.");
        return;
    }

    // Gestion de la photo de profil
    let reader = new FileReader();
    reader.onload = function(event) {
        let photoBase64 = event.target.result; // Conversion en Base64

        // Stockage des données dans localStorage
        let profilData = { photoBase64, nom, age, sexe, titre, situation, email, adresse, tel, description };
        localStorage.setItem("profil", JSON.stringify(profilData));

        // Afficher la section suivante (expérience) et masquer l'actuelle
        document.getElementById("formProfil").classList.add("hidden");
        document.getElementById("formExperience").classList.remove("hidden");
    };

    // Vérifier si une photo a été sélectionnée
    if (photoInput.files.length > 0) {
        reader.readAsDataURL(photoInput.files[0]); // Convertit l'image en Base64
    } else {
        // Si aucune photo n'est sélectionnée, stocker les autres données immédiatement
        let profilData = { nom, age, sexe, titre, situation, email, adresse, tel, description, photoBase64: null };
        localStorage.setItem("profil", JSON.stringify(profilData));

        // Afficher la section suivante
        document.getElementById('profil').classList.add("hidden");
        document.getElementById('expériences').classList.remove("hidden");
    }
});

// affichages
document.addEventListener("DOMContentLoaded", function () {
    // Récupérer les données du profil depuis localStorage
    let profilData = JSON.parse(localStorage.getItem("profil"));

    if (profilData) {
        // Mettre à jour les éléments de profil avec les données stockées
        document.getElementById("profile-name").textContent = profilData.nom || "Nom inconnu";
        document.getElementById("profile-title").textContent = profilData.titre || "Titre non défini";
        document.getElementById("profile-description").textContent = profilData.description || "Aucune description";
        document.getElementById("profile-gender").textContent = profilData.sexe || "Non précisé";
        document.getElementById("profile-age").textContent = profilData.age ? profilData.age + " ans" : "Âge inconnu";
        document.getElementById("profile-email").textContent = profilData.email || "Email inconnu";
        document.getElementById("profile-phone").textContent = profilData.tel || "Téléphone inconnu";
        document.getElementById("profile-address").textContent = profilData.adresse || "Adresse inconnue";
        document.getElementById("profile-situation").textContent = profilData.situation || "Situation non précisée";

        // Afficher la photo de profil si elle existe
        if (profilData.photoBase64) {
            let imgElement = document.createElement("img");
            imgElement.src = profilData.photoBase64;
            imgElement.alt = "Photo de profil";
            imgElement.style.width = "100px"; // Ajuste la taille selon ton design
            imgElement.style.height = "100px";
            imgElement.style.borderRadius = "50%"; // Rendre la photo ronde si nécessaire

            // Ajouter l'image dans la section du profil
            let profilePreview = document.getElementById("profile-preview");
            profilePreview.insertBefore(imgElement, profilePreview.firstChild);
        }
    }
});

