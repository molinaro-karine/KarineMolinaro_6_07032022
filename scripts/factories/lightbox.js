/* CLASSE DE GESTION DE LA LIGHTBOX */

// eslint-disable-next-line no-unused-vars
class Lightbox{ 
    constructor(idActual,listMediaObject) {
        // Sur le listMediaObject, trouver l'élément avec l'id transmis dans le constructeur
        this.selectedImage = listMediaObject.find((data) => {
            if(data.id == idActual)
                return true;
        });
        this.closeLightbox =  this.closeLightbox.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this)
        this.listImage = listMediaObject; //Objet de l'élément transmis par l'id 
        this.nextPicture = this.nextPicture.bind(this);
        this.previousPicture = this.previousPicture.bind(this);
        this.openLightbox();
        document.addEventListener("keyup", this.onKeyUp)
    }


    onKeyUp(e) {
        if(e.key === "Escape") {
            this.closeLightbox(e)
        }
        else if(e.key === "ArrowLeft") {
            this.previousPicture(e)
        }
        else if(e.key === "ArrowRight") {
            this.nextPicture(e)
        }
        
    }

    displayImage (){ 
        const selectedImageSource  = `assets/images/media/${this.selectedImage.image}`;
        const selectedVideoSource = `assets/images/media/${this.selectedImage.video}`;
        const mediaDiv = document.querySelector(".lightbox_container");
       
        const mediaTitle = document.createElement("p");
        mediaTitle.classList.add("image-title");
        mediaTitle.setAttribute("tabindex", 0);
        mediaTitle.textContent = this.selectedImage.title;

        mediaDiv.innerHTML = "";

        if (this.selectedImage.image) {
            const imageDisplayed = document.createElement("img");
            imageDisplayed.setAttribute("src", selectedImageSource);
            imageDisplayed.setAttribute("alt", this.selectedImage.title);
            mediaDiv.appendChild(imageDisplayed);
        }
        else { 
            const videoDisplayed = document.createElement("video");
            videoDisplayed.setAttribute("controls", true);
            const videoSourceBalise = document.createElement("source");
            videoSourceBalise.setAttribute("src", selectedVideoSource);
            videoSourceBalise.setAttribute("type", "video/mp4");
            videoDisplayed.appendChild(videoSourceBalise);
            mediaDiv.appendChild(videoDisplayed);
        }

        mediaDiv.appendChild(mediaTitle);

    }

    openLightbox(){
        document.querySelector(".lightbox").style.display = "block";    
        this.displayImage()
        document.querySelector(".lightbox").focus();
        document.querySelector(".lightbox_close").addEventListener("click",this.closeLightbox);
        document.querySelector(".lightbox_next").addEventListener("click",this.nextPicture);
        document.querySelector(".lightbox_previous").addEventListener("click",this.previousPicture);
        document.querySelector(".image-title");
        document.querySelector(".lightbox").setAttribute("aria-hidden", false);
        document.querySelector("main").setAttribute("aria-hidden", true);
        document.querySelector("header").setAttribute("aria-hidden", true);
        
    }

    closeLightbox(e){
        e.preventDefault();
        document.querySelector(".lightbox_close").removeEventListener("click",this.closeLightbox);
        document.querySelector(".lightbox_next").removeEventListener("click",this.nextPicture);
        document.querySelector(".lightbox_previous").removeEventListener("click",this.previousPicture);
        document.removeEventListener("keyup",this.onKeyUp);
        document.querySelector(".lightbox").style.display = "none";
        document.querySelector(".lightbox").setAttribute("aria-hidden", true);
        document.querySelector("main").setAttribute("aria-hidden", false);
        document.querySelector("header").setAttribute("aria-hidden", false);
    }

    nextPicture(e){ // Clic droit
        e.preventDefault();
        const findCurrentPosition = (element) => element.id === this.selectedImage.id;
        const currentIndex = this.listImage.findIndex(findCurrentPosition); //Retourne l'index de position de l'image courante et garde la valeur
        const lastIndexOfArray = this.listImage.length -1; // Pour définir la position de la dernière image de la liste
        this.selectedImage = lastIndexOfArray === currentIndex ? this.listImage[0] : this.listImage[currentIndex+1];
        this.displayImage()
        document.querySelector(".image-title").focus();
    }

    previousPicture(e){ // Clic gauche
        e.preventDefault();
        const findCurrentPosition = (element) => element.id === this.selectedImage.id;
        const currentIndex = this.listImage.findIndex(findCurrentPosition); 
        const firstIndexOfArray = 0; // Pour définir la position de la première image de la liste
        const lastIndexOfArray = this.listImage.length -1;
        this.selectedImage = firstIndexOfArray === currentIndex ? this.listImage[lastIndexOfArray] : this.listImage[currentIndex-1];
        this.displayImage()
        document.querySelector(".image-title").focus();
    }
}
