import axios from 'axios';
import { reactive } from 'vue';

let store = reactive({
  searched: '',
  searchedMovies: [],
  searchedTv: [],
  popular: [],
  videoId: '',
  youTubeId: '',
  options: {
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYTQ5ZGNiYWM2MDc0NGM5NzU5NjVjYzA4OWI1MWRkZiIsInN1YiI6IjY2NTgzM2ZmMmM3NTM3ZjU4MTFkMTM2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YgWXRttyRYsD6J06a4c4Ij-lDNRupqN6OMUf7Drbry4',
    },
  },
  urlTvSearch:
    'https://api.themoviedb.org/3/search/tv?include_adult=false&language=it-IT&page=1&query=',
  urlPopular:
    'https://api.themoviedb.org/3/movie/popular?language=it-IT&page=1',
  urlMovieSearch:
    'https://api.themoviedb.org/3/search/movie?include_adult=false&language=it-IT&page=1&query=',
});

export function PopularMovies() {
  return axios.get(store.urlPopular, store.options).then((response) => {
    store.popular = response.data.results.sort(
      (a, b) => b.popularity - a.popularity
    );
    console.log(store.popular);
  });
}

export function searchMovies() {
  return axios
    .get(store.urlMovieSearch + store.searched, store.options)
    .then((response) => {
      store.searchedMovies = response.data.results.sort(
        (a, b) => b.popularity - a.popularity
      );
      console.log(store.searchedMovies);
    });
}

export function searchTv() {
  return axios
    .get(store.urlTvSearch + store.searched, store.options)
    .then((response) => {
      store.searchedTv = response.data.results.sort(
        (a, b) => b.popularity - a.popularity
      );
      console.log(store.searchedTv);
    });
}

export function searchVideo() {
  return axios
    .get(
      `https://api.themoviedb.org/3/movie/${store.videoId}/videos?language=en-US`,
      store.options
    )
    .then((response) => {
      console.log(response.data.results[0].key);
      store.youTubeId = `https://www.youtube.com/embed/${response.data.results[1].key}?autoplay=1&mute=1`;
    });
}

export default store;
