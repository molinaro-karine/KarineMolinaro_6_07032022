

function photographerPageFactory(data) {
    let { name, portrait, city, country, tagline} = data;
    const picture = `assets/photographers/${portrait}`;
    
    
    function getPageUserCardDOM() {
        const container = document.querySelector('.infosContainer')

        container.innerHTML = ` 
        <div class="infos">
            <div class="infos-title">
                <h1 class="infos-name">${name}</h1>
            </div>
            <div class="infos-subtitle">
            <p class="location" 
                role="text" >${city}, ${country}</p>
            <p class="tagline" 
                role="text" 
                aria-label="Devise du photographe">${tagline}</p>
            </div>
        </div>
        <div class="infos__contact">
            <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
        </div>
        <div class="profilPicture">
            <img src="${picture}" 
            alt="Photo de ${name}">
        </div>
        `

        const modal = document.querySelector('.modal__subtitle-text')
        modal.innerHTML = `
        ${name}
        `
        
        return (container);
    }
    return { name, portrait, getPageUserCardDOM }
}