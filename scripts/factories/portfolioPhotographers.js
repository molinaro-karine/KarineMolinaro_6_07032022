function portfolioPhotographersFactory(data) {
    let { photographerId, title, image, video, likes, price, id } = data;
    let alreadyLiked = false;
    
    function getPortfolioCardDOM() {
        const media = document.createElement('figure')
        media.tabIndex = -1;
        media.className = "portfolio__media";
        if (image) {
            media.innerHTML = `
        <a href="#" class="openLightbox" data-id="${id}" onclick="openLightbox(${id})"><img alt="${title}" 
            class="portfolio__media-img" data-id="${id}" src="../assets/medias/${image}" 
                 tabindex="0"
                aria-label="Titre de la photo${title}"/>
        </a>
        <div class="portfolio__media-text"">
            <p class="portfolio__media-text-title"> ${title}</p>
            <div class="portfolio__media-text-icon">
                <p class="like" id="nbLike_${id}"
                    aria-label="Nombre de likes de la photo ${likes}"tabindex="0">${likes}
                </p>
                <button onclick="likeMedia(${id})"><img src="../assets/icons/heart.svg" alt="likes" tabindex="0"/></button>
            </div>
        </div>
        `
        }
        if (video) {
            media.innerHTML = `
        <a href="#" class="openLightbox" data-id="${id}" onclick="openLightbox(${id})"><video alt="${title}" 
            class="portfolio__media-video"  data-id="${id}"  src="../assets/medias/${video}" type="video/mp4" tabindex="0"
            aria-label="Titre de la photo${title}"/></video>
        </a>
        <div class="portfolio__media-text">
            <p class="portfolio__media-text-title"> ${title}</p>
            <div class="portfolio__media-text-icon">
                <p class="like" id="nbLike_${id}" aria-label="Nombre de likes de la vidéo ${likes}"
                 tabindex="0">${likes}
                </p>
                <button onclick="likeMedia(${id})"><img src="../assets/icons/heart.svg" alt="likes" tabindex="0"/></button>
            </div>
        </div>
        `
        }
        return (media);
    }

    function like() {
        let totalLikes = parseInt(document.querySelector('#likesText').innerText);
        if (alreadyLiked) {
            likes--
            alreadyLiked = false;
            totalLikes--;
        } else {
            likes++;
            alreadyLiked = true;
            totalLikes++;
        }
        document.getElementById('nbLike_' + id).innerText = likes;
        document.getElementById('likesText').innerText = totalLikes;
        return alreadyLiked;
    }
        return { id, photographerId, title, image, video, price, likes, like, getPortfolioCardDOM }
    }
