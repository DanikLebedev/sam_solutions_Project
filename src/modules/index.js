//show films list
window.addEventListener('load', init());

async function init() {
  await getFilms();
  sortItem();
  await showMore();
  searchElem();
  searchData();
}

let films;
let charArr;
let planetArr;
let shipsArr;

async function getFilms() {
  const url = 'https://swapi.co/api/films';
  const response = await fetch(url);
  const result = await response.json();
  films = result.results;

  films.sort((a, b) => {
    let aa = a.release_date.split('-');
    let bb = b.release_date.split('-');
    return aa[0] - bb[0];
  });

  films.map((item, index) => {
    return (item.episode_id = index + 1);
  });

  renderFilms();
}

function searchElem() {
  const searchInp = document.querySelector('#search__input');
  const searchBtn = document.querySelector('.search__button');
  const articles = document.querySelectorAll('.film-item');
  const wrapper = document.querySelector('.films__list');

  searchBtn.addEventListener('click', e => {
    e.preventDefault();
    const searchText = new RegExp(searchInp.value.trim(), 'i');
    articles.forEach(arcticle => {
      const filmTitle = arcticle.querySelector(`*`);
      if (!searchText.test(filmTitle.textContent)) {
        arcticle.remove();
      } else {
        wrapper.appendChild(arcticle);
      }
    });
    searchInp.value = '';
  });
}

function fetchSearchData(selectValue, searchInp) {
  const url = `https://swapi.co/api/${selectValue}/?search=${searchInp}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const results = data.results;
      displaySearchResults(results);
    })
    .catch(() => console.log('An error occurred'));
}

function displaySearchResults(results) {
  const modal = document.querySelector('.modal');
  modal.innerHTML = '';
  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = 'Close';
  closeBtn.setAttribute('id', 'btn-close');
  modal.appendChild(closeBtn);
  document.querySelector('#btn-close').addEventListener('click', () => {
    modal.style.display = 'none';
  });
  modal.style.display = 'block';
  for (let props in results[0]) {
    let li = document.createElement('li');
    li.innerHTML = `${props} : ${results[0][props]}`;
    modal.appendChild(li);
  }
}

function searchData() {
  const searchSelect = document.querySelector('#select_search_settings');
  const searchForm = document.querySelector('.search_api_form');
  searchSelect.addEventListener('change', () => {
    let selectValue = searchSelect.options[searchSelect.selectedIndex].value;
    console.log(selectValue);
    searchForm.addEventListener('submit', e => {
      e.preventDefault();
      const searchInp = document.querySelector('#search__input_api').value;
      const searchQuery = searchInp.trim();
      fetchSearchData(selectValue, searchQuery);
    });
  });
}

function sortItem() {
  const list = document.querySelector('.films__list');
  const selectSort = document.querySelector('#sort__select');
  selectSort.addEventListener('change', async () => {
    const selectValue = selectSort.options[selectSort.selectedIndex].value;
    switch (selectValue) {
      case 'date':
        list.innerHTML = `
                <div class="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>`;

        films.sort((a, b) => {
          let aa = a.release_date.split('-');
          let bb = b.release_date.split('-');
          return aa[0] - bb[0];
        });
        await renderFilms();
        await showMore();
        await searchElem();
        break;

      case 'characters_quantity':
        list.innerHTML = `
                <div class="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>`;
        films.sort((a, b) => {
          return b.characters.length - a.characters.length;
        });
        await renderFilms();
        await showMore();
        await searchElem();
        break;
    }
  });
}

function renderFilms() {
  const list = document.querySelector('.films__list');
  const loader = document.querySelector('.lds-ring');

  if (list) {
    loader.style.display = 'none';
  }
  films.forEach(film => {
    const listItem = document.createElement('li');
    listItem.setAttribute('id', `film${film.episode_id}`);
    listItem.setAttribute('class', `film-item`);
    listItem.innerHTML = `
                <div class=films-wrapper${film.episode_id}>
                <h3 class=films-title>${film.title}</h3>
                <p>Release : ${film.release_date}</p>
                <p>Director : ${film.director}</p>
                <p>Description: <br> ${film.opening_crawl}</p>
                <button id=${film.episode_id}>Show More</button></div>
                <div class=characters-film${film.episode_id}>
                    <ul></ul>
                </div>
                <div class=planets-film${film.episode_id}>
                     <ul></ul>
                 </div>
                <div class=ships-film${film.episode_id}>
                    <ul></ul>
                </div>
        `;
    list.appendChild(listItem);
  });
}

