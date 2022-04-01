<template>
  <div id="app">
    <app-sidebar></app-sidebar>
    <app-header></app-header>
    <div class="content-wrapper">
      <app-dashboard></app-dashboard>
      <!-- <router-view></router-view> -->
    </div>

  </div>
</template>

<script>
import Dashboard from './components/dashboard.vue';
import Sidebar from './components/sidebar.vue';
import Header from './components/header.vue';

export default {
  name: 'app',
  components:{
    appDashboard: Dashboard,
    appSidebar: Sidebar,
    appHeader: Header
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>

</style>
