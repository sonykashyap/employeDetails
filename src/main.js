import Vue from 'vue'
import App from './App.vue'
import { VuejsDatatableFactory } from 'vuejs-datatable';

// import VueRouter from 'vue-router';
// import { routes } from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'vuejs-datatable/dist/themes/bootstrap-3.esm';

import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import './assets/css/style.css';

// Vue.use(VueRouter);
Vue.use( VuejsDatatableFactory );


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
