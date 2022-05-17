function mediaFactory(mediaObject) {
    const {image, title, likes, video, id} = mediaObject;
    const mediaSource = `assets/images/media/${image || video}`;
    const gallery = document.querySelector(".photographer_gallery");

    function createGalleryCard() {
        const article = document.createElement( "article" );
        article.classList.add("card_photo");
    
        const linkLightbox = document.createElement("a");
        linkLightbox.setAttribute("title", title);
        linkLightbox.setAttribute("src", mediaSource);
        linkLightbox.setAttribute("href", mediaSource);
        linkLightbox.setAttribute("data-id", id);
        linkLightbox.setAttribute("aria-haspopup","dialog");
        

        // linkLightbox.addEventListener("click", openLightbox);
        const divMedia = document.createElement("div");
        divMedia.classList.add("card_image_container");
       
        // Afficher une vidéo ou une image
        if(mediaObject.image){
            const img = document.createElement( "img" );
            img.setAttribute("src", mediaSource);
            img.setAttribute("alt",  `${title}, vue rapprochée`);
            divMedia.appendChild(img);
        }
        else {
            const vdo = document.createElement( "video" );
            const sourceElement = document.createElement("source");
            sourceElement.setAttribute("src", mediaSource);
            vdo.setAttribute("aria-label", `video ${title}, vue rapprochée`);
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
    
        return article
    }
   
    // Tri par popularité
    function sortByPopularity() {
        const arrayByLikes = mediaObject.sort((a,b) => {
            a = a.likes;
            b = b.likes;
            return b - a;
        })
        changeButtonName("Popularité")
        hideOptions();
        return(arrayByLikes);
    }


    // Tri par date
    function sortByDate() {
        const arrayByDate = mediaObject.sort((a,b) => {
            a = Date.parse(a.date); 
            b = Date.parse(b.date);
            return b - a;
        })
        changeButtonName("Date")
        hideOptions();
        return(arrayByDate);
    }


    // Tri alphabetique
    function sortByTitle() {

        const arrayByTitle = mediaObject.sort((a,b) => {
            a = a.title.toLowerCase();
            b = b.title.toLowerCase();
            return a < b ? -1 : a > b ? 1 : 0;
        })
        changeButtonName("Titre")
        hideOptions();
        return(arrayByTitle);
    }
    
    return {title, likes, createGalleryCard, sortByPopularity, sortByDate, sortByTitle};
}