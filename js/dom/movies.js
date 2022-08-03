// ================ get all seasons for one show =================
const moviesContainer = document.querySelector('#movies-section');
const seasonsContainer = document.querySelector('#seasons-section');

const getSeasons = (id) => {
  moviesContainer.style.display = 'none';
  seasonsContainer.style.display = 'flex';
  seasonsContainer.textContent = '';

  fetch(`https://api.tvmaze.com/shows/${id}/seasons`, (data) => {
    data.forEach((e) => {
      const season = document.createElement('div');
      season.classList = 'season';

      if (e.image) season.style.backgroundImage = `url(${e.image.original})`;
      else season.style.backgroundImage = `url(../images/broken2.jpg)`;

      const title = document.querySelector('h3');
      title.textContent = `season ${e.number}`;

      const btn = document.querySelector('button');
      btn.textContent = 'episodes';

      season.appendChild(title);
      season.appendChild(btn);

      seasonsContainer.appendChild(season);
    });
  });
};

// ================ get a random movie in each refresh ======================
// html elements for changing the values
const randomMov = document.querySelector('#one-movie');
const heading = document.querySelector('#one-movie .details h2');
const imgContainer = document.querySelector('#one-movie');

const randomMovie = (obj) => {
  const details = getDetails(obj);
  randomMov.classList = obj.id;
  heading.innerHTML = `${obj.name} <span>${details.genres.join(', ')}</span>`;
  imgContainer.style.backgroundImage = `url(${details.image})`;

  const btn = document.querySelector('.show-more');

  const id = randomMov.classList[0];
  console.log(btn, id);

  btn.addEventListener('click', (e) => {
    getSeasons(obj.id);
  });
};

// ==================== render data and display them in the page ==================
const renderData = (arr) => {
  moviesContainer.style.display = 'block';
  seasonsContainer.style.display = 'none';

  moviesContainer.textContent = '';
  arr.forEach((e) => {
    const movie = document.createElement('div');
    movie.classList = 'movie';

    const details = document.createElement('div');
    details.classList = 'details';
    movie.appendChild(details);

    const imgDiv = document.createElement('div');
    imgDiv.classList = 'img';
    imgDiv.style.backgroundImage = `url(${e.image.original})`;
    details.appendChild(imgDiv);

    const name = document.createElement('div');
    name.classList = 'name';

    const title = document.createElement('h3');
    title.textContent = e.name;
    name.appendChild(title);

    const genre = document.createElement('p');
    genre.textContent = e.genres.join(', ');
    name.appendChild(genre);

    details.appendChild(name);

    const btn = document.createElement('button');
    btn.textContent = 'See More';
    btn.addEventListener('click', () => {
      randomMovie(e);
    });

    movie.appendChild(btn);

    moviesContainer.appendChild(movie);
  });
};

// ===============  create the search functionality ===============

let input = document.querySelector('.search input');
input.addEventListener('keyup', (e) => {
  fetch(
    `https://api.tvmaze.com/singlesearch/shows?q=${e.target.value}`,
    (data) => {
      if (data) renderData([data]);
    }
  );
});

// =============  fetching all data ==========

fetch('https://api.tvmaze.com/shows', (data) => {
  renderData(data.slice(0, 50));
  const random = data[Math.floor(Math.random() * data.length)];
  randomMovie(random);
});

// const getSeasons = (arr) => {
//   moviesContainer.style.display = 'none';
//   seasonsContainer.style.display = 'flex';

//   //   console.log(arr);
//   seasonsContainer.textContent = '';
//   arr.forEach((e) => {
//     const season = document.createElement('div');
//     season.classList = 'season';

//     if (e.image) season.style.backgroundImage = `url(${e.image.original})`;
//     else season.style.backgroundImage = `url(../images/broken2.jpg)`;

//     const title = document.querySelector('h3');
//     title.textContent = `season ${e.number}`;

//     const btn = document.querySelector('button');
//     btn.textContent = 'episodes';

//     season.appendChild(title);
//     season.appendChild(btn);

//     seasonsContainer.appendChild(season);
//   });
// };
