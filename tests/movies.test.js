const logic = require('../js/logic/movies');

const obj = {
  id: 55430,
  url: 'https://www.tvmaze.com/shows/55430/vampire-academy',
  name: 'Vampire Academy',
  type: 'Scripted',
  language: 'English',
  genres: ['Drama', 'Romance', 'Supernatural'],
  status: 'In Development',
  runtime: null,
  averageRuntime: null,
  premiered: '2022-09-15',
  ended: null,
  officialSite: null,
  schedule: {
    time: '',
    days: ['Thursday'],
  },
  rating: {
    average: null,
  },
  weight: 98,
  network: null,
  webChannel: {
    id: 347,
    name: 'Peacock',
    country: {
      name: 'United States',
      code: 'US',
      timezone: 'America/New_York',
    },
    officialSite: 'https://www.peacocktv.com/',
  },
  dvdCountry: null,
  externals: {
    tvrage: null,
    thetvdb: 403187,
    imdb: 'tt14689620',
  },
  image: {
    medium:
      'https://static.tvmaze.com/uploads/images/medium_portrait/417/1042928.jpg',
    original:
      'https://static.tvmaze.com/uploads/images/original_untouched/417/1042928.jpg',
  },
  summary:
    "<p><b>Vampire Academy</b> is based on a series of young adult paranormal romance novels by international bestselling author Richelle Mead. In a world of privilege and glamour, two young women's friendship transcends their strikingly different classes as they prepare to complete their education and enter royal vampire society. This serialized and sexy drama combines the elegance of aristocratic romance and the supernatural thrills of the vampire genre.</p>",
  updated: 1658901502,
  _links: {
    self: {
      href: 'https://api.tvmaze.com/shows/55430',
    },
    nextepisode: {
      href: 'https://api.tvmaze.com/episodes/2355053',
    },
  },
};

test('testing the getElement function', () => {
  const details = logic.getDetails(obj);

  expect(logic.getDetails(obj)).toEqual({
    name: obj.name,
    genres: obj.genres,
    image: obj.image.original,
    url: obj.url,
  });

  expect(Object.keys(details).length).toBe(4);
});
