// Classe pour créer la page de photographe 
class PhotographerPage {
    
    constructor(photographerData, photographerGallery) {
        this.photographerData = photographerData;
        this.photographerGallery = photographerGallery;
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
    
    // Fonction pour créer carte  image/vidéo + nom + likes + icône 
    createGalleryCard(mediaObject) {

        const {image, title, likes, video} = mediaObject;
        const mediaSource = `assets/images/media/${image || video}`;
        const gallery = document.querySelector(".photographer_gallery");
        
        const article = document.createElement( "article" );
        article.classList.add("card_photo");
    
        const linkLightbox = document.createElement("a");
        linkLightbox.setAttribute("title", title);
        linkLightbox.setAttribute("src", mediaSource);
        linkLightbox.setAttribute("href", mediaSource);
        linkLightbox.setAttribute("aria-haspopup","dialog");
        

        linkLightbox.addEventListener("click", openLightbox);
        const divMedia = document.createElement("div");
        divMedia.classList.add("card_image_container");
       
        // Afficher une vidéo ou une image
        if(mediaObject.image){
            const img = document.createElement( "img" );
            img.setAttribute("src", mediaSource);
            img.setAttribute("alt",  `${title}, closeup view`);
            divMedia.appendChild(img);
        }
        else {
            const vdo = document.createElement( "video" );
            const sourceElement = document.createElement("source");
            sourceElement.setAttribute("src", mediaSource);
            vdo.setAttribute("aria-label", `video ${title}, closeup view`);
            sourceElement.setAttribute("type", "video/mp4");
            vdo.appendChild(sourceElement);
            divMedia.appendChild(vdo);
        }

        const underMediaDiv = document.createElement("div");
        underMediaDiv.classList.add("card_body_container");
    
        const p = document.createElement( "p" );
        p.textContent = title;
    
        const nbLikes = document.createElement("span");
        nbLikes.textContent = likes;
    
        const heartIconButton = document.createElement("button");
        heartIconButton.classList.add("heart_icon-button");
        const heartIconImage = document.createElement("img");
        heartIconImage.setAttribute("src", "assets/icons/heart.svg");
        heartIconImage.setAttribute("alt", "bouton ajouter un coeur");
        heartIconButton.addEventListener("click", liked); 
        heartIconButton.appendChild(heartIconImage);

        function liked() {
    
            const totalLikes = document.querySelector(".likes")
            const isLiked = heartIconButton.classList.contains("isLiked")
            if (isLiked) {
                // Supprimer la classe isLiked et décrémenter le nombre de likes
                heartIconButton.classList.remove("isLiked")
                nbLikes.textContent = Number(nbLikes.textContent) - 1;
                totalLikes.textContent = Number(totalLikes.textContent) -1;
                return;
            }
           // Ajouter la classe isLiked et augmenter le nombre de likes
            heartIconButton.classList.add("isLiked")
            nbLikes.textContent = Number(nbLikes.textContent) + 1;
            totalLikes.textContent = Number(totalLikes.textContent) +1;
        }
        
        gallery.appendChild(article);
        linkLightbox.appendChild(divMedia);
        article.appendChild(linkLightbox);
        article.appendChild(underMediaDiv);
        underMediaDiv.appendChild(p);
        underMediaDiv.appendChild(nbLikes);
        underMediaDiv.appendChild(heartIconButton);
    
        // Fonction pour créer la lightbox au clic
        function openLightbox (e) {
            e.preventDefault();
            new Lightbox(mediaObject, photographerPage.photographerGallery);
        }
    }

    //  Fonction qui affichera les médias dans la galerie
    displayImages() {
        document.querySelector(".photographer_gallery").innerHTML="";
        this.photographerGallery.forEach(mediaObject => {
            this.createGalleryCard(mediaObject)
        });
    }
    
    // Fonction qui se lance lorsqu'on execute un tri
    updateGallery(newGallery) {
        this.photographerGallery = newGallery;
        this.displayImages();
    }
}


function removeAllChildrenNodes(parentNode) {
    while (parentNode.firstChild) {
        parentNode.removeChild(parentNode.firstChild)
    }
}



/* Fonction  tri*/
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
 
    // Touche  pour l'accessibilité du clavier

function onKeyUpPopularity(e) {
    if(e.key === "Enter") {
    sortByPopularity();
    hideOptions();
    }
} 
function onKeyUpDate(e) {
    if(e.key === "Enter") {
    sortByDate()
    hideOptions();
    }
}  
function onKeyUpTitle(e) {
    if(e.key === "Enter") {
    sortByTitle()
    hideOptions();
    }
}   
    // Trier par Popularité  likes > petits likes
function changeButtonName(newName) {
    document.querySelector(".btn-name").textContent = newName; 
}

document.querySelector(".align-sort").addEventListener("click", sortByPopularity);
document.querySelector(".align-sort").addEventListener("keyup",onKeyUpPopularity);

function sortByPopularity() {
    
    const arrayByLikes = photographerPage.photographerGallery.sort((a,b) => {
        a = a.likes;
        b = b.likes;
        return b - a;
    })
    changeButtonName("Popularité")
    photographerPage.updateGallery(arrayByLikes);
}
    // Trier par Date du plus récent au plus ancien
document.querySelector("#date").addEventListener("click", sortByDate); 
document.querySelector("#date").addEventListener("keyup",onKeyUpDate);

function sortByDate() {
    
    const arrayByDate = photographerPage.photographerGallery.sort((a,b) => {
        a = Date.parse(a.date); 
        b = Date.parse(b.date);
        return b - a;
    })
    changeButtonName("Date")
    photographerPage.updateGallery(arrayByDate);
}

    // Trier par titre par ordre alphabétique
document.querySelector("#title").addEventListener("click", sortByTitle); 
document.querySelector("#title").addEventListener("keyup",onKeyUpTitle);

function sortByTitle() {

    const arrayByTitle = photographerPage.photographerGallery.sort((a,b) => {
        a = a.title.toLowerCase();
        b = b.title.toLowerCase();
        return a < b ? -1 : a > b ? 1 : 0;
    })
    changeButtonName("Titre")
    photographerPage.updateGallery(arrayByTitle);
}

/* AFFICHAGE DES LIKES ET DES INFOS SUR LES PRIX */

// Afficher les likes
function displayLikes() {
    document.querySelector(".likes").textContent=sumOfLikes()
}


// Somme des likes
function sumOfLikes() {
    return photographerPage.photographerGallery.reduce((a, b) => a + b.likes, 0);
 }
 
// Afficher le prix
function displayPrice() {
    document.querySelector(".price").textContent=`${photographerPage.photographerData.price}€ /jour`
}

/* RÉCUPÉRATION DES DONNÉES POUR LA PAGE DU PHOTOGRAPHE */

//Récupérer toutes les données
async function getPhotographerData() {
    return await fetch("data/photographers.json")
    .then(responseData => responseData.json());
}

// UrlSearchParams
function getPhotographerId() {
    const currentUrl = new URL(location.href);
    const searchParams= new URLSearchParams(currentUrl.search);
    return searchParams.get("id")
}

async function init() {
    
    const result = await getPhotographerData();
    const photographerId = getPhotographerId();
    const selectedPhotographer = result.photographers.find(photographer=>photographer.id===Number(photographerId));
    const photographerGallery = result.media.filter(mediaObject=>mediaObject.photographerId===Number(photographerId));
    photographerPage = new PhotographerPage(selectedPhotographer, photographerGallery);
    photographerPage.displayPhotographerPresentation();
    sortByPopularity(); // Afficher la galerie, triée par popularité "par défaut".
    displayLikes();
    displayPrice();
}

init();
