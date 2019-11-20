import renderData from './renderData';
import searchData from './searchDataApi';
import renderFilms from './renderFilms';
import searchElemOnPage from './searchElemOnPage';

window.addEventListener('load', init);

async function init() {
  await renderFilms();
  await renderData();
  searchElemOnPage();
  searchData();
}
