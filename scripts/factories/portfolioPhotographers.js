function portfolioPhotographersFactory(data) {
    let { photographerId, title, image, video, price, id } = data;
    
    
    function getPortfolioCardDOM() {
        const media = document.createElement('figure')
        
        media.className = "portfolio__media";
        if (image) {
            media.innerHTML = `
            <img alt="${title}" 
                class="portfolio__media-img" 
                src="../assets/medias/${image}" 
                onclick="openLightbox(${id})"
                tabindex="0"
                aria-label="Titre de la photo${title}"/>
            <div class="portfolio__media-text"">
                <p class="portfolio__media-text-title"> ${title}</p>
                <div class="portfolio__media-text-icon">
                <img src="../assets/icons/heart.svg"/>
                </div>
            </div>
            `
            }
            if (video) {
                media.innerHTML = `
            <video class="portfolio__media-video" 
                src="../assets/medias/${video}" 
                type="video/mp4" 
                onclick="openLightbox(${id})"
                tabindex="0"
                aria-label="Titre de la vidéo ${title}"></video>
            <div class="portfolio__media-text">
                <p class="portfolio__media-text-title"> ${title}</p>
                <div class="portfolio__media-text-icon">
                    <img src="../assets/icons/heart.svg"/>
                </div>
            </div>
            `
            }
            return (media);
        }

  
    return { id, photographerId, title, image, video, price, getPortfolioCardDOM }
}


