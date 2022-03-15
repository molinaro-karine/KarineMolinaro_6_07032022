


function photographerFactory(data) {
    const { name, portrait, price, city, country, tagline, id } = data;
    // j'ai ajouté price

    const picture = `assets/photographers/${portrait}`;

    /*
        Make card DOM then return element to the DisplayData function
    */
    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        const pPrice = document.createElement( 'p' );
        const cCity = document.createElement('p');
        const tTagline = document.createElement('tagline');
        const divInformation = document.createElement('div');
        //création de la constante

        /*
            Expression litterale :
                - Pour afficher le contenu d'une variable :
                    ${nomDeLaVariable}
                - Cette écriture doit se faire entre les backtick ``
        */

        // Article
        // const artcle = `<article>
        //                     <a href="photographer.html?id=${id}">
        //                         <img src="${picture}" alt="">
        //                         <p>${price}</p>
        //                     </a>
        //                 </article>`;

        img.setAttribute('src', picture);

        const h2 = document.createElement( 'h2' );

        divInformation.className = 'informations';
        cCity.className = 'location';
        tTagline.className = 'tagline';
        pPrice.className = 'price';

        h2.textContent = name;
        cCity.textContent = `${city}, ${country}`;
        pPrice.textContent = `${price} euro/ jours`;
        tTagline.textContent = tagline;
        // affichage du prix
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(divInformation);
        divInformation.appendChild(cCity);
        //article.appendChild(h4);
        //divInformation.appendChild(cCountry);
        divInformation.appendChild(tTagline);
        divInformation.appendChild(pPrice);
        // appeler price
        return (article);
    }
    return { name, picture, price, city, country, tagline, id, getUserCardDOM };
    // ajout de price
}