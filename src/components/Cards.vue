<script>
import store from '../data/store.js';
import { searchVideo, clearVideo } from '../data/store.js';
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
      isAnimated: false,
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
      this.store.showGlobal = true;
      console.log('lo showGlobal è: ' + this.store.showGlobal);
      this.store.videoId = this.data.id;
      console.log(this.store.videoId);
      this.isAnimated = !this.isAnimated;
    },
    videoOnFunction() {
      this.videoOn = true;
      searchVideo();
    },
    backVideo() {
      this.videoOn = false;
      this.store.errorVideo = false;
      clearVideo();
    },
    closeShow() {
      this.show = false;
      this.videoOn = false;
      this.store.showGlobal = false;
      this.store.errorVideo = false;
      clearVideo();
      this.isAnimated = !this.isAnimated;
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
      <div>
        <i @click="showFocus()" class="focus fa-solid fa-angle-down">
          <div class="other">
            <i class="balloon fa-solid fa-sort-up"></i>
            Altre info
          </div></i
        >
      </div>
    </div>
  </div>
  <div ref="anim" class="movie-data" :class="{ animation: isAnimated }">
    <div class="buttons-trailer">
      <i
        @click="backVideo()"
        v-show="videoOn"
        class="back fa-solid fa-arrow-left"
      ></i>
      <i @click="closeShow()" class="close fa-solid fa-xmark"></i>
    </div>
    <div v-show="videoOn && store.errorVideo" class="error">
      video al momento <br />
      non disponibile <br />🥲
    </div>
    <iframe
      v-show="videoOn"
      :src="store.youTubeId"
      width="1000"
      height="690"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
    <div v-show="!videoOn" class="focus-movie">
      <div class="img-container">
        <img class="fade-right" :src="showImage()" alt="" />
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
  position: fixed;
  top: 7rem;
  left: calc(50% - 500px);
  width: 1000px;
  height: 730px;
  background-color: rgb(81, 81, 81);
  border-radius: 20px;
  overflow: hidden;
  opacity: 0;
  scale: 0.7;
  z-index: -1;
}

.animation {
  scale: 1;
  opacity: 1;
  transition: 0.5s;
  z-index: 10;
}

.error {
  background-color: rgb(81, 81, 81);
  height: 730px;
  text-align: center;
  padding-top: 300px;
  font-size: 40px;
}

.buttons-trailer {
  position: absolute;
  right: 3%;
  top: 2px;
  font-size: 20px;
}

.close {
  border: 3px solid #4e1c1c;
  background-color: #7e2e2e;
  color: #4e1c1c;
  width: 30px;
  height: 25px;
  text-align: center;
  padding-top: 5px;
  border-radius: 50%;
  cursor: pointer;
  margin-left: 7px;
}

.close:hover {
  background-color: #bc4343;
}

.back {
  border: 3px solid #383b15;
  background-color: #787e2e;
  color: #383b15;
  width: 30px;
  height: 25px;
  text-align: center;
  padding-top: 5px;
  border-radius: 50%;
  cursor: pointer;
}

.back:hover {
  background-color: rgb(220, 230, 105);
}

iframe {
  margin-top: 40px;
}

.focus-movie {
  width: 1000px;
  height: 730px;
  margin-top: 40px;
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

.fade-right {
  -webkit-mask-image: linear-gradient(to right, black 50%, transparent 90%);
  mask-image: linear-gradient(to right, black 50%, transparent 90%);
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
  height: calc(475px + 1rem);
  width: 300px;
  overflow: hidden;
  border-radius: 0 0 10px 10px;
  cursor: default;
}

.description {
  font-size: 20px;
  width: 100%;
  position: absolute;
  top: 40%;
  opacity: 0;
  height: 200px;
  transition: 0.5s;
  z-index: 2;
  text-align: center;
  cursor: default;
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

.focus {
  border: 2px solid white;
  width: 30px;
  height: 24px;
  text-align: center;
  padding-top: 6px;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
}

.other {
  width: 6rem;
  color: black;
  background-color: white;
  padding: 5px 10px;
  display: none;
  border-radius: 10px;
  position: absolute;
  font-weight: bold;
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  top: 45px;
  left: -42px;
}

.balloon {
  position: absolute;
  top: -10px;
  left: calc(50% - 10px);
  font-size: 30px;
  color: white;
}

.focus:hover {
  background-color: rgba(255, 255, 255, 0.438);
}

.focus:hover .other {
  display: inline-block;
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
  opacity: 0.2;
  scale: 1.1;
}

.card:hover .description {
  opacity: 1;
  scale: 1.1;
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
