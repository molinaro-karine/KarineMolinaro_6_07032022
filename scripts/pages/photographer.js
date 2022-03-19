//Récupère l'id du photographe dans l'URL
const id = (new URL(document.location)).searchParams.get('id'); 

// Fonction d'obtention des photographes
async function getPhotographers() {
  const response = await fetch("../data/photographers.json")
  const data = await response.json();
  return ({
      photographers: data.photographers
  })
  }
  
  // Obtentir des médias
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
  const photographersHeader = document.querySelector(".infosContainer");

  const photograph = photographers.find((e) => e.id == id);
  const photographPage = photographerPageFactory(photograph);
  const pageUserCardDOM = photographPage.getPageUserCardDOM();
  photographersHeader.append(pageUserCardDOM);
}
// Fonction d'initialisation
async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  // Affiche les photographes
  displayData(photographers);
}
    
init();