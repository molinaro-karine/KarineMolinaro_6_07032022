// Affiche le formulaire modal 

// eslint-disable-next-line no-unused-vars
function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.setAttribute("aria-hidden", false);
    document.querySelector("main").setAttribute("aria-hidden", true);
    document.querySelector("header").setAttribute("aria-hidden", true);
    modal.addEventListener("keyup", keyUpModal);
	modal.style.display = "block";
    modal.focus();
    document.querySelector(".contact_form").addEventListener("keyup", keyUpContactForm);
}

function keyUpContactForm(event) {
    //touche entrée ne pas soumettre à moins que le focus ne soit sur le bouton
    if(event.key === "Enter" && !event.target.matches(".submit_button")) {
        event.preventDefault()
    }
}
// ferme la modale si l'utilisateur appuie sur escape
function keyUpModal(event) {
    event.preventDefault()
    if(event.key==="Escape") {
        closeModal()
    }
}
// Masquer le modal du formulaire
function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.setAttribute("aria-hidden", true);
    document.querySelector("main").setAttribute("aria-hidden", false);
    document.querySelector("header").setAttribute("aria-hidden", false);
    modal.removeEventListener("keyup", keyUpModal);
    modal.style.display = "none";
    document.querySelector(".contact_button").focus();
}
// On crée le gestionnaire d'événement interceptant le clic du bouton de soumission
document.querySelector(".submit_button").addEventListener("click", submitModal);

function submitModal(e) {
    e.preventDefault();
    const nameValue = document.querySelector("#name").value;
    const lastNameValue = document.querySelector("#lastname").value;
    const emailValue = document.querySelector("#email").value;
    const messageValue = document.querySelector("#message").value;
// On envoie les quatres champs dans la console
    console.log( JSON.stringify(
        {
            name: nameValue,
            lastname: lastNameValue,
            email: emailValue,
            message: messageValue,
        },null, 2
    ))
   
    closeModal()
}
