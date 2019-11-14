//show films list

// let films;

// fetch('https://swapi.co/api/films').then(function(response) {
//     return response.json();
// }).then(function(json) {
//     products = json;
//     initialize();
// }).catch(function(err) {
//     console.log('Fetch problem: ' + err.message);
// });

// function initialize() {
//     console.log(films)
// }

async function getFilms() {
    const list = document.querySelector('.films__list')
    const url = 'https://swapi.co/api/films';
    const response = await fetch(url);
    const result = await response.json();
    const filmsArr = result.results;
    const loader = document.querySelector('.lds-ring');

    if (list) {
        loader.style.display = 'none'
    }



    // const sortOptions = document.querySelectorAll('#sort__select option');
    //

    // selectSort.addEventListener('change', async (e) => {
    //     console.log(e.target)
    //     sortOptions.forEach(item => {
    //
    //         if (item.value === 'date') {
    //             console.log('date')
    //         }
    //         if (item.value === 'episode_id') {
    //             console.log('episode_id')
    //         }
    //
    //     })
    // })

    // sortOptions.forEach(option => {
    //     console.log(option);
    //     if (option.selected && option.value === 'date') {
    //         filmsArr.sort((a,b) => {
    //             let aa = a.release_date.split('-');
    //             let bb = b.release_date.split('-');
    //             return  aa[0] - bb[0];
    //
    //         });
    //     }
    //     if (option.selected && option.value === 'episode_id') {
    //         filmsArr.sort((a,b) => {
    //             location.reload()
    //             return a.episode_id - b.episode_id
    //         });
    //     }
    // })

    console.log(filmsArr)
    filmsArr.forEach(film => {
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
        `;
        list.appendChild(listItem);

    })

    const showBtns = document.querySelectorAll('li button');
    showBtns.forEach(item => {
        item.addEventListener('click', async () => {
            const url = `https://swapi.co/api/films/${item.id}`
            const response = await fetch(url);
            const result = await response.json();
            const charArr = result.characters;
            const planetArr = result.planets;
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
                const planetNames= planetResult.name;
                planetWrapper.innerHTML += `${planetNames}, `

            })


        })
    })


}










