export default function searchData() {
  const searchSelect = document.querySelector('#select_search_settings');
  const searchForm = document.querySelector('.search_api_form');
  searchSelect.addEventListener('change', () => {
    let selectValue = searchSelect.options[searchSelect.selectedIndex].value;
    searchForm.addEventListener('submit', e => {
      e.preventDefault();
      const searchInp = document.querySelector('#search__input_api').value;
      const searchQuery = searchInp.trim();
      fetchSearchData(selectValue, searchQuery);
    });
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

function validURL(str) {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // fragment locator
  return !!pattern.test(str);
}

function displaySearchResults(results) {
  const modal = document.querySelector('.modal');
  const errorMsg = document.createElement('div');
  errorMsg.innerHTML = `Information not found`;
  modal.innerHTML = '';
  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = 'Close';
  closeBtn.setAttribute('id', 'btn-close');
  modal.appendChild(closeBtn);
  document.querySelector('#btn-close').addEventListener('click', () => {
    modal.style.display = 'none';
  });
  modal.style.display = 'block';

  if (results.length === 0) {
    modal.appendChild(errorMsg);
  } else {
    for (let props in results[0]) {
      let li = document.createElement('li');
      li.innerHTML = `${props} : ${results[0][props]}`;
      modal.appendChild(li);
      switch (props) {
        case 'films':
          li.innerHTML = `${props}:`;
          results[0][props].forEach(film => {
            fetch(film)
              .then(response => response.json())
              .then(data => {
                li.innerHTML += ` ${data.title} , `;
              })
              .catch(() => console.log('An error occurred'));
          });
          break;
        case 'residents':
          fetchProps(results[0][props], li, props);
          break;
        case 'characters':
          fetchProps(results[0][props], li, props);
          break;
        case 'species':
          fetchProps(results[0][props], li, props);
          break;
        case 'starships':
          fetchProps(results[0][props], li, props);
          break;
        case 'planets':
          fetchProps(results[0][props], li, props);
          break;
        case 'vehicles':
          fetchProps(results[0][props], li, props);
          break;
        case 'people':
          fetchProps(results[0][props], li, props);
          break;
      }

      if (validURL(results[0][props]) && props !== 'url') {
        fetch(results[0][props])
          .then(response => response.json())
          .then(data => {
            li.innerHTML = `${props}: ${data.name}`;
          })
          .catch(() => console.log('An error occurred'));
      }
    }
  }
}

function fetchProps(arr, li, props) {
  li.innerHTML = `${props}:`;
  arr.forEach(film => {
    fetch(film)
      .then(response => response.json())
      .then(data => {
        li.innerHTML += ` ${data.name}; `;
      })
      .catch(() => console.log('An error occurred'));
  });
}
