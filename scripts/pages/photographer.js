//Récupère l'id du photographe dans l'URL
const id = (new URL(document.location)).searchParams.get('id'); 
let mediaArray = [];
let portfolioArray = [];
let likesText = 0;


// Fonction d'obtention des photographes
async function getPhotographers() {
  const response = await fetch("../data/photographers.json")
  const data = await response.json();
  return ({
      photographers: data.photographers
  })
  }
  // Fonction d'obtention des médias
async function getMedias() {
  const response = await fetch("../data/photographers.json")
  const data = await response.json();
  mediaArray = data.media.filter((e) => e.photographerId == id);
  return ({
      medias: mediaArray
  })
}

  // Affichage du photographe
async function displayData(photographers) {
 
  const photographe = photographers.find((e) => e.id == id);
  photographerPageFactory(photographe).getPageUserCardDOM();
}



// Affichage des medias
async function displayMedia(medias) {
  const photographersMedias = document.querySelector(".portfolioContainer");
  medias.forEach((media) => {
    const portfolio = portfolioPhotographersFactory(media);
    portfolioArray.push(portfolio);
    const portfolioCardDOM = portfolio.getPortfolioCardDOM();
    photographersMedias.append(portfolioCardDOM);
  })
}

// Affichage du prix du photographe
function displayPrice(photographers){
  priceText = ""
   const container = document.querySelector('.pricing')
   const price = document.createElement('p')
   price.className = "pricing__price"
   photographers.forEach((photographer) =>{
       if (photographer.id == id){
          priceText += photographer.price
       }
       price.innerHTML = `
          <span aria-label="Tarif du photographe ${priceText}"
            tabindex="0">${priceText}€ / jour</span>
       `
       container.prepend(price)
   })
}
//Affichage des likes
function displayLikes(medias){
    likesText = ""
    const container = document.querySelector('.pricing')
    const likes = document.createElement('p')
    likes.className = "nombLikes"
    medias.forEach((media) =>{
        if (media.id == id){
            likesText += media.likes
         }
         likes.innerHTML = `
            <span id="likesText"
            aria-label="Nombre de likes total du photographe ${likesText}"
            tabindex="0">${likesText}</span>
            <img src="../assets/icons/heart.svg" alt="like"/>   
         `
         container.prepend(likes);
     })
  }
// Fonction de like d'un media
function likeMedia(id) {
    const portfolioToLike = portfolioArray.find(p => p.id === id)
    likeCount = document.getElementById('likes.text');
    if (portfolioToLike.like()) {
        likesText.innerText = +likesText.innerText + 1;
    } else {
        likesText.innerText = +likesText.innerText - 1;
    }

}



// Fonction de tri des médias
function sortMedia() {
  const menu = document.querySelector('.filterContainer__filter');
  menu.addEventListener('change', function (e) {
      var expression = e.target.value;
      document.querySelector('.portfolioContainer').innerHTML = "";
      switch (expression) {
          case 'title':
              portfolioArray.sort((a, b) => {
                  if (a.title < b.title) {
                      return -1;
                  }
                  if (a.title > b.title) {
                      return 1;
                  }
                  return 0;
              })
              break;
              case 'popularity':
                  portfolioArray.sort((a,b) =>{
                      if(a.likes < b.likes) {
                          return 1;
                      }
                      if(a.likes > b.likes) {
                          return -1;
                      }
                      return 0;
                  })
                  break;
                  case 'date':
                  portfolioArray.sort((a,b) =>{
                      if(a.date > b.date){
                          return 1;
                      }
                      if(a.date < b.date) {
                          return -1;
                      }
                      return 0;
                  })
                  break;
                }
      const photographersMedias = document.querySelector(".portfolioContainer");
      portfolioArray.forEach((portfolio) => {
          const portfolioCardDOM = portfolio.getPortfolioCardDOM();
          photographersMedias.append(portfolioCardDOM);
      });
      
  })
};

// Affichage de la lightbox 
function openLightbox(id) {
  const lightbox = lightboxFactory(mediaArray, id)
  lightbox.getLightboxDOM();
}


// Fonction d'initialisation
async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  // Affiche les photographes
  displayData(photographers);
  // Récupère les données des médias
  const { medias } = await getMedias();
  // Affiche les données des médias
  displayMedia(medias);
  // Affiche le tarif journalier du photographe
  displayPrice(photographers);
  // Fonction de tri des médias 
  sortMedia(medias);
  // affichage des likes
  displayLikes(medias)

}
    
init();