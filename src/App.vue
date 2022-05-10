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
          <input v-model="searchFilm" @formControl="filtherFilms" class="h_sm" type="text" placeholder="Cerca un Film">
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
            <!-- Immagine per le serie TV -->
            <!-- <img :src="(ImageLink + movie.poster_path)" alt="movie.title"> | Metodo senza Function -->
            
            <!-- Condizione v-if -->
            <div v-if="(ImageLink + movie.poster_path) === brokeUrl">
              <div class="null_photo" alt="movie.title"></div>
            </div>
            <!-- Condizione V-else in cui appunto racchiudo l'immagine corretta --> 
            <div v-else>
              <img :src="(ImageLink + movie.poster_path)" alt="movie.title"> 
              <!-- <img :src="getImageFromAPI(movie.poster_path)" alt="movie.title">  -->
            </div>
            <!-- Titolo Della film card (sarà un H) -->
            <li><h3>{{movie.title}}</h3></li>  
            <!-- Titolo originale (sara uno span) -->
            <li><h5>{{movie.original_title}}</h5></li> 
            <!-- Lingua del Film prodotto -->
            <li>{{movie.original_language}}</li>
            <!-- Voto -->  
            <li>{{movie.vote_average}} </li> 
            <!-- Bandierine dei film -->
            <!-- bindo nell'iso la funziona con parametro che equivale a movie.original_language -->
            <flag :iso="filtherFlag(movie.original_language)" />
        </ul>
        <!-- Ora lista non ordinata per i list item di Series -->
        <ul v-for="serie in series" :key="serie.id">
            <!-- Immagine per le serie TV -->
            <img :src="getImageFromAPI(serie.poster_path)" alt="serie.title">
            <!-- Titolo Della film card (sarà un H) -->
            <li><h3>{{serie.name}}</h3></li>  
            <!-- Titolo originale (sara uno span) -->
            <li><h5>{{serie.original_name}}</h5></li> 
            <!-- Lingua del Film prodotto -->
            <li>{{serie.original_language}}</li>
            <!-- Voto -->  
            <li>{{serie.vote_average}} </li> 
            <!-- Bandierine dei film -->
            <!-- bindo nell'iso la funziona con parametro che equivale a movie.original_language -->
            <flag :iso="filtherFlag(serie.original_language)" />
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
      series: null,
      /* loading: true : per ora non so se serve */ 
      /* error: null, : per ora non so se serve */
      searchFilm: '', // Metodo per ricercare il film => questo nel v-model
      /* URL DINAMICI */
      Films : 'https://api.themoviedb.org/3/search/movie?api_key=98d2bdd48bfc7c3ba0b288ac94e06943&language=en-US&page=1&include_adult=false&query=?',
      Series : 'https://api.themoviedb.org/3/search/tv?api_key=98d2bdd48bfc7c3ba0b288ac94e06943&language=en-US&page=1&include_adult=false&query=?',
      // Spezzone di link necessario per far leggere l'immagine
      ImageLink : "https://image.tmdb.org/t/p/w342/",
      brokeUrl : "https://image.tmdb.org/t/p/w342/null"
    };
  },
  methods: {
    /* Method di richiamo API */
    filtherFilms(){
      /* Prima Chiamata AXIOS */
      axios
      // Richiamo Api tramite This tramite template literal, altrimenti non riesco a mostrarla a schermo
      .get(this.Films + this.searchFilm) 
      .then((response) => {
        this.movies = response.data.results // array(object) di film salvata in response.data
        /* Aggiornato con results poicè era annidato li dentro */
        /* this.loading = true : Questo valuta se serve poi */
      }).catch((error) => {
        console.error();
        this.error = `Sorry There is a problem! ${error}`;
      });
      
      /* Seconda Chiamata AXIOS */
      axios
      .get(this.Series + this.searchFilm)
      .then((response) => {
        this.series = response.data.results // array(object) di film salvata in response.data
        /* Aggiornato con results poicè era annidato li dentro */
        /* this.loading = true : Questo valuta se serve poi */
      }).catch((error) => {
        console.error();
        this.error = `Sorry There is a problem! ${error}`;
      });
    },
    /* Method per il search dell'input (servirà quando avro bisogno di Emit) */
    searchMethod(){
      console.log('Searching...');
      console.log(this.searchFilm);
      state.searchFilm = this.searchFilm; 
      console.log(state.searchFilm); // Console log di verifica
    },
    /* Method per filtrare le bandiere */
    /**
     * filtherFlag => Method per filtrare la bandiera degli US
     * flagFilter => movie.original_language 
     */
    filtherFlag(flagFilter){
      /* Condizionale */
      if(flagFilter == 'en') {
        return flagFilter = 'gb'
      } else {
        return flagFilter
      }
    },
    /** Method per richiamare il link prova 3/3
     * element => Url dell'immagine API (incompleto)
     */
    getImageFromAPI(element) {
      // Eseguo la chiamata axios con get del parametro
      axios.get(`${this.ImageLink + element}`)
      .then(response => response.data.results)
      /* 
      Salvo il bad Request da qualche parte 

      this.brokeUrl = "https://image.tmdb.org/t/p/w342/null"
      console.log(`Questo è il console log dell'errore ${this.brokeUrl}`); 
      */
      
      /* Questo ciclo solo in caso di conditional 
      
      Avvio il ciclo per verificare la condizione in cui element (che è il mio url) é diverso dal mio brokeUrl 
      if(element != this.brokeUrl) {
      // Verifico in console log l'elemento
        console.log(`C'è un errore con la visualizzazione di questo ${element}`);
      } 
      else {
      // Verifico in console la chiamata Axios 
      console.log(`Questo è l'elemento richiamato nel method getImageFromAPI : ${this.ImageLink + element}`);
      }

      */

      // ovviamente devo ritornare senno non mi piglia niente!
      return this.ImageLink + element

    }
  },
  mounted() {
    this.filtherFilms() // richiamo la mia function nel mounted
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/sass/style.scss";

</style>
