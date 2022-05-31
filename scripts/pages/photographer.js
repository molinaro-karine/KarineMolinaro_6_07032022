/* eslint-disable no-undef */

// Classe pour créer la page de photographe 
class PhotographerPage {
    constructor(photographerData) {
        this.photographerData = photographerData;
    }

     // Afficher l'en-tête du photographe sélectionné
     displayPhotographerPresentation() {
       
        const {name, tagline, city, country, portrait} = this.photographerData;
        const location = `${city}, ${country}`;
    
        // présentation 
        const div = document.createElement("div");
        div.classList.add("photographer_presentation");
        div.setAttribute("tabindex",0);
    
        const h2 = document.createElement("h2");
        h2.textContent = name;
    
        const paragraphe1 = document.createElement("p");
        paragraphe1.classList.add("location_presentation");
        paragraphe1.textContent = location;
        
        const paragraphe2 = document.createElement("p");
        paragraphe2.classList.add("tagline_presentation");
        paragraphe2.textContent = tagline;
    
        div.appendChild(h2);
        div.appendChild(paragraphe1);
        div.appendChild(paragraphe2);

        // button 
        const contactButton = document.createElement("button");
        contactButton.classList.add("contact_button");
        contactButton.setAttribute("aria-label", "contactez-moi");
        contactButton.setAttribute("aria-haspopup","dialog");
        contactButton.textContent="Contactez-moi";
        contactButton.addEventListener("click",displayModal); // Fonction displayModal de contactForm.js

    
        
        const pictureSource = `assets/photographers/${portrait}`;
    
        const portraitDiv = document.createElement( "div");
        portraitDiv.classList.add("photographer_portrait");
    
        const img = document.createElement("img");
        img.setAttribute("src", pictureSource);
        img.setAttribute("alt", "portrait du photographe " + name)
        portraitDiv.appendChild(img);
    
        const photographHeader = document.querySelector(".photograph-header");
        photographHeader.appendChild(div);
        photographHeader.appendChild(contactButton);
        photographHeader.appendChild(portraitDiv);
    
        const photographerName = document.querySelector("#modal_photographer");
        photographerName.textContent = name;
   
    }
}

// Fonction pour la gestion des filtres
document.querySelector(".button_dropdown").addEventListener("click", showOptions); 

// Fonction qui affiche les options de tri
function showOptions() {
    document.querySelector(".sort_dropdown_options").classList.toggle("show");
    document.querySelector(".button_dropdown").setAttribute("aria-expanded", true);
  }

window.addEventListener("click",hideExceptButton); 

// Fonction qui masque les options de tri si on clique n'importe où sur la fenêtre sauf depuis le bouton
function hideExceptButton (event){
    if (!event.target.matches(".button_dropdown") && !event.target.matches(".fa-chevron-down") && !event.target.matches(".btn-name")) {
        hideOptions();
    }
}

function hideOptions() {
    if(document.querySelector(".sort_dropdown_options").classList.contains("show")) {
    document.querySelector(".sort_dropdown_options").classList.remove("show");
    document.querySelector(".button_dropdown").setAttribute("aria-expanded", false);
    }
}

document.querySelector(".sort_dropdown_options").addEventListener("keyup", onKeyUpEscape);
document.querySelector(".button_dropdown").addEventListener("keyup", onKeyUpEscape);
function onKeyUpEscape(e) {
    if(e.key === "Escape") {
        hideOptions();
    }
} 


// eslint-disable-next-line no-unused-vars
function changeButtonName(newName) {
    document.querySelector(".btn-name").textContent = newName; 
}
// /fonction pour les filtres

//Récupère l'id du photographe dans l'URL
function getPhotographerId() {
    const currentUrl = new URL(location.href);
    const searchParams= new URLSearchParams(currentUrl.search);
    return searchParams.get("id")
}

async function getPhotographerData() {
    return await fetch("data/photographers.json")
    .then(responseData => responseData.json());
}

 //Affichage des photographes
 async function displayData(photographerGallery) {
    const mediaSection = document.querySelector(".photographer_gallery");
    // vider la section mediaSection
    mediaSection.innerHTML = "";
    // Pour chaque photographe, est crée un nouvel élément dans le DOM
    photographerGallery.forEach((photographerMedia) => {
        const mediaModel = mediaFactory(photographerMedia);
        const mediaCardDOM = mediaModel.createGalleryCard();
        mediaSection.appendChild(mediaCardDOM);
    });

    // sort function
    const sortMedia = mediaFactory(photographerGallery);

    // Sort by popularity
    document.querySelector(".align-sort").addEventListener("click", sortByPopularity);
    document.querySelector(".align-sort").addEventListener("keyup", onKeyUpPopularity);

    function sortByPopularity(){
        displayData(sortMedia.sortByPopularity())
    }

    function onKeyUpPopularity(e){
        if(e.key === "Enter") {
            sortByPopularity();
        }
    }


    // Trier par Date du plus récent au plus ancien
    document.querySelector("#date").addEventListener("click", sortByDate); 
    document.querySelector("#date").addEventListener("keyup", onKeyUpDate);

    function sortByDate(){
        displayData(sortMedia.sortByDate())
    }

    function onKeyUpDate(e){
        if(e.key === "Enter") {
            sortByDate();
        }
    }


    // Trier par titre par ordre alphabétique
    document.querySelector("#title").addEventListener("click", sortByTitle); 
    document.querySelector("#title").addEventListener("keyup", onKeyUpTitle);

    function sortByTitle(){
        displayData(sortMedia.sortByTitle())
    }

    function onKeyUpTitle(e){
        if(e.key === "Enter") {
            sortByTitle();
        }
    }

    const mediaLightbox = document.querySelectorAll('.card_photo a')
    mediaLightbox.forEach(item => {
        item.addEventListener('click', openLightbox)
    })

    function openLightbox (e) {
        e.preventDefault();
       // Renvoi tous les médias associés au photographe
        new Lightbox(this.getAttribute('data-id'), photographerGallery);
    }

}

 /* AFFICHAGE DES LIKES ET DES INFOS SUR LES PRIX */

    // Afficher les likes
    function displayLikes(photographerGallery) {
        document.querySelector(".likes").textContent=sumOfLikes(photographerGallery)
    }
    // Somme des likes
    function sumOfLikes(photographerGallery) {
        return photographerGallery.reduce((a, b) => a + b.likes, 0);
    }
    // Afficher le prix
    function displayPrice() {
        document.querySelector(".price").textContent=`${photographerPage.photographerData.price}€ /jour`
    }

async function init() {
    
    const result = await getPhotographerData();
    const photographerId = getPhotographerId();
    // Renvoi les informations du photographe grâce à son ID
    const selectedPhotographer = result.photographers.find(photographer=>photographer.id===Number(photographerId));
    // Renvoi tous les médias associés au photographe
    const photographerGallery = result.media.filter(mediaObject=>mediaObject.photographerId===Number(photographerId));

    photographerPage = new PhotographerPage(selectedPhotographer);
    photographerPage.displayPhotographerPresentation();

    displayData(photographerGallery)
    displayLikes(photographerGallery);
    displayPrice();
}

init();