// Display a random movie
const randomMov = document.querySelector('#one-movie');

console.log(randomMov.children[1].children[0]);
const randomMovie = (obj) => {
  const details = getDetails(obj);
  console.log(details);
  document.querySelector('#one-movie .details h2').innerHTML = `${
    obj.name
  } <span>${details.genres.join(', ')}</span>`;

  document.querySelector(
    '#one-movie'
  ).style.backgroundImage = `url(${details.image})`;

  console.log(obj.image);
};

//  render data and display them in the page
const moviesContainer = document.querySelector('#movies-section');

const renderData = (arr) => {
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

    movie.appendChild(btn);

    moviesContainer.appendChild(movie);
  });
};

fetch('https://api.tvmaze.com/shows', (data) => {
  renderData(data.slice(0, 50));
  const random = data[Math.floor(Math.random() * data.length)];
  randomMovie(random);
});
