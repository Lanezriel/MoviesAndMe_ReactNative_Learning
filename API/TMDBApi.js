const filmApiToken = '42059ef47087a09e0245394347a40a11';

export function getFilmsFromApiWithSearchedText(text, page) {
  const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + filmApiToken +
    '&language=fr&query=' + text + '&page=' + page;

  return fetch(url)
    .then(response => response.json())
    .catch(error => console.error(error));
}

export const getImageFromApi = (image) => 'https://image.tmdb.org/t/p/w300' + image;

export function getFilmDetailsFromApi(id) {
  const url = 'https://api.themoviedb.org/3/movie/' + id +
    '?api_key=' + filmApiToken + '&language=fr';
  
  return fetch(url)
    .then(response => response.json())
    .catch(error => console.error(error));
}

export function getLatestFilmsFromApi(page) {
  const url = 'https://api.themoviedb.org/3/discover/movie?api_key=' + filmApiToken +
    '&vote_count.gte=1000&sort_by=release_date.desc&language=fr&page=' + page;

    return fetch(url)
      .then(response => response.json())
      .catch(error => console.error(error));
}