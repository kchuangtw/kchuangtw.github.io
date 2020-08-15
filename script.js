/* Add any JavaScript you need to this file. */
var games = window.games;


let genreList = (function () {
  let genres = {};
  genres['All'] = games.length;
  games.forEach(function (game) {
    game.categories.forEach(function (genre) {
      genres[genre] = genres[genre] ? genres[genre] + 1 : 1;
    });
  });
  let tempArr = [];
  for (const genre in genres) {
    tempArr.push([genre, genres[genre]]);
  }
  tempArr.sort(function (a, b) {
    return b[1] - a[1];
  });
  genres = {};
  tempArr.forEach(function (genre) {
    genres[genre[0]] = genre[1];
  });
  return genres;
})();

function genresToSidebar() {
  let nav = document.getElementById('nav-categories');
  for (const genre in genreList) {
    let li = document.createElement('li');
    li.id = `nav-category-${genre}`;
    li.innerHTML = `<a href="#products">${genre} <span>${genreList[genre]}</span></a>`;
    nav.appendChild(li);
  }
}

let products = (function () {
  let arr = [];
  for (let index = 0; index < games.length; index++) arr[index] = index;
  return arr;
})();

function productsToMain() {
  games.forEach(function (game, index) {
    let wrapDiv = document.createElement('div');
    wrapDiv.classList.add('div-wrapping');
    wrapDiv.id = 'game-' + index;
    wrapDiv.innerHTML = `

          <figure><a target="_blank" href="${game.url}" title="${game.url}">
          <img src="images/${game.picture}" alt="Picture of ${game.title}" />
          </a>
          </figure>

          <div class="game-info">
          <h2><span class="title">${game.title}</span>&ensp;</h2>
          <br><br><p><b>Category:</b> ${game.categories.join(', ')}</p>
          <br>
          <p>${game.description}</p><br>
          <div class="game-buttons">
            <button type="button"><a target="_blank" href="${game.url}" title="${game.url}">
              <b>Purchase</b></a></button>
          </div>
          <div class="game-buttons">
              <p class="game-price">Price: ${game.price}</p>
          </div>
        </div>
        `;

    let main = document.querySelector('main');
    main.appendChild(wrapDiv); // Add <div> to main page
  });
}

function productsAddHide() {
  for (let index = 0; index < games.length; index++) {
    let element = document.querySelector(`#game-${index}`);
    if (!products.includes(index)) {
      element.classList.add('hidden');
    } else {
      element.classList.remove('hidden');
    }
  }
}

function categoriesHandler() {
  for (const genre in genreList) {
    let cat = document.querySelector(`#nav-category-${genre}`);

    cat.onclick = function () {
      let h1 = document.querySelector('main h1');
      h1.innerHTML = "Category - " + genre; // Display the category name
      games.forEach(function (game, index) {

        if (game.categories.includes(genre) || genre === 'All') {
          if (!products.includes(index)) products.push(index);
        } else if (products.indexOf(index) > -1) {
          products.splice(products.indexOf(index), 1);
        }
      });
      productsAddHide();
      if (document.querySelector('.nav-button').offsetHeight !== 0) {
        document.querySelector('#nav-categories').style.display = 'none';
      }
    };
  }
}


function navHandler() {
  let button = document.querySelector('.nav-button');
  let navP = document.querySelector('nav p');
  navP.addEventListener('click', function () {
    if (button.style.display !== 'none') {
      let dropDown = document.querySelector('#nav-categories');
      dropDown.style.display = dropDown.style.display === 'block' ? 'none' : 'block';
    }
  });
}

window.onload = function () {
  genresToSidebar();
  productsToMain();
  categoriesHandler();
  navHandler();
};
