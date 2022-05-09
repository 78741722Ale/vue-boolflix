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
          <input class="h_sm" type="text" placeholder="Cerca un Film">
          <button class="h_sm" type="submit">Cerca</button>  
        </div>
      </div>
    </div>
    <!-- Second Container -->
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

/* Centraggio in mezzo alla pagina */
.mar_auto {
  margin: 0 auto;
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
