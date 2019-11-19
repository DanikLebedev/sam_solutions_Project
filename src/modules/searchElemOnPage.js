export default function searchElem() {
  const searchInp = document.querySelector('#search__input');
  const searchBtn = document.querySelector('.search__button');
  const filmSection = document.querySelectorAll('.film-item');
  const wrapper = document.querySelector('.films__list');

  searchBtn.addEventListener('click', e => {
    e.preventDefault();
    const searchText = new RegExp(searchInp.value.trim(), 'i');
    filmSection.forEach(section => {
      const filmTitle = section.querySelector(`*`);
      if (!searchText.test(filmTitle.textContent)) {
        section.remove();
      } else {
        wrapper.appendChild(section);
      }
    });
    searchInp.value = '';
  });
}
