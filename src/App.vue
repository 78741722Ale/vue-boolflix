<template>
  <div id="app">
    <!-- First Container -->
    <div class="container bg_try h_px_sm mar_auto">
      <!-- First Row -->
      <div class="row flex_between h_xl">
        <!-- Logo Netflix -->
        <div class="col-sm h_xl flex_cent">
          <img src="@/assets/logo.png" alt="">
        </div>
        <!-- Input Type Text -->
        <div class="col-sm p_sm h_xl flex_cent">
          <!-- SearchBar (al v-model viene dato l'input con var presente nello state) -->
          <input v-model="searchFilm" @formControl="searchMethod" class="h_sm" type="text" placeholder="Cerca un Film">
          <!-- I film li mostro solo al click della mia function filtherFilms -->
          <button @click="filtherFilms" class="h_sm" type="submit">Cerca un Film</button>  
        </div>
      </div>
    </div>
    <!-- Second Container  -->
    <div class="container mar_top  bg_try mar_auto">
      <!-- Seconda Row -->
      <div class="row h_xl bg_contrast">
        <!-- Ora lo Faccio come lista non ordinata, poi svilupperò la card -->
        <ul v-for="movie in movies" :key="movie.id">
            <!-- Titolo Della film card (sarà un H) -->
            <li><h3>{{movie.title}}</h3></li>  
            <!-- Titolo originale (sara uno span) -->
            <li><h5>{{movie.original_title}}</h5></li> 
            <!-- Lingua del Film prodotto -->
            <li>{{movie.original_language}}</li>
            <!-- Voto -->  
            <li>{{movie.vote_average}} </li> 
            <!-- Bandierine dei film -->
            <flag :iso="movie.original_language" />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

/* Import di Axios */
import axios from "axios";
/* Import dello state */
import state from '@/state.js';

export default {
  name: 'App',
  components: {
    // HelloWorld
  },
  data() {
    return {
      movies: null, // Array inizialmente vuoto
      /* loading: true : per ora non so se serve */ 
      /* error: null, : per ora non so se serve */
      searchFilm: '', // Metodo per ricercare il film => questo nel v-model
    };
  },
  methods: {
    /* Method di richiamo API */
    filtherFilms(){
      axios
      // Richiamo Api tramite This tramite template literal, altrimenti non riesco a mostrarla a schermo
      .get(`https://api.themoviedb.org/3/search/movie?api_key=98d2bdd48bfc7c3ba0b288ac94e06943&language=en-US&page=1&include_adult=false&query=?${this.searchFilm}`) 
      .then((response) => {
        this.movies = response.data.results // array(object) di film salvata in response.data
        /* Aggiornato con results poicè era annidato li dentro */
        /* this.loading = true : Questo valuta se serve poi */
      }).catch((error) => {
        console.error();
        this.error = `Sorry There is a problem! ${error}`;
      }) 
    },
    /* Method per il search dell'input (servirà quando avro bisogno di Emit) */
    searchMethod(){
      console.log('Searching...');
      console.log(this.searchFilm);
      state.searchFilm = this.searchFilm; 
      console.log(state.searchFilm); // Console log di verifica
    },
  },
  mounted() {
    this.filtherFilms() // richiamo la mia function nel mounted
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/sass/style.scss";

</style>
