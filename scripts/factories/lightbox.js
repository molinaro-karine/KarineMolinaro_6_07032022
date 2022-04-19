function lightboxFactory(medias, id) {
    let index = medias.findIndex(m => m.id === id);

    function getLightboxDOM() {

        const lightbox = document.querySelector(".lightbox");
        lightbox.setAttribute("tabindex", "0");
        const container = document.createElement("div");
        container.className = "container";
        container.innerHTML = "";
        container.setAttribute("aria-label", "Aperçu du média")
        document.querySelector('.lightbox').innerHTML = "";

        const closeLightbox = document.createElement("img");
        closeLightbox.src = "../assets/icons/close.svg";
        closeLightbox.className = "close"
        closeLightbox.setAttribute("alt", "Fermer l'apperçu")
        closeLightbox.setAttribute("tabindex", "0");


        const nextLightbox = document.createElement("img");
        nextLightbox.src = "../assets/icons/next.svg";
        nextLightbox.className = "next";
        nextLightbox.setAttribute("alt", "Media suivant")
        nextLightbox.setAttribute("tabindex", "0");

        const previousLightbox = document.createElement("img");
        previousLightbox.src = "../assets/icons/previous.svg";
        previousLightbox.className = "previous";
        previousLightbox.setAttribute("alt", "Media précédent")
        previousLightbox.setAttribute("tabindex", "0");

        // Au clic sur l'element de fermeture
        closeLightbox.addEventListener('click', () => {
            lightbox.style.display = "none"
        })

        window.addEventListener('keydown', function (e){
            if (e.key === "Escape" || e.key === "Esc") {
               lightbox.style.display = "none"
            }
        })        


        lightbox.style.display = "block";
        if (medias[index].image) {
            const box = document.createElement("div");
            box.innerHTML = `
            <img alt="${medias[index].title}" class="media" src="../assets/medias/${medias[index].image}"/>
            `
            nextLightbox.addEventListener('click', () => {
                if (index < medias.length - 1) {
                    index++
                } else {
                    index = 0;
                }
                getLightboxDOM();
            });
            previousLightbox.addEventListener('click', () => {
                if (index > 0) {
                    index--
                } else {
                    index = medias.length - 1;
                }
                getLightboxDOM();
            });
            container.appendChild(box);
        }

        if (medias[index].video) {
            const box = document.createElement("div");
            box.innerHTML = `
            <video controls class="media" src="../assets/medias/${medias[index].video}"/>
            `
         
            nextLightbox.addEventListener('click', () => {
                index++;
                getLightboxDOM();
            });
            previousLightbox.addEventListener('click', () => {
                index--;
                getLightboxDOM();
            });
            container.appendChild(box)
        }
       
        
        container.appendChild(closeLightbox)
        container.appendChild(nextLightbox)
        container.appendChild(previousLightbox)
        lightbox.appendChild(container);
    }
    return { getLightboxDOM };
}