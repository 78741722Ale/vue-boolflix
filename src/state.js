import Vue from 'vue';

// state necessario per cercare il film
const state = Vue.observable({
    searchFilm: '' // state per il film, trasformato in array
})

export default state