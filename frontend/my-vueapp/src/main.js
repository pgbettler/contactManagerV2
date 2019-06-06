import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'

import VueRouter from 'vue-router';
Vue.use(VueRouter);

Vue.config.productionTip = false;

import HomeComponent from './components/HomeComponent.vue';
import RegisterComponent from './components/RegisterComponent.vue';
import CreateContactComponent from './components/CreateContactComponent.vue';
import EditContactComponent from './components/EditContactComponent.vue';
import DisplayContactComponent from './components/DisplayContactComponent.vue';

const routes = [
  {
      name: 'home',
      path: '/',
      component: HomeComponent
  },
  {
      name: 'register',
      path: '/register',
      component: RegisterComponent
  },
  {
      name: 'create',
      path: '/create',
      component: CreateContactComponent
  },
  {
      name: 'edit',
      path: '/edit',
      component: EditContactComponent
  },
  {
    name: 'view',
    path: '/view',
    component: DisplayContactComponent
  }
];

const router = new VueRouter({ mode: 'history', routes: routes});

new Vue(Vue.util.extend({ router }, App)).$mount('#app');