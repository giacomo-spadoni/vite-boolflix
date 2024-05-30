<script>
export default {
  props: ['data', 'titleMovie', 'airDate'],
  data() {
    return {
      stars: '',
      halfStars: '',
      noStars: '',
    };
  },
  methods: {
    getImage(nomefile) {
      return new URL(`../assets/${nomefile}`, import.meta.url);
    },
    showImage() {
      if (this.data.poster_path) {
        return 'https://image.tmdb.org/t/p/w300' + this.data.poster_path;
      } else {
        return 'http://www.tecno-store.it/wp-content/uploads/immagine-non-disponibile-q.png';
      }
    },
    voteInStar() {
      const average = this.data.vote_average / 2;
      const decimal = average - Math.floor(average);

      this.stars = Math.floor(average);

      if (decimal > 0.75) {
        this.stars += 1;
        this.halfStars = 0;
      } else if (decimal >= 0.25 && decimal <= 0.75) {
        this.halfStars = 1;
      } else {
        this.halfStars = 0;
      }

      this.noStars = 5 - this.stars - this.halfStars;
    },
  },
  mounted() {
    this.voteInStar();
  },
  watch: {
    data: {
      immediate: true,
      handler() {
        this.voteInStar();
      },
    },
  },
};
</script>

<template>
  <div class="card">
    <div class="flex">
      <div class="title">{{ titleMovie }}</div>
      <img width="300px" :src="showImage()" alt="" />
    </div>
    <div class="description">
      <div><span class="bold">Titolo:</span> {{ titleMovie }}</div>
      <div v-show="airDate">
        <span class="bold">Data uscita:</span> {{ airDate }}
      </div>
      <div>
        <span class="bold">Voto medio: </span>
        <span v-for="n in stars"><i class="fa-solid fa-star"></i></span>
        <span v-show="halfStars"
          ><i class="fa-solid fa-star-half-stroke"></i
        ></span>
        <span v-for="n in noStars"><i class="fa-regular fa-star"></i></span>
      </div>
      <div v-show="data.overview">
        <span class="bold">Trama:</span> {{ data.overview }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.flex {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.description {
  font-size: 20px;
  width: 90%;
  margin-left: 3%;
  padding-right: 7%;
  padding-top: 0.5rem;
  position: absolute;
  top: 4rem;
  opacity: 0;
  height: calc(475px - 4rem);
  overflow: auto;
  transition: 0.5s;
}

.title {
  width: 80%;
  font-size: 20px;
  height: 4rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.card {
  border-radius: 10px;
  position: relative;
  background-color: rgb(81, 81, 81);
  border: 2px solid black;
  width: 300px;
  height: calc(475px + 1rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}

img {
  width: 100%;
  object-fit: contain;
  /* object-position: 0 -20px; */
  transition: 0.5s;
  border-radius: 10px 10px 0 0;
}

.card:hover img {
  opacity: 0.07;
}

.card:hover .description {
  opacity: 1;
}

.description div {
  margin-bottom: 10px;
}

.bold {
  font-weight: bold;
}
</style>
