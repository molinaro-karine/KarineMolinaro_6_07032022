


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
        const Price = document.createElement( 'p' );
        const City = document.createElement('p');
        const Tagline = document.createElement('tagline');
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
        City.className = 'location';
        Tagline.className = 'tagline';
        Price.className = 'price';

        h2.textContent = name;
        City.textContent = `${city}, ${country}`;
        Price.textContent = `${price} euro/ jours`;
        Tagline.textContent = tagline;
        // affichage du prix
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(divInformation);
        divInformation.appendChild(City);
        //article.appendChild(h4);
        //divInformation.appendChild(cCountry);
        divInformation.appendChild(Tagline);
        divInformation.appendChild(Price);
        // appeler price
        return (article);
    }
    return { name, picture, price, city, country, tagline, id, getUserCardDOM };
    // ajout de price
}