//NEED TO REFACTOR!!!

export default function showMore() {
  const showBtns = document.querySelectorAll('li button');
  showBtns.forEach(item => {
    item.addEventListener('click', async () => {
      item.disabled = true;
      item.style.opacity = '0';
      const url = `https://swapi.co/api/films/${item.id}`;
      const response = await fetch(url);
      const result = await response.json();

      const charArr = result.characters;
      const planetArr = result.planets;
      const shipsArr = result.starships;
      const vehiclesArr = result.vehicles;
      const speciesArr = result.species;

      renderCharactersName(charArr, item);

      renderPlanetsName(planetArr, item);

      renderShipsName(shipsArr, item);

      renderVehiclesName(vehiclesArr, item);

      renderSpeciesName(speciesArr, item);
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
    renderCharactersAdditionalInfo(notes, infoWrapUl, infoCharactersWindow);
  }
}

function renderCharactersAdditionalInfo(notes, wrap, modal) {
  notes.forEach(async char => {
    const charResponse = await fetch(char);
    const charResult = await charResponse.json();
    const listItem = document.createElement('li');
    listItem.setAttribute('class', 'list-items');
    listItem.innerHTML = charResult.name;
    wrap.appendChild(listItem);
    listItem.addEventListener('click', () => {
      if (listItem.innerHTML == charResult.name) {
        modal.style.display = 'block';
        modal.innerHTML = `
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
        modal.style.display = 'none';
      });
    });
  });
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
    renderPlanetsAdditionalInfo(notes, planetWrapperUl, infoCharactersWindow);
  }
}

function renderPlanetsAdditionalInfo(notes, wrap, modal) {
  notes.forEach(async planet => {
    const planetResponse = await fetch(planet);
    const planetResult = await planetResponse.json();
    const planetItem = document.createElement('li');
    const planetNames = planetResult.name;
    planetItem.classList.add('list-items');
    planetItem.innerHTML = `${planetNames}`;
    wrap.appendChild(planetItem);

    planetItem.addEventListener('click', () => {
      if (planetItem.innerHTML == planetNames) {
        modal.style.display = 'block';
        modal.innerHTML = `
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
        modal.style.display = 'none';
      });
    });
  });
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
    renderShipsAdditionalInfo(notes, shipWrapperUl, infoCharactersWindow);
  }
}

function renderShipsAdditionalInfo(notes, wrap, modal) {
  notes.forEach(async ship => {
    const shipResponse = await fetch(ship);
    const shipResult = await shipResponse.json();
    const shipItem = document.createElement('li');
    shipItem.classList.add('list-items');
    shipItem.innerHTML = shipResult.name;
    wrap.appendChild(shipItem);
    shipItem.addEventListener('click', () => {
      if (shipItem.innerHTML == shipResult.name) {
        modal.style.display = 'block';
        modal.innerHTML = `
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
        modal.style.display = 'none';
      });
    });
  });
}

function renderVehiclesName(vehiclesArr, itemId) {
  const infoCharactersWindow = document.querySelector('.modal');
  const vehiclesWrapperUl = document.querySelector(`.vehicles-film${itemId.id} ul`);
  const vehicleWrapper = document.querySelector(`.vehicles-film${itemId.id}`);
  const h3Vehicles = document.createElement('h3');
  h3Vehicles.innerHTML = 'Vehicles';
  vehicleWrapper.insertAdjacentElement('afterbegin', h3Vehicles);
  //pagination
  vehiclesWrapperUl.insertAdjacentHTML(
    'beforebegin',
    `
            <ul id=vehicles-pagination${itemId.id}></ul>`
  );

  if (vehiclesArr.length === 0) {
    vehiclesWrapperUl.innerHTML = 'Information not found';
  } else {
    var notesOnPage = 5;
    let countOfItems = Math.ceil(vehiclesArr.length / notesOnPage);
    let items = [];
    const pagination = document.querySelector(`#vehicles-pagination${itemId.id}`);

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
  }

  function showPage(item) {
    let activeLi = document.querySelector(`#vehicles-pagination${itemId.id} li.active`);
    if (activeLi) {
      activeLi.classList.remove('active');
    }
    item.classList.add('active');
    let pageNum = +item.innerText;
    let start = (pageNum - 1) * notesOnPage;
    let end = start + notesOnPage;
    let notes = vehiclesArr.slice(start, end);
    vehiclesWrapperUl.innerHTML = '';
    renderVehiclesAdditionalInfo(notes, vehiclesWrapperUl, infoCharactersWindow);
  }
}

function renderVehiclesAdditionalInfo(notes, wrap, modal) {
  notes.forEach(async vehicle => {
    const vehicleResponse = await fetch(vehicle);
    const vehicleResult = await vehicleResponse.json();
    const shipItem = document.createElement('li');
    if (!vehicleResult) {
      shipItem.innerHTML = 'Information not found';
    }
    shipItem.classList.add('list-items');
    shipItem.innerHTML = vehicleResult.name;
    wrap.appendChild(shipItem);
    shipItem.addEventListener('click', () => {
      if (shipItem.innerHTML == vehicleResult.name) {
        modal.style.display = 'block';
        modal.innerHTML = `
                            <h3>Vehicle name: ${vehicleResult.name}</h3>  
                            <li>Model: ${vehicleResult.model}</li>      
                            <li>Max speed: ${vehicleResult.max_atmosphering_speed}</li>      
                            <li>Cost: ${vehicleResult.cost_in_credits}</li>      
                            <li>Crew: ${vehicleResult.crew}</li>      
                            <li>Manufacturer: ${vehicleResult.manufacturer}</li>      
                            <li>Class: ${vehicleResult.vehicle_class}</li>      
                            <button id="btn-close">Close</button>
                        `;
      }
      document.querySelector('#btn-close').addEventListener('click', () => {
        modal.style.display = 'none';
      });
    });
  });
}

function renderSpeciesName(speciesArr, itemId) {
  const infoCharactersWindow = document.querySelector('.modal');
  const speciesWrapperUl = document.querySelector(`.species-film${itemId.id} ul`);
  const speciesWrapper = document.querySelector(`.species-film${itemId.id}`);
  const h3Speciess = document.createElement('h3');
  h3Speciess.innerHTML = 'Species';
  speciesWrapper.insertAdjacentElement('afterbegin', h3Speciess);

  //pagination
  speciesWrapperUl.insertAdjacentHTML(
    'beforebegin',
    `
            <ul id=species-pagination${itemId.id}></ul>`
  );
  let notesOnPage = 5;
  let countOfItems = Math.ceil(speciesArr.length / notesOnPage);
  let items = [];
  const pagination = document.querySelector(`#species-pagination${itemId.id}`);

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
    let activeLi = document.querySelector(`#species-pagination${itemId.id} li.active`);
    if (activeLi) {
      activeLi.classList.remove('active');
    }
    item.classList.add('active');
    let pageNum = +item.innerText;
    let start = (pageNum - 1) * notesOnPage;
    let end = start + notesOnPage;
    let notes = speciesArr.slice(start, end);
    speciesWrapperUl.innerHTML = '';
    renderSpeciesAdditionalInfo(notes, speciesWrapperUl, infoCharactersWindow);
  }
}

function renderSpeciesAdditionalInfo(notes, wrap, modal) {
  notes.forEach(async species => {
    const speciesResponse = await fetch(species);
    const speciesResult = await speciesResponse.json();
    const shipItem = document.createElement('li');
    shipItem.classList.add('list-items');
    shipItem.innerHTML = speciesResult.name;
    wrap.appendChild(shipItem);
    shipItem.addEventListener('click', () => {
      if (shipItem.innerHTML == speciesResult.name) {
        modal.style.display = 'block';
        modal.innerHTML = `
                            <h3>Species name: ${speciesResult.name}</h3>  
                            <li>Classification: ${speciesResult.classification}</li>      
                            <li>Average lifespan: ${speciesResult.average_lifespan}</li>      
                            <li>Average height: ${speciesResult.average_height}</li>      
                            <li>Eye colors: ${speciesResult.eye_colors}</li>      
                            <li>Language: ${speciesResult.language}</li>      
                            <li>Skin colors: ${speciesResult.skin_colors}</li>      
                            <li>Hair colors: ${speciesResult.hair_colors}</li>      
                            <li>Designation: ${speciesResult.designation}</li>      
                            <button id="btn-close">Close</button>
                        `;
      }
      document.querySelector('#btn-close').addEventListener('click', () => {
        modal.style.display = 'none';
      });
    });
  });
}
