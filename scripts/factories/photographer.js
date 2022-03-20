function photographerPageFactory(data) {
    const { name, portrait, city, country, tagline } = data;

    const picture = `assets/photographers/${portrait}`;

    function getPageUserCardDOM() {
        const container = document.querySelector('.infosContainer')

        container.innerHTML = ` 
        <div class="infos">
            <div class="infos-title">
                <h2 class="infos-name">${name}</h2>
            </div>
            <div class="infos-subtitle">
                <p class="location">${city}, ${country}</p>
                <p class="tagline">${tagline}</p>
            </div>
        </div>
        <div class="infos__contact">
            <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
        </div>
        <div class="profilPicture">
            <img src="${picture}">
        </div>
        `

        const modal = document.querySelector('.modalSubtitle-text')
        modal.innerHTML = `
        ${name}
        `
        return (container);
    }
    return { name, portrait, getPageUserCardDOM }
}