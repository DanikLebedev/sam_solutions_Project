//show films list

document.querySelector('body').addEventListener('load', getFilms)

async function getFilms() {
    const list = document.querySelector('.films__list')
    const url = 'https://swapi.co/api/films';
    const response = await fetch(url);
    const result = await response.json();
    const filmsArr = result.results;
    console.log(filmsArr)
    const loader = document.querySelector('.lds-ring');

    if (list) {
        loader.style.display = 'none'
    }

    filmsArr.forEach(film => {
        const listItem = document.createElement('li');
        listItem.setAttribute('id', `film${film.episode_id}`);
        listItem.innerHTML = `
                <h3>${film.title}</h3>
                <p>Release : ${film.release_date}</p>
                <p>Director : ${film.director}</p>
                <p>Description: <br> ${film.opening_crawl}</p>
                <button id=${film.episode_id}>Show More</button>
        `;
        list.appendChild(listItem);
    })

    const showBtns = document.querySelectorAll('li button');
    showBtns.forEach(item => {
        item.addEventListener('click', async () => {
            const url = `https://swapi.co/api/films`
            const response = await fetch(url);
            const result = await response.json();
            console.log(result)

        })
    })


}









