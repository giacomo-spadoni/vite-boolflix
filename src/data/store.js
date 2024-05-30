import axios from 'axios';
import { reactive } from 'vue';

let store = reactive({
  searched: '',
  searchedMovies: [],
  popular: [],
  options: {
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYTQ5ZGNiYWM2MDc0NGM5NzU5NjVjYzA4OWI1MWRkZiIsInN1YiI6IjY2NTgzM2ZmMmM3NTM3ZjU4MTFkMTM2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YgWXRttyRYsD6J06a4c4Ij-lDNRupqN6OMUf7Drbry4',
    },
  },
  urlPopular:
    'https://api.themoviedb.org/3/person/popular?language=en-US&page=1',
  urlMovieSearch:
    'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=',
});

export function searchMovies() {
  return axios
    .get(store.urlMovieSearch + store.searched, store.options)
    .then((response) => {
      store.searchedMovies = response.data.results;
      console.log(store.searchedMovies);
    });
}

export function fetchPopularMovies() {
  return axios.get(store.urlPopular, store.options).then((response) => {
    store.popular = response.data.results;
    console.log(store.popular);
  });
}

export default store;