function showMore() {
  const showBtns = document.querySelectorAll('li button');
  showBtns.forEach(item => {
    const infoCharactersWindow = document.querySelector('.modal');
    item.addEventListener('click', async () => {
      item.disabled = true;
      const url = `https://swapi.co/api/films/${item.id}`;
      const response = await fetch(url);
      const result = await response.json();

      charArr = result.characters;
      planetArr = result.planets;
      shipsArr = result.starships;

      const infoWrap = document.querySelector(`.characters-film${item.id} ul`);
      const h3Characters = document.createElement('h3');
      h3Characters.innerHTML = 'Characters';
      infoWrap.appendChild(h3Characters);
      charArr.forEach(async char => {
        const charResponse = await fetch(char);
        const charResult = await charResponse.json();
        const listItem = document.createElement('li');
        listItem.setAttribute('class', 'list-items');
        listItem.innerHTML = charResult.name;
        infoWrap.appendChild(listItem);
        listItem.addEventListener('click', () => {
          if (listItem.innerHTML == charResult.name) {
            infoCharactersWindow.style.display = 'block';
            infoCharactersWindow.innerHTML = `
                            <h3>Name: ${charResult.name}</h3>
                            <li>Birth Year: ${charResult.birth_year}</li>
                            <li>Weight: ${charResult.mass}</li>
                            <li>Height: ${charResult.height}</li>
                            <li>Skin color: ${charResult.skin_color}</li>
                            <li>Eye color: ${charResult.eye_color}</li>
                            <li>Hair color: ${charResult.hair_color}</li>
                            <li>Gender: ${charResult.gender}</li>
                            <button id="btn-close">Close</button>
                        `;
          }
          document.querySelector('#btn-close').addEventListener('click', () => {
            infoCharactersWindow.style.display = 'none';
          });
        });
      });

      const planetWrapper = document.querySelector(`.planets-film${item.id} ul`);
      const h3Planets = document.createElement('h3');
      h3Planets.innerHTML = 'Planets';
      planetWrapper.appendChild(h3Planets);

      planetArr.forEach(async planet => {
        const planetResponse = await fetch(planet);
        const planetResult = await planetResponse.json();
        const planetItem = document.createElement('li');
        const planetNames = planetResult.name;
        planetItem.classList.add('list-items');
        planetItem.innerHTML = `${planetNames}`;
        planetWrapper.appendChild(planetItem);

        planetItem.addEventListener('click', () => {
          if (planetItem.innerHTML == planetNames) {
            infoCharactersWindow.style.display = 'block';
            infoCharactersWindow.innerHTML = `
                            <h3>Planet name: ${planetNames}</h3>  
                            <li>Climate: ${planetResult.climate}</li>      
                            <li>Diameter: ${planetResult.diameter}</li>      
                            <li>Gravity: ${planetResult.gravity}</li>      
                            <li>Population: ${planetResult.population}</li>      
                            <li>Terrain: ${planetResult.terrain}</li>      
                            <li>Orbital period: ${planetResult.orbital_period}</li>      
                            <button id="btn-close">Close</button>
                        `;
          }
          document.querySelector('#btn-close').addEventListener('click', () => {
            infoCharactersWindow.style.display = 'none';
          });
        });
      });

      const shipWrapper = document.querySelector(`.ships-film${item.id} ul`);
      const h3Ships = document.createElement('h3');
      h3Ships.innerHTML = 'Starships from film';
      shipWrapper.appendChild(h3Ships);
      shipsArr.forEach(async ship => {
        const shipResponse = await fetch(ship);
        const shipResult = await shipResponse.json();
        const shipItem = document.createElement('li');
        shipItem.classList.add('list-items');
        shipItem.innerHTML = shipResult.name;
        shipWrapper.appendChild(shipItem);

        shipItem.addEventListener('click', () => {
          if (shipItem.innerHTML == shipResult.name) {
            infoCharactersWindow.style.display = 'block';
            infoCharactersWindow.innerHTML = `
                            <h3>Ship name: ${shipResult.name}</h3>  
                            <li>Model: ${shipResult.model}</li>      
                            <li>Max speed: ${shipResult.max_atmosphering_speed}</li>      
                            <li>Cost: ${shipResult.cost_in_credits}</li>      
                            <li>Crew: ${shipResult.crew}</li>      
                            <li>Manufacturer: ${shipResult.manufacturer}</li>      
                            <li>Class: ${shipResult.starship_class}</li>      
                            <button id="btn-close">Close</button>
                        `;
          }
          document.querySelector('#btn-close').addEventListener('click', () => {
            infoCharactersWindow.style.display = 'none';
          });
        });
      });
    });
  });
}
