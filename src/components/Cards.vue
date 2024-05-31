<script>
import store from '../data/store.js';
import { searchVideo } from '../data/store.js';
export default {
  props: ['data', 'titleMovie', 'airDate'],
  data() {
    return {
      store,
      stars: '',
      halfStars: '',
      noStars: '',
      show: false,
      videoOn: false,
    };
  },
  methods: {
    getImage(nomefile) {
      return new URL(`../assets/${nomefile}`, import.meta.url);
    },
    showImage() {
      if (this.data.poster_path) {
        return 'https://image.tmdb.org/t/p/w500' + this.data.poster_path;
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
    showFocus() {
      this.show = true;
    },
    videoOnFunction() {
      this.videoOn = true;
      this.store.videoId = this.data.id;
      console.log(this.store.videoId);
      searchVideo();
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
  <div @click="showFocus()" class="card">
    <div class="card-container">
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
    </div>
  </div>
  <div v-show="show" class="movie-data">
    <iframe
      v-show="videoOn"
      :src="store.youTubeId"
      width="1000"
      height="700"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
    <div v-show="!videoOn" class="focus-movie">
      <div class="img-container">
        <img :src="showImage()" alt="" />
      </div>
      <div class="focus-description">
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
        <div @click="videoOnFunction()" class="trailer">Guarda il trailer</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.movie-data {
  position: absolute;
  top: 7rem;
  left: 28.5rem;
  width: 1000px;
  height: 700px;
  background-color: rgb(81, 81, 81);
  border-radius: 20px;
  z-index: 10;
  overflow: hidden;
}

.focus-movie {
  width: 1000px;
  height: 700px;
  background-color: rgb(81, 81, 81);
  border-radius: 20px;
  z-index: 10;
  display: flex;
  overflow: hidden;
}

.focus-movie div {
  flex-shrink: 0;
}
.focus-movie img {
  object-position: -20px -30px;
}

.focus-description {
  width: 48%;
  font-size: 20px;
}

.focus-description .bold {
  font-size: 30px;
}

.trailer {
  text-align: center;
  font-size: 30px;
  border: 2px solid white;
  width: 60%;
  margin: 20px auto;
  cursor: pointer;
  transition: 0.5s;
}

.trailer:hover {
  border-color: #f1ff5c;
  color: #f1ff5c;
  transform: translateY(-0.25em);
  box-shadow: 0 0.5em 0.5em -0.4em #f1ff5c;
  cursor: pointer;
}

.card-container {
  /* display: flex;
  flex-direction: column;
  align-items: center; */
  height: calc(475px + 1rem);
  width: 300px;
  overflow: hidden;
  border-radius: 0 0 10px 10px;
}

.description {
  font-size: 20px;
  width: 100%;
  position: absolute;
  top: 50%;
  opacity: 0;
  height: 200px;
  transition: 0.5s;
  z-index: 2;
  text-align: center;
  /* background-color: rgb(81, 81, 81); */
}

.title {
  width: 80%;
  margin: 0 auto;
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
  background-color: rgb(48, 25, 25);
  border: 2px solid black;
  width: 300px;
  height: calc(475px + 1rem);
  display: flex;
  flex-direction: column;
  align-items: center;
}

img {
  width: 100%;
  object-fit: contain;
  transition: 0.5s;
  border-radius: 10px;
  display: block;
}

.card:hover img {
  opacity: 0.3;
  scale: 1.5;
}

.card:hover .description {
  opacity: 1;
  scale: 1.5;
}
.card:hover .card-container {
  overflow: unset;
  z-index: 2;
  color: rgb(48, 25, 25);
  transition: 0.3s;
}

.description div {
  margin-bottom: 10px;
}

.bold {
  font-weight: bold;
}
</style>
