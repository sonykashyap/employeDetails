import Vue from 'vue'
import App from './App.vue'
// import VueRouter from 'vue-router';
// import { routes } from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';

import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import './assets/css/style.css';

// Vue.use(VueRouter);

// const router = new VueRouter({
// routes,
// // mode: 'history'
// });

// Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('v-select', vSelect);


new Vue({
  el: '#app',
  // router,
  render: h => h(App)
})
