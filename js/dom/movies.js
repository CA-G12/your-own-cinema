// ============ looping over and displaying the array of episodes in the page =========
const getEpisodes = (arr) => {
  moviesContainer.style.display = 'none';
  seasonsContainer.style.display = 'flex';
  seasonsContainer.textContent = '';

  arr.forEach((e) => {
    const season = document.createElement('div');
    const title = document.querySelector('h3');
    const btn2 = document.createElement('button');

    season.classList = 'season';
    season.id = e.id;
    if (e.image) season.style.backgroundImage = `url(${e.image.original})`;
    else season.style.backgroundImage = `url(../images/broken2.jpg)`;
    title.textContent = `episode ${e.number}`;
    btn2.textContent = 'watch';

    season.appendChild(title);
    season.appendChild(btn2);
    seasonsContainer.appendChild(season);

    btn2.addEventListener('click', () => {
      window.open(e.url);
    });
  });
};

// ========= fetching an array of episodes based on the season id and handle it in the getEpisodes

const fetchEpisodes = (e) => {
  let id = e.target.parentElement.id;
  fetch(`https://api.tvmaze.com/seasons/${id}/episodes`, getEpisodes);
};

// ================ loop over and display the array of seasons for one show =================
const moviesContainer = document.querySelector('#movies-section');
const seasonsContainer = document.querySelector('#seasons-section');

const getSeasons = (arr) => {
  moviesContainer.style.display = 'none';
  seasonsContainer.style.display = 'flex';
  seasonsContainer.textContent = '';

  arr.forEach((e) => {
    const season = document.createElement('div');
    const title = document.querySelector('h3');
    const btn2 = document.createElement('button');

    season.classList = 'season';
    season.id = e.id;
    if (e.image) season.style.backgroundImage = `url(${e.image.original})`;
    else season.style.backgroundImage = `url(../images/broken2.jpg)`;
    title.textContent = `season ${e.number}`;
    btn2.textContent = 'episodes';

    season.appendChild(title);
    season.appendChild(btn2);
    seasonsContainer.appendChild(season);

    btn2.addEventListener('click', fetchEpisodes);
  });
};

// ============= fetching the array of seasons for the show =============

const fetchSeasons = (e) => {
  let id = e.target.parentElement.parentElement.classList[0];
  fetch(`https://api.tvmaze.com/shows/${id}/seasons`, getSeasons);
};

// ================ get a random movie in each refresh ======================
// html elements for changing the values
const randomMov = document.querySelector('#one-movie');
const heading = document.querySelector('#one-movie .details h2');
const genres = document.querySelector('#one-movie .details span');
const rating = document.querySelector('#one-movie .details .rating');
const summary = document.querySelector('#one-movie .details div');

const randomMovie = (obj) => {
  if (obj) {
    const details = getDetails(obj);
    randomMov.classList = details.id;
    randomMov.style.backgroundImage = `url(${details.image})`;
    heading.textContent = details.name;
    genres.textContent = details.genres.join(', ');
    rating.textContent = `${obj.rating.average}`;
    summary.innerHTML = details.summary;
  } else displayShows();
};

// ========= adding an event listener on the watch more button which shows all reasons
const btn = document.querySelector('.show-more');
btn.addEventListener('click', fetchSeasons);

// ========= loop over the fetched array of movies and display them in the page  =========
const renderTvShows = (arr) => {
  moviesContainer.style.display = 'block';
  seasonsContainer.style.display = 'none';
  moviesContainer.textContent = '';

  arr.forEach((e) => {
    const movie = document.createElement('div');
    const details = document.createElement('div');
    const imgDiv = document.createElement('div');
    const name = document.createElement('div');
    const title = document.createElement('h3');
    const genre = document.createElement('p');
    const btn = document.createElement('button');

    movie.classList = 'movie';
    details.classList = 'details';
    imgDiv.classList = 'img';
    name.classList = 'name';

    imgDiv.style.backgroundImage = `url(${e.image.original})`;
    title.textContent = e.name;
    genre.textContent = e.genres.join(', ');
    btn.textContent = 'See More';

    movie.appendChild(details);
    details.appendChild(imgDiv);
    name.appendChild(title);
    name.appendChild(genre);
    details.appendChild(name);
    movie.appendChild(btn);

    moviesContainer.appendChild(movie);

    btn.addEventListener('click', () => {
      randomMovie(e);
    });
  });
};

// ===============  search for one show and display it with randomMovie function ===============

let input = document.querySelector('.search input');
input.addEventListener('keyup', (e) => {
  const value = e.target.value;
  if (value) {
    fetch(
      `https://api.tvmaze.com/singlesearch/shows?q=${e.target.value}`,
      randomMovie
    );
  } else displayShows();
});

// =============  fetches all tv shows and handles them with renderTvShows =============

const displayShows = () => {
  fetch('https://api.tvmaze.com/shows', (data) => {
    renderTvShows(data.slice(0, 50));
    const random = data[Math.floor(Math.random() * data.length)];
    randomMovie(random);
  });
};

displayShows();
