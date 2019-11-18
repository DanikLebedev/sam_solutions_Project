//NEED TO REFACTOR!!!

export default function showMore() {
  const showBtns = document.querySelectorAll('li button');
  showBtns.forEach(item => {
    item.addEventListener('click', async () => {
      item.disabled = true;
      const url = `https://swapi.co/api/films/${item.id}`;
      const response = await fetch(url);
      const result = await response.json();

      const charArr = result.characters;
      const planetArr = result.planets;
      const shipsArr = result.starships;

      renderCharactersName(charArr, item);

      renderPlanetsName(planetArr, item);

      renderShipsName(shipsArr, item);
    });
  });
}

function renderCharactersName(charArr, itemId) {
  const infoCharactersWindow = document.querySelector('.modal');
  const infoWrap = document.querySelector(`.characters-film${itemId.id}`);
  const infoWrapUl = document.querySelector(`.characters-film${itemId.id} ul`);
  const h3Characters = document.createElement('h3');
  h3Characters.innerHTML = 'Characters';
  infoWrap.insertAdjacentElement('afterbegin', h3Characters);
  //Pagination

  infoWrapUl.insertAdjacentHTML(
    'beforebegin',
    `
            <ul id=characters-pagination${itemId.id}></ul>`
  );
  let notesOnPage = 5;
  let countOfItems = Math.ceil(charArr.length / notesOnPage);
  let liItems = [];
  const pagination = document.querySelector(`#characters-pagination${itemId.id}`);

  for (let i = 1; i <= countOfItems; i++) {
    const li = document.createElement('li');
    li.innerHTML = i;
    pagination.appendChild(li);
    liItems.push(li);
  }

  showPage(liItems[0]);

  liItems.forEach(liItem => {
    liItem.addEventListener('click', function() {
      showPage(this);
    });
  });

  function showPage(item) {
    let activeLi = document.querySelector(`#characters-pagination${itemId.id} li.active`);
    if (activeLi) {
      activeLi.classList.remove('active');
    }
    item.classList.add('active');
    let pageNum = +item.innerText;
    let start = (pageNum - 1) * notesOnPage;
    let end = start + notesOnPage;
    let notes = charArr.slice(start, end);
    infoWrapUl.innerHTML = '';
    notes.forEach(async char => {
      const charResponse = await fetch(char);
      const charResult = await charResponse.json();
      const listItem = document.createElement('li');
      listItem.setAttribute('class', 'list-items');
      listItem.innerHTML = charResult.name;
      infoWrapUl.appendChild(listItem);
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
  }
}

function renderPlanetsName(planetArr, itemId) {
  const infoCharactersWindow = document.querySelector('.modal');
  const planetWrapper = document.querySelector(`.planets-film${itemId.id}`);
  const planetWrapperUl = document.querySelector(`.planets-film${itemId.id} ul`);
  const h3Planets = document.createElement('h3');
  h3Planets.innerHTML = 'Planets';
  planetWrapper.insertAdjacentElement('afterbegin', h3Planets);

  //pagination
  planetWrapperUl.insertAdjacentHTML(
    'beforebegin',
    `
            <ul id=planets-pagination${itemId.id}></ul>`
  );
  let notesOnPage = 5;
  let countOfItems = Math.ceil(planetArr.length / notesOnPage);
  let items = [];
  const pagination = document.querySelector(`#planets-pagination${itemId.id}`);

  for (let i = 1; i <= countOfItems; i++) {
    const li = document.createElement('li');
    li.innerHTML = i;
    pagination.appendChild(li);
    items.push(li);
  }

  showPage(items[0]);

  items.forEach(item => {
    item.addEventListener('click', function() {
      showPage(this);
    });
  });

  function showPage(item) {
    let activeLi = document.querySelector(`#planets-pagination${itemId.id} li.active`);
    if (activeLi) {
      activeLi.classList.remove('active');
    }
    item.classList.add('active');
    let pageNum = +item.innerText;
    let start = (pageNum - 1) * notesOnPage;
    let end = start + notesOnPage;
    let notes = planetArr.slice(start, end);
    planetWrapperUl.innerHTML = '';
    notes.forEach(async planet => {
      const planetResponse = await fetch(planet);
      const planetResult = await planetResponse.json();
      const planetItem = document.createElement('li');
      const planetNames = planetResult.name;
      planetItem.classList.add('list-items');
      planetItem.innerHTML = `${planetNames}`;
      planetWrapperUl.appendChild(planetItem);

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
  }
}

function renderShipsName(shipsArr, itemId) {
  const infoCharactersWindow = document.querySelector('.modal');
  const shipWrapperUl = document.querySelector(`.ships-film${itemId.id} ul`);
  const shipWrapper = document.querySelector(`.ships-film${itemId.id}`);
  const h3Ships = document.createElement('h3');
  h3Ships.innerHTML = 'Starships';
  shipWrapper.insertAdjacentElement('afterbegin', h3Ships);

  //pagination
  shipWrapperUl.insertAdjacentHTML(
    'beforebegin',
    `
            <ul id=ships-pagination${itemId.id}></ul>`
  );
  let notesOnPage = 5;
  let countOfItems = Math.ceil(shipsArr.length / notesOnPage);
  let items = [];
  const pagination = document.querySelector(`#ships-pagination${itemId.id}`);

  for (let i = 1; i <= countOfItems; i++) {
    const li = document.createElement('li');
    li.innerHTML = i;
    pagination.appendChild(li);
    items.push(li);
  }

  showPage(items[0]);

  items.forEach(item => {
    item.addEventListener('click', function() {
      showPage(this);
    });
  });

  function showPage(item) {
    let activeLi = document.querySelector(`#ships-pagination${itemId.id} li.active`);
    if (activeLi) {
      activeLi.classList.remove('active');
    }
    item.classList.add('active');
    let pageNum = +item.innerText;
    let start = (pageNum - 1) * notesOnPage;
    let end = start + notesOnPage;
    let notes = shipsArr.slice(start, end);
    shipWrapperUl.innerHTML = '';
    notes.forEach(async ship => {
      const shipResponse = await fetch(ship);
      const shipResult = await shipResponse.json();
      const shipItem = document.createElement('li');
      shipItem.classList.add('list-items');
      shipItem.innerHTML = shipResult.name;
      shipWrapperUl.appendChild(shipItem);

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
  }
}
