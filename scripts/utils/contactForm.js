function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}
// DOM Elements
const modal = document.querySelector(".contact_modal");
const formData = document.querySelectorAll(".formData");
const closeModalBtn = document.querySelectorAll("#close");


//form elements
const form = document.getElementById("form");
const firstName = document.getElementById ('first');
const lastName = document.getElementById ('last');
const email = document.getElementById ('email');
const message = document.getElementById ('message');
const prenomNom = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;


// Form fields validation
function validFirstName(){
    if (firstName.value.trim() === '') {
       setError(firstName, 'Veuillez entrer un prénom.');
        return false;
   
   }else if (firstName.value.length <= 1){
       setError(firstName, 'Veuillez entrer 2 caractères ou plus pour le champ du prénom.');
       return false;

   } else if (prenomNom.test(firstName.value) == false){
    setError(firstName, 'Votre prénom doit comporter que des lettres.');
    return false;
   }
   setSuccess(firstName);
      return true;}
   
   
   function validLastName(){
   if (lastName.value.trim()=== '') {
       setError(lastName, 'Veuillez entrer un nom.');
       return false;
   
   }else if(lastName.value.length <= 1){
       setError(lastName, 'Veuillez entrer 2 caractères ou plus pour le champ du nom.');
       return false;
   } else if (prenomNom.test(lastName.value) == false){
    setError(lastName, 'Votre nom doit comporter que des lettres.');
    return false;
   }
      setSuccess(lastName);
      return true;
       
   }
   
   function validEmail(){
   const mailRegex = /^[a-zA-Z][a-zA-Z0-9\-\_\.]+@[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}$/;
   if(email.value ==='') {
       setError(email, 'Veuillez entrer une adresse email')
       return false;
   }else if (!email.value.match(mailRegex)){
       setError(email, 'Veuillez entrer une adresse email valide.');
       return false;
   }
       setSuccess(email);
       return true;
       
   }
   function validMessage(){
    if (message.value.trim()=== '') {
        setError(message, 'Veuillez écrire votre message.');
        return false;
    
    }else if(message.value.length <= 10){
        setError(message, 'Veuillez entrer 10 caractères ou plus pour le champ du message.');
        return false;
    }
       setSuccess(message);
       return true;
        
    }
   // For all fields validation
function forAllFieldsValidation() {
	validFirstName();
	validLastName();
	validEmail();
	validMessage();

  }
  
  function formValidation() {
if (validFirstName() === true &&
	validLastName() === true &&
	validEmail() === true &&
    validMessage() === true) {
    return true;
}
    return false;
}

// Send form
form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (formValidation() == true) {
        closeModal();
        document.querySelector('form').reset();
    } else {
        forAllFieldsValidation();
    }
});
//Set error or success states for input checks
const setError = (element, message) => {
	const formData = element.parentElement;
	const errorDisplay = formData.querySelector('.error');

	errorDisplay.innerText = message;
}
const setSuccess = element =>{
	const error =element.parentElement;
	const errorDisplay = error.querySelector('.error');

	errorDisplay.innerText = '';
	error.classList.add('success');
	error.classList.remove('error');
};