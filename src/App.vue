<template>
  <div id="app">
    <!-- Site Header -->
    <div id="site_header">
      <!-- First Container -->
      <div class="container-fluid h-100">
        <!-- First Row -->
        <div class="row row-cols-2 w-100 h-100 justify-content-between">
          <!-- Logo Sito Web -->
          <div class="col-auto flex_cent">
            <img src="@/assets/logo.png" alt="Logo Del Sito" />
          </div>
          <!-- Input Type Text -->
          <div class="col-auto flex_cent">
            <!-- SearchBar (al v-model viene dato l'input con var presente nello state) -->
            <input
              v-model="searchFilm"
              @formControl="filtherFilms"
              type="text"
              class="p-2 mx-3"
              placeholder="Cerca un Film"
            />
            <!-- I film li mostro solo al click della mia function filtherFilms -->
            <button @click="filtherFilms" class="btn btn-danger p-2" type="submit">Cerca</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Site Main -->
    <div id="site_main">
      <!-- Container cards  -->
      <div class="container">
        <!-- Row delle cards -->
        <div class="row row-cols-4 gap-4 p-5 gy-2 h-100 flex_cent">
          <!-- sviluppo la card per i movies -->
          <div v-for="movie in movies" :key="movie.id" class="card-body flex_cent flex-column col-auto flex-wrap">
            <!-- Condizione v-if -->
            <!-- Condizione 1 (senza errori) v-if="(ImageLink + movie.poster_path) === brokeUrl" -->
            <!-- Condizione 2 <img :src="getImageFromAPI(movie.poster_path)" alt="movie.title"> | Metodo senza Function -->
            <div class="col-12 flex_cent w-100" v-if="ImageLink + movie.poster_path === brokeUrl">
              <div class="null_photo" alt="movie.title"></div>
            </div>
            <!-- Condizione V-else in cui appunto racchiudo l'immagine corretta -->
            <div class="col-12" v-else>
              <img :src="getImageFromAPI(movie.poster_path)" alt="movie.title"/>
            </div>  
            <!-- Titolo Della film card -->
            <div class="col-12 h_title flex_cent">
              <h4 class="text-center mb-0">{{ movie.title }}</h4>  
            </div>
            <!-- Info film prodotto -->
            <div class="col-12 gap-2 h_title flex_cent">
              <!-- Titolo originale -->
              <div class="col-6 d-flex justify-content-center align-items-center">
                <span class="text-center mb-0">{{ movie.original_title }}</span>   
              </div>
              <!-- Lingua del Film prodotto -->
              <div class="col-6 d-flex gap-3 justify-content-center align-items-center border-info">
                <!-- Lingua del Film prodotto -->
                <span>{{ movie.original_language }}</span>  
                <!-- Bandierine dei film -->
                <!-- bindo nell'iso la funziona con parametro che equivale a movie.original_language -->
                <flag :iso="filtherFlag(movie.original_language)" />  
              </div>
            </div>
            <!-- Rating prodotto -->
            <div class="col-12 flex_cent pb-3">
                <!-- Voto -->
                <!-- <span>{{ movie.vote_average }}</span> -->
                <star-rating
                width="0"
                heigth="0"
                :rating="Math.ceil(parseInt(movie.vote_average) / value)"
                :read-only="true"
                :increment="0.01"
                > </star-rating>
            </div>  
          </div>
          <!-- sviluppo la card per i series -->
          <div v-for="serie in series" :key="serie.id" class="card-body flex_cent flex-column col-auto flex-wrap">
            <!-- Condizione v-if -->
            <!-- Condizione 1 (senza errori) v-if="(ImageLink + movie.poster_path) === brokeUrl" -->
            <!-- Condizione 2 <img :src="getImageFromAPI(movie.poster_path)" alt="movie.title"> | Metodo senza Function -->
            <div class="col-12" v-if="ImageLink + serie.poster_path === brokeUrl">
              <div class="null_photo" alt="serie.title"></div>
            </div>
            <!-- Condizione V-else in cui appunto racchiudo l'immagine corretta -->
            <div class="col-12" v-else>
              <img :src="getImageFromAPI(serie.poster_path)" alt="serie.title"/>
            </div>      
            <!-- Titolo Della film card -->
            <div class="col-12 h_title flex_cent">
              <h4 class="text-center mb-0">{{ serie.name }}</h4>  
            </div>
            <!-- Info Serie prodotto -->
            <div class="col-12 gap-2 h_title flex_cent">
              <!-- Titolo originale -->
              <div class="col-6 d-flex justify-content-center align-items-center">
                <span class="text-center mb-0">{{ serie.original_name }}</span>   
              </div>
              <!-- Lingua del Film prodotto -->
              <div class="col-6 d-flex gap-3 justify-content-center align-items-center border-info">
                <!-- Lingua del Film prodotto -->
                <span>{{ serie.original_language }}</span>  
                <!-- Bandierine dei film -->
                <!-- bindo nell'iso la funziona con parametro che equivale a movie.original_language -->
                <flag :iso="filtherFlag(serie.original_language)" />  
              </div>
            </div>   
            <!-- Rating prodotto -->
            <div class="col-12 flex_cent pb-3">
                <!-- Voto -->
                <!-- <span>{{ serie.vote_average }}</span> -->
                <!-- Valore della votazione per le stelline -->
                <star-rating
                :rating="Math.ceil(parseInt(serie.vote_average) / value)"
                :read-only="true"
                :increment="0.01"
                > </star-rating>
            </div>  
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

/* Import di Axios */
import axios from "axios";
/* Import dello state */
import state from "@/state.js";
/* Import dello star rating per le stelline */
import StarRating from "vue-star-rating";

export default {
  name: "App",
  components: {
    // HelloWorld
    StarRating,
  },
  data() {
    return {
      movies: null, // Array inizialmente vuoto
      series: null,
      /* loading: true : per ora non so se serve */
      /* error: null, : per ora non so se serve */
      searchFilm: "", // Metodo per ricercare il film => questo nel v-model
      /* URL DINAMICI */
      Films:
        "https://api.themoviedb.org/3/search/movie?api_key=98d2bdd48bfc7c3ba0b288ac94e06943&language=en-US&page=1&include_adult=false&query=?",
      Series:
        "https://api.themoviedb.org/3/search/tv?api_key=98d2bdd48bfc7c3ba0b288ac94e06943&language=en-US&page=1&include_adult=false&query=?",
      // Spezzone di link necessario per far leggere l'immagine
      ImageLink: "https://image.tmdb.org/t/p/w342/",
      brokeUrl: "https://image.tmdb.org/t/p/w342/null",
      // valore da dividere per le stelline
      value: 2,
    };
  },
  methods: {
    /* Method di richiamo API */
    filtherFilms() {
      /* Prima Chiamata AXIOS */
      axios
        // Richiamo Api tramite This tramite template literal, altrimenti non riesco a mostrarla a schermo
        .get(this.Films + this.searchFilm)
        .then((response) => {
          this.movies = response.data.results; // array(object) di film salvata in response.data
          /* Aggiornato con results poicè era annidato li dentro */
          /* this.loading = true : Questo valuta se serve poi */
        })
        .catch((error) => {
          console.error();
          this.error = `Sorry There is a problem! ${error}`;
        });

      /* Seconda Chiamata AXIOS */
      axios
        .get(this.Series + this.searchFilm)
        .then((response) => {
          this.series = response.data.results; // array(object) di film salvata in response.data
          /* Aggiornato con results poicè era annidato li dentro */
          /* this.loading = true : Questo valuta se serve poi */
        })
        .catch((error) => {
          console.error();
          this.error = `Sorry There is a problem! ${error}`;
        });
    },
    /* Method per il search dell'input (servirà quando avro bisogno di Emit) */
    searchMethod() {
      console.log("Searching...");
      console.log(this.searchFilm);
      state.searchFilm = this.searchFilm;
      console.log(state.searchFilm); // Console log di verifica
    },
    /* Method per filtrare le bandiere */
    /**
     * filtherFlag => Method per filtrare la bandiera degli US
     * flagFilter => movie.original_language
     */
    filtherFlag(flagFilter) {
      /* Condizionale */
      if (flagFilter == "en") {
        return (flagFilter = "gb");
      } else {
        return flagFilter;
      }
    },
    /** Method per richiamare il link prova 3/3
     * element => Url dell'immagine API (incompleto)
     */
    getImageFromAPI(element) {
      // Eseguo la chiamata axios con get del parametro
      axios
        .get(`${this.ImageLink + element}`)
        .then((response) => response.data.results);
      // ovviamente devo ritornare senno non mi piglia niente!
      return this.ImageLink + element;
    },
  },
  mounted() {
    this.filtherFilms(); // richiamo la mia function nel mounted
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/style.scss";
</style>
