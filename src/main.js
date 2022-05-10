import Vue from 'vue'
import App from './App.vue'
/* Import per le flag icon */
import FlagIcon from 'vue-flag-icon'
Vue.use(FlagIcon);
/* Bootstrap */
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
const bootstrap = require('bootstrap')
Vue.use(bootstrap)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
