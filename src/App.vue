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
          <!-- SearchBar -->
          <input v-model="searchFilm" @formControl="searchMethod" class="h_sm" type="text" placeholder="Cerca un Film">
          <button @click.prevent="searchFilm" class="h_sm" type="submit">Cerca</button>  
        </div>
      </div>
    </div>
    <!-- Second Container  -->
    <div class="container mar_top bg_try h_px_lg mar_auto">
      <!-- Seconda Row -->
      <div class="row h_xl bg_contrast flex_cent">
        <!-- verificare il funzionamento della chiamata API -->
        <!-- :movie="movie" v-for="(movie, index) in filtroFilms" :key="index" -->
        <div v-for="movie in movies" :key="movie.id" class="card flex_col h_lg col-sm bg_try">
          <!-- Immagine della card - da risolvere, ora gli creo solo uno spazio bianco -->
          <div class="col-xl w_xl h_lg bg_crimson">
          

          </div>
          <!-- Info della card -->
          <div class="col-xl info w_xl h_md bg_crimson">
            <!-- Titolo Della film card (sarà un H) -->
            <p class="title">{{movie.title}}</p>  
            <!-- Titolo originale (sara uno span) -->
            <p class="title">{{movie.original_title}}</p>
            <!-- Voto -->  
            <p class="vote">{{movie.vote_average}}</p>
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
    callApi(){
      axios
      .get(this.API_URL) // Richiamo Api tramite This
      .then((response) => {
        this.movies = response.data.results // array(object) di film salvata in response.data
        /* Aggiornato con results poicè era annidato li dentro */
        /* this.loading = true : Questo valuta se serve poi */
      }).catch((error) => {
        console.error();
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
  /* Proprietà del id APP */
  width: 100vw; /* Altezza e larghezza */
  height: 100vh;
  margin: 0 auto; /* Centraggio Perfetto */
  overflow-x: hidden; /* Nascosto Overflow X */
  overflow-y: hidden; /* Nascosto Overflow Y */
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

/* Bordo per rendere visibile, poi da rimuovere */
.col-sm,
.col-md,
.col-lg {
  border: 2px solid black;
}


/*#endregion */

/* Colori di Prova, poi andranno rimossi */
.bg_try {
  background-color: rgb(9, 72, 245);
}
.bg_contrast {
  background-color: rgb(226, 241, 3);
}

.bg_crimson {
  background-color: crimson;
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
  border: 2px solid black;
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
  height: 550px;
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

.flex_col {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}


/* Riquadro immagine in app */
.square {
  width: 90%;
  height: 200px;
  background-color: white;
}






</style>
