<template>
  <div id="app">
    <!-- First Container -->
    <div class="container">
      <!-- First Row -->
      <div class="row">


      </div>
    </div>
    
    
    <!-- SearchBar -->
    <input type="text" placeholder="Cerca un Film">
    <button type="submit">Premi</button>


  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
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

/* Regole di Dispaly Flex */
.flex_cent {
  display: flex;
  justify-content: center;
  align-items: center;
}






</style>
