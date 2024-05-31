<script>
import { PopularMovies, searchMovies } from '../data/store.js';
import store from '../data/store.js';
import Card from './Cards.vue';
export default {
  components: {
    Card,
  },
  data() {
    return {
      store,
      show: false,
    };
  },
  methods: {
    getImage(nomefile) {
      return new URL(`../assets/${nomefile}`, import.meta.url);
    },
  },
  computed: {
    filmShow() {
      return this.store.searchedMovies.length
        ? this.store.searchedMovies
        : this.store.popular;
    },
    seriesShow() {
      return this.store.searchedTv.length ? this.store.searchedTv : '';
    },
  },
  mounted() {
    PopularMovies();
  },
};
</script>

<template>
  <main>
    <section>
      <div class="categories">
        <h2>Movies</h2>
        <div class="container">
          <Card
            v-for="(movie, i) in filmShow"
            :data="movie"
            :titleMovie="movie.title"
            :airDate="movie.release_date"
          />
        </div>
      </div>
      <div class="categories">
        <h2 v-show="seriesShow.length">Tv-Series</h2>
        <div class="container">
          <Card
            v-for="(series, i) in seriesShow"
            :data="series"
            :titleMovie="series.name"
            :airDate="series.first_air_date"
          />
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
section {
  width: 1600px;
  margin: 0 auto;
}
.container {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: start;
}

.categories {
  background-color: rgba(255, 0, 0, 0.19);
  padding-left: 0.5rem;
  border-radius: 10px;
  padding-bottom: 1rem;
}
</style>
