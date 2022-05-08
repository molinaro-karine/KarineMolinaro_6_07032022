    // Récupération des photographes
    async function getPhotographers() {
        const jsonData = await fetch("data/photographers.json")
        .then(responseData => responseData.json())
        
        return ({
            photographers: jsonData.photographers
        })
    }
    
    //Affichage des photographes
    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");
        // Pour chaque photographe, est crée un nouvel élément dans le DOM
        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }
    
    //Initialisation
    async function init() {
        // Récupère les datas des photographes
        const response = await getPhotographers();
        const photographers = response.photographers;
        displayData(photographers);
    }
    init();
    