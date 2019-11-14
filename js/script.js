//show films list

let films;

function sortItem() {
    let finalGroup = []
    const selectSort = document.querySelector('#sort__select');
    selectSort.addEventListener('change', () => {
        const selectValue = selectSort.options[selectSort.selectedIndex].value;
        switch (selectValue) {
            case ('date'):
                films.sort((a, b) => {
                    let aa = a.release_date.split('-');
                    let bb = b.release_date.split('-');
                    return aa[0] - bb[0];

                });
                break;
            case ('episode_id'):
                films.sort((a, b) => {
                    return a.episode_id - b.episode_id
                });
                break
        }
       console.log(films)
    })

}

async function renderFilms() {
    const list = document.querySelector('.films__list')
    const url = 'https://swapi.co/api/films';
    const response = await fetch(url);
    const result = await response.json();
    films = result.results;
    const loader = document.querySelector('.lds-ring');

    if (list) {
        loader.style.display = 'none'
    }

    films.forEach(film => {
        const listItem = document.createElement('li');
        listItem.setAttribute('id', `film${film.episode_id}`);
        listItem.innerHTML = `
                <div class=films-wrapper${film.episode_id}>
                <h3>${film.title}</h3>
                <p>Release : ${film.release_date}</p>
                <p>Director : ${film.director}</p>
                <p>Description: <br> ${film.opening_crawl}</p>
                <button id=${film.episode_id}>Show More</button></div>
                <div class=characters-film${film.episode_id}></div>
                <div class=planets-film${film.episode_id}></div>
                <div class=ships-film${film.episode_id}></div>
        `;
        list.appendChild(listItem);

    })

}

function showMore() {
    const showBtns = document.querySelectorAll('li button');
    showBtns.forEach(item => {
        item.addEventListener('click', async () => {

            const url = `https://swapi.co/api/films/${item.id}`
            const response = await fetch(url);
            const result = await response.json();

            const charArr = result.characters;
            const planetArr = result.planets;
            const shipsArr = result.starships

            const infoWrap = document.querySelector(`.characters-film${item.id}`);
            const h3Characters = document.createElement('h3');
            h3Characters.innerHTML = 'Characters';
            infoWrap.appendChild(h3Characters);


            charArr.forEach(async char => {
                const charResponse = await fetch(char)
                const charResult = await charResponse.json();
                const charNames = charResult.name
                infoWrap.innerHTML += `${charNames}, `
            })


            const planetWrapper = document.querySelector(`.planets-film${item.id}`);
            const h3Planets = document.createElement('h3');
            h3Planets.innerHTML = 'Planets';
            planetWrapper.appendChild(h3Planets);

            planetArr.forEach(async planet => {
                const planetResponse = await fetch(planet);
                const planetResult = await planetResponse.json();
                const planetNames = planetResult.name;
                planetWrapper.innerHTML += `${planetNames}, `

            })

            const shipWrapper = document.querySelector(`.ships-film${item.id}`)
            const h3Ships = document.createElement('h3');
            h3Ships.innerHTML = 'Starships from film'
            shipWrapper.appendChild(h3Ships);
            let starships = []
            shipsArr.forEach(async ship => {
                starships.push(ship)
                const shipResponse = await fetch(ship);
                const shipResult = await shipResponse.json();
                const shipNames = shipResult.name;
                const shipModels = shipResult.model;
                shipWrapper.innerHTML += `Name: ${shipNames}, model: ${shipModels} <br><br>`

            })
            console.log(starships)
           starships.forEach(async (item) => {
               const starshipResp = await fetch(item)
               const starres = await starshipResp.json()
               console.log(starres)
           })


        })
    })

}


async function init() {
    await renderFilms();
    sortItem()
    await showMore()

}









