function photographerFactory(data) {
    const { name, id, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        article.innerHTML = `
        <a class="title" 
        href="photographer.html?id=${id}">
            <img src="${picture}" alt="${name}"/>
            <h2>${name}</h2>
        </a>
        <div class="subtitle">
            <p class="location">${city}, ${country}</p>
            <p class="tagline">${tagline}</p>
            <p class="price">${price}€/jour</p>
        </div>
        `
        return (article);
    }
    return { name, picture, city, country, tagline, price, getUserCardDOM }
}