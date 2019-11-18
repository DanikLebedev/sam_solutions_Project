import searchElemOnPage from './searchElemOnPage';
import renderData from './renderData';

export default async function renderFilms(filmsArr) {
  const url = 'https://swapi.co/api/films';
  const response = await fetch(url);
  const result = await response.json();
  filmsArr = result.results;

  filmsArr.sort((a, b) => {
    let aa = a.release_date.split('-');
    let bb = b.release_date.split('-');
    return aa[0] - bb[0];
  });

  filmsArr.map((item, index) => {
    return (item.episode_id = index + 1);
  });
  renderLayout(filmsArr);

  //sorting

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

        filmsArr.sort((a, b) => {
          let aa = a.release_date.split('-');
          let bb = b.release_date.split('-');
          return aa[0] - bb[0];
        });

        await renderLayout(filmsArr);
        renderData();
        searchElemOnPage();
        break;

      case 'characters_quantity':
        list.innerHTML = `
                <div class="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>`;
        filmsArr.sort((a, b) => {
          return b.characters.length - a.characters.length;
        });
        await renderLayout(filmsArr);
        renderData();
        searchElemOnPage();
        break;
    }
  });

  //end sorting
}

function renderLayout(filmsArr) {
  const list = document.querySelector('.films__list');
  const loader = document.querySelector('.lds-ring');

  if (list) {
    loader.style.display = 'none';
  }
  filmsArr.forEach(film => {
    const listItem = document.createElement('li');
    listItem.setAttribute('id', `film${film.episode_id}`);
    listItem.setAttribute('class', `film-item`);
    listItem.innerHTML = `
                <div class=films-wrapper${film.episode_id} >
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
