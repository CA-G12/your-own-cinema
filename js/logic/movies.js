const getDetails = (obj) => {
  let details = {
    id: obj.id,
    name: obj.name,
    genres: obj.genres,
    image: obj.image.original,
    url: obj.url,
    summary: obj.summary,
  };

  return details;
};

if (typeof module !== 'undefined') {
  module.exports = { getDetails };
}
