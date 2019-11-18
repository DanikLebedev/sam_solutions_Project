import renderData from './renderData';
import searchData from './searchDataApi';
import renderFilms from './renderFilms';
import searchElemOnPage from './searchElemOnPage';

window.addEventListener('load', init);

let films;

async function init() {
  await renderFilms(films);
  await renderData();
  searchElemOnPage();
  searchData();
}
