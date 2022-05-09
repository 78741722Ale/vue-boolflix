<template>
  <div id="app">
    <!-- First Container -->
    <div class="container bg_try h_px_sm mar_auto">
      <!-- First Row -->
      <div class="row flex_between h_xl">
        <!-- Logo Netflix -->
        <div class="col-sm bg_contrast h_xl flex_cent">
          <img src="@/assets/logo.png" alt="">
        </div>
        <!-- Input Type Text -->
        <div class="col-sm p_sm bg_contrast h_xl flex_cent">
          <!-- SearchBar -->
          <input v-model="searchFilm" @formControl="searchMethod" class="h_sm" type="text" placeholder="Cerca un Film">
          <button class="h_sm" type="submit">Cerca</button>  
        </div>
      </div>
    </div>
    <!-- Second Container  -->
    <div class="container mar_top bg_try h_px_md mar_auto">
      <!-- Seconda Row -->
      <div class="row h_xl bg_contrast">
        <!-- Lista non ordinata per verificare il funzionamento della chiamata API -->
        <ul style="color: red" v-for="(film, index) in movies" :key="index">
          <li>{{film.original_title}}</li> 
          <li>{{film.genre}}</li> 
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
      /* Ora è un film singolo */
      API_URL: "https://api.themoviedb.org/3/search/movie?api_key=98d2bdd48bfc7c3ba0b288ac94e06943&language=en-US&query=Blade%20Runner%202049&page=1&include_adult=false",
      movies: null, // Array inizialmente vuoto
      /* loading: true : per ora non so se serve */ 
      error: null,
      searchFilm: '' // Metodo per ricercare il film => questo nel v-model
    };
  },
  methods: {
    /* Method di richiamo API */
    callApi() {
      axios
      .get(this.API_URL) // Richiamo Api tramite This
      .then((response) => {
        this.movies = response.data // array(object) di film salvata in response.data
        /* this.loading = true : Questo valuta se serve poi */
      }).catch((error) => {
        console.error();
        error;
        this.error = `Sorry There is a problem! ${error}`;
      }) 
    },
    /* Method per il search dell'input */
    searchMethod(){
      console.log('Searching...');
      console.log(this.searchFilm);
      state.searchFilm = this.searchFilm; 
      console.log(state.searchFilm); // Console log di verifica
    }
  },
  computed: {
    /* Filtro necessario per la ricerca dei film */
    filtroFilms() {
      return this.movies.filter(movie => {
          return movie.name.toLowerCase().includes(state.searchFilm.toLowerCase())
        })
    }
  },
  mounted() {
    this.callApi() // richiamo la mia function nel mounted
  }
}
</script>

<style lang="scss" scoped>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* Proprietà del id APP */
  width: 100vw; /* Altezza e larghezza */
  height: 100vh;
  background-color: burlywood;
  margin: 0 auto; /* Centraggio Perfetto */
  overflow-x: hidden; /* Nascosto Overflow */
  overflow-y: hidden;
}

/*#region Regole Principali di Col e Row  */

/* Container Principale */
.container {
  width: 1200px;
  /* Row - Regole*/
  .row {
    width: 100%;
  }
}

/* Prime Colonne iniziali, andranno poi rimosse */
.col-md {
  width: calc(100% / 12) * 6; // Col MD è da 6
}
.col-sm {
  width: calc(100% / 12) * 3; // Col SM è da 6
}
.col-lg {
  width: calc(100% / 12) * 9; // Col LG è da 9
}

/*#endregion */

/* Colori di Prova, poi andranno rimossi */
.bg_try {
  background-color: crimson;
}
.bg_contrast {
  background-color: rgb(226, 241, 3);
}

/* Larghezze di prova */
.w_sm {
  width: 25%;
}
.w_md {
  width: 50%;
}
.w_lg {
  width: 75%;
}
.w_xl {
  width: 100%;
}

/* Centraggio in mezzo alla pagina */
.mar_auto {
  margin: 0 auto;
}

.mar_top {
  margin-top: 50px;
}


/* Altezze di prova */
.h_sm {
  height: 25%;
}
.h_md {
  height: 50%;
}
.h_lg {
  height: 75%;
}
.h_xl {
  height: 100%;
}

/* Altezze Fisse in PX (da rimuovere) */
.h_px_sm {
  height: 100px;
}
.h_px_md {
  height: 250px;
}
.h_px_lg {
  height: 250px;
}

/* Regole di Dispaly Flex */
.flex_cent {
  display: flex;
  justify-content: center;
  align-items: center;
}
.flex_between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}


</style>
