//show films list
document.querySelector('body').addEventListener('load', init());

async function init() {
    await getFilms();
    sortItem()
    await showMore()
    searchElem()


}

let films;


// function func() {
//      locale_HTML = document.body.innerHTML;
// }
// setTimeout(func, 1000);
//
// FindOnPage('search__input', false)
//
// function FindOnPage(name, status) {
//
//     input = document.getElementById(name).value; //получаем значение из поля в html
//
//     if(input.length<3&&status==true)
//     {
//         alert('Для поиска вы должны ввести три или более символов');
//        FindOnPageBack();
//     }
//
//     if(input.length>=3)
//     {
//         function FindOnPageGo() {
//
//             search = '/'+input+'/g';  //делаем из строки регуярное выражение
//             pr = document.body.innerHTML;   // сохраняем в переменную весь body
//             result = pr.match(/>(.*?)</g);  //отсекаем все теги и получаем только текст
//             result_arr = [];   //в этом массиве будем хранить результат работы (подсветку)
//
//             var warning = true;
//             for(var i=0;i<result.length;i++) {
//                 if(result[i].match(eval(search))!=null) {
//                     warning = false;
//                 }
//             }
//             if(warning == true) {
//                 alert('Не найдено ни одного совпадения');
//             }
//
//             for(var i=0; i<result.length;i++) {
//                 result_arr[i] = result[i].replace(eval(search), '<span style="background-color:yellow;">'+input+'</span>'); //находим нужные элементы, задаем стиль и сохраняем в новый массив
//             }
//             for(var i=0; i<result.length;i++) {
//                 pr=pr.replace(result[i],result_arr[i])  //заменяем в переменной с html текст на новый из новогом ассива
//             }
//             document.body.innerHTML = pr;  //заменяем html код
//         }
//     }
//     function FindOnPageBack() { document.body.innerHTML = locale_HTML; }
//     if(status) { FindOnPageBack(); FindOnPageGo(); } //чистим прошлое и Выделяем найденное
//     if(!status) { FindOnPageBack(); } //Снимаем выделение
// }

function searchElem() {
    const searchInp = document.querySelector('#search__input');
    const searchBtn = document.querySelector('.search__button');
    const articles = document.querySelectorAll('.film-item');
    const wrapper = document.querySelector('.films__list');

    searchBtn.addEventListener('click', (e) => {
        e.preventDefault()
        const searchText = new RegExp(searchInp.value.trim(), 'i');
        articles.forEach(arcticle => {
            console.log(arcticle.id)
            const filmTitle = arcticle.querySelector(`.films-wrapper`);
            if (!searchText.test(filmTitle.textContent)) {
                arcticle.remove()
            } else {
                wrapper.appendChild(arcticle)
            }
        })
        searchInp.value = ''
    })

}

function sortItem() {
    const list = document.querySelector('.films__list')
    const selectSort = document.querySelector('#sort__select');
    selectSort.addEventListener('change', () => {
        const selectValue = selectSort.options[selectSort.selectedIndex].value;
        switch (selectValue) {
            case ('date'):
                list.innerHTML = `
                <div class="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>`
                films.sort((a, b) => {
                    let aa = a.release_date.split('-');
                    let bb = b.release_date.split('-');
                    return aa[0] - bb[0];
                });
                renderFilms()
                showMore()
                searchElem()
                break

            case ('episode_id'):
                list.innerHTML = `
                <div class="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>`
                films.sort((a, b) => {
                    return a.episode_id - b.episode_id
                });
                renderFilms()
                showMore()
                showMore()

                break

        }

    })

}

function renderFilms() {
    const list = document.querySelector('.films__list')
    const loader = document.querySelector('.lds-ring');

    if (list) {
        loader.style.display = 'none'
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

    })
}

async function getFilms() {
    const url = 'https://swapi.co/api/films';
    const response = await fetch(url);
    const result = await response.json();
    films = result.results;
    // films.map((item, index) => {
    //     return item.episode_id = index + 1;
    // })

    renderFilms()

}

function showMore() {
    const showBtns = document.querySelectorAll('li button');
    showBtns.forEach(item => {
        item.addEventListener('click', async () => {
            const url = `https://swapi.co/api/films/${item.id}`
            const response = await fetch(url);
            const result = await response.json();

            const charArr = result.characters;
            const planetArr = result.planets;
            const shipsArr = result.starships

            const infoWrap = document.querySelector(`.characters-film${item.id} ul`);
            const h3Characters = document.createElement('h3');
            h3Characters.innerHTML = 'Characters';
            infoWrap.appendChild(h3Characters);

            charArr.forEach(async char => {
                const charResponse = await fetch(char)
                const charResult = await charResponse.json();
                const charNames = charResult.name
                const listItem = document.createElement('li');
                listItem.style.cursor = 'pointer';
                listItem.innerHTML = charNames;
                // infoWrap.innerHTML += `<li style="cursor: pointer">${charNames}</li>`
                infoWrap.appendChild(listItem)
                listItem.addEventListener('click', showCharactersInfo)
            })

            infoWrap.insertAdjacentHTML('afterend', `
                     <div class="pagination-characters${item.id}">
                         <a id="btn_prev">Prev</a>
                         <a id="btn_next">Next</a>
                     </div>`
            )




            const planetWrapper = document.querySelector(`.planets-film${item.id} ul`);
            const h3Planets = document.createElement('h3');
            h3Planets.innerHTML = 'Planets';
            planetWrapper.appendChild(h3Planets);

            planetArr.forEach(async planet => {
                const planetResponse = await fetch(planet);
                const planetResult = await planetResponse.json();
                const planetNames = planetResult.name;
                planetWrapper.innerHTML += `<li>${planetNames}</li>`

            })

            const shipWrapper = document.querySelector(`.ships-film${item.id} ul`)
            const h3Ships = document.createElement('h3');
            h3Ships.innerHTML = 'Starships from film'
            shipWrapper.appendChild(h3Ships);
            shipsArr.forEach(async ship => {
                const shipResponse = await fetch(ship);
                const shipResult = await shipResponse.json();
                const shipNames = shipResult.name;
                const shipModels = shipResult.model;
                shipWrapper.innerHTML += `<li>Name: ${shipNames}, model: ${shipModels}</li>`

            })

            shipWrapper.insertAdjacentHTML("afterend", `
                    <div class="pagination-ships${item.id}">
                         <a id="btn_prev">Prev</a>
                         <a id="btn_next">Next</a>
                     </div>`)
        })
    })



}


function showCharactersInfo() {
    console.log(this)

}

// pagination







