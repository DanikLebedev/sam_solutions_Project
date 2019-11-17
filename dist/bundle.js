!(function(e) {
  var n = {};
  function t(i) {
    if (n[i]) return n[i].exports;
    var s = (n[i] = { i: i, l: !1, exports: {} });
    return e[i].call(s.exports, s, s.exports, t), (s.l = !0), s.exports;
  }
  (t.m = e),
    (t.c = n),
    (t.d = function(e, n, i) {
      t.o(e, n) || Object.defineProperty(e, n, { enumerable: !0, get: i });
    }),
    (t.r = function(e) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 });
    }),
    (t.t = function(e, n) {
      if ((1 & n && (e = t(e)), 8 & n)) return e;
      if (4 & n && 'object' == typeof e && e && e.__esModule) return e;
      var i = Object.create(null);
      if ((t.r(i), Object.defineProperty(i, 'default', { enumerable: !0, value: e }), 2 & n && 'string' != typeof e))
        for (var s in e)
          t.d(
            i,
            s,
            function(n) {
              return e[n];
            }.bind(null, s)
          );
      return i;
    }),
    (t.n = function(e) {
      var n =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return t.d(n, 'a', n), n;
    }),
    (t.o = function(e, n) {
      return Object.prototype.hasOwnProperty.call(e, n);
    }),
    (t.p = ''),
    t((t.s = 0));
})([
  function(module, exports) {
    eval(
      "//show films list\nwindow.addEventListener('load', init());\n\nasync function init() {\n  await getFilms();\n  sortItem();\n  await showMore();\n  searchElem();\n}\n\nlet films;\nlet charArr;\nlet planetArr;\nlet shipsArr;\n\nasync function getFilms() {\n  const url = 'https://swapi.co/api/films';\n  const response = await fetch(url);\n  const result = await response.json();\n  films = result.results;\n  films.sort((a, b) => {\n    let aa = a.release_date.split('-');\n    let bb = b.release_date.split('-');\n    return aa[0] - bb[0];\n  });\n  films.map((item, index) => {\n    return item.episode_id = index + 1;\n  });\n  renderFilms();\n}\n\nfunction searchElem() {\n  const searchInp = document.querySelector('#search__input');\n  const searchBtn = document.querySelector('.search__button');\n  const articles = document.querySelectorAll('.film-item');\n  const wrapper = document.querySelector('.films__list');\n  searchBtn.addEventListener('click', e => {\n    e.preventDefault();\n    const searchText = new RegExp(searchInp.value.trim(), 'i');\n    articles.forEach(arcticle => {\n      const filmTitle = arcticle.querySelector(`*`);\n\n      if (!searchText.test(filmTitle.textContent)) {\n        arcticle.remove();\n      } else {\n        wrapper.appendChild(arcticle);\n      }\n    });\n    searchInp.value = '';\n  });\n}\n\nfunction sortItem() {\n  const list = document.querySelector('.films__list');\n  const selectSort = document.querySelector('#sort__select');\n  selectSort.addEventListener('change', async () => {\n    const selectValue = selectSort.options[selectSort.selectedIndex].value;\n\n    switch (selectValue) {\n      case 'date':\n        list.innerHTML = `\n                <div class=\"lds-ring\">\n                    <div></div>\n                    <div></div>\n                    <div></div>\n                    <div></div>\n                </div>`;\n        films.sort((a, b) => {\n          let aa = a.release_date.split('-');\n          let bb = b.release_date.split('-');\n          return aa[0] - bb[0];\n        });\n        await renderFilms();\n        await showMore();\n        await searchElem();\n        break;\n\n      case 'characters_quantity':\n        list.innerHTML = `\n                <div class=\"lds-ring\">\n                    <div></div>\n                    <div></div>\n                    <div></div>\n                    <div></div>\n                </div>`;\n        films.sort((a, b) => {\n          return b.characters.length - a.characters.length;\n        });\n        await renderFilms();\n        await showMore();\n        await searchElem();\n        break;\n    }\n  });\n}\n\nfunction renderFilms() {\n  const list = document.querySelector('.films__list');\n  const loader = document.querySelector('.lds-ring');\n\n  if (list) {\n    loader.style.display = 'none';\n  }\n\n  films.forEach(film => {\n    const listItem = document.createElement('li');\n    listItem.setAttribute('id', `film${film.episode_id}`);\n    listItem.setAttribute('class', `film-item`);\n    listItem.innerHTML = `\n                <div class=films-wrapper${film.episode_id}>\n                <h3 class=films-title>${film.title}</h3>\n                <p>Release : ${film.release_date}</p>\n                <p>Director : ${film.director}</p>\n                <p>Description: <br> ${film.opening_crawl}</p>\n                <button id=${film.episode_id}>Show More</button></div>\n                <div class=characters-film${film.episode_id}>\n                    <ul></ul>\n                </div>\n                <div class=planets-film${film.episode_id}>\n                     <ul></ul>\n                 </div>\n                <div class=ships-film${film.episode_id}>\n                    <ul></ul>\n                </div>\n        `;\n    list.appendChild(listItem);\n  });\n}\n\nfunction showMore() {\n  const showBtns = document.querySelectorAll('li button');\n  showBtns.forEach(item => {\n    const infoCharactersWindow = document.querySelector('.modal');\n    item.addEventListener('click', async () => {\n      item.disabled = true;\n      const url = `https://swapi.co/api/films/${item.id}`;\n      const response = await fetch(url);\n      const result = await response.json();\n      charArr = result.characters;\n      planetArr = result.planets;\n      shipsArr = result.starships;\n      const infoWrap = document.querySelector(`.characters-film${item.id} ul`);\n      const h3Characters = document.createElement('h3');\n      h3Characters.innerHTML = 'Characters';\n      infoWrap.appendChild(h3Characters);\n      charArr.forEach(async char => {\n        const charResponse = await fetch(char);\n        const charResult = await charResponse.json();\n        const listItem = document.createElement('li');\n        listItem.setAttribute('class', 'list-items');\n        listItem.innerHTML = charResult.name;\n        infoWrap.appendChild(listItem);\n        listItem.addEventListener('click', () => {\n          if (listItem.innerHTML == charResult.name) {\n            infoCharactersWindow.style.display = 'block';\n            infoCharactersWindow.innerHTML = `\n                            <h3>Name: ${charResult.name}</h3>\n                            <li>Birth Year: ${charResult.birth_year}</li>\n                            <li>Weight: ${charResult.mass}</li>\n                            <li>Height: ${charResult.height}</li>\n                            <li>Skin color: ${charResult.skin_color}</li>\n                            <li>Eye color: ${charResult.eye_color}</li>\n                            <li>Hair color: ${charResult.hair_color}</li>\n                            <li>Gender: ${charResult.gender}</li>\n                            <button id=\"btn-close\">Close</button>\n                        `;\n          }\n\n          document.querySelector('#btn-close').addEventListener('click', () => {\n            infoCharactersWindow.style.display = 'none';\n          });\n        });\n      });\n      const planetWrapper = document.querySelector(`.planets-film${item.id} ul`);\n      const h3Planets = document.createElement('h3');\n      h3Planets.innerHTML = 'Planets';\n      planetWrapper.appendChild(h3Planets);\n      planetArr.forEach(async planet => {\n        const planetResponse = await fetch(planet);\n        const planetResult = await planetResponse.json();\n        const planetItem = document.createElement('li');\n        const planetNames = planetResult.name;\n        planetItem.classList.add('list-items');\n        planetItem.innerHTML = `${planetNames}`;\n        planetWrapper.appendChild(planetItem);\n        planetItem.addEventListener('click', () => {\n          if (planetItem.innerHTML == planetNames) {\n            infoCharactersWindow.style.display = 'block';\n            infoCharactersWindow.innerHTML = `\n                            <h3>Planet name: ${planetNames}</h3>  \n                            <li>Climate: ${planetResult.climate}</li>      \n                            <li>Diameter: ${planetResult.diameter}</li>      \n                            <li>Gravity: ${planetResult.gravity}</li>      \n                            <li>Population: ${planetResult.population}</li>      \n                            <li>Terrain: ${planetResult.terrain}</li>      \n                            <li>Orbital period: ${planetResult.orbital_period}</li>      \n                            <button id=\"btn-close\">Close</button>\n                        `;\n          }\n\n          document.querySelector('#btn-close').addEventListener('click', () => {\n            infoCharactersWindow.style.display = 'none';\n          });\n        });\n      });\n      const shipWrapper = document.querySelector(`.ships-film${item.id} ul`);\n      const h3Ships = document.createElement('h3');\n      h3Ships.innerHTML = 'Starships from film';\n      shipWrapper.appendChild(h3Ships);\n      shipsArr.forEach(async ship => {\n        const shipResponse = await fetch(ship);\n        const shipResult = await shipResponse.json();\n        const shipItem = document.createElement('li');\n        shipItem.classList.add('list-items');\n        shipItem.innerHTML = shipResult.name;\n        shipWrapper.appendChild(shipItem);\n        shipItem.addEventListener('click', () => {\n          if (shipItem.innerHTML == shipResult.name) {\n            infoCharactersWindow.style.display = 'block';\n            infoCharactersWindow.innerHTML = `\n                            <h3>Ship name: ${shipResult.name}</h3>  \n                            <li>Model: ${shipResult.model}</li>      \n                            <li>Max speed: ${shipResult.max_atmosphering_speed}</li>      \n                            <li>Cost: ${shipResult.cost_in_credits}</li>      \n                            <li>Crew: ${shipResult.crew}</li>      \n                            <li>Manufacturer: ${shipResult.manufacturer}</li>      \n                            <li>Class: ${shipResult.starship_class}</li>      \n                            <button id=\"btn-close\">Close</button>\n                        `;\n          }\n\n          document.querySelector('#btn-close').addEventListener('click', () => {\n            infoCharactersWindow.style.display = 'none';\n          });\n        });\n      });\n    });\n  });\n}\n\n//# sourceURL=webpack:///./src/script.js?"
    );
  }
]);
