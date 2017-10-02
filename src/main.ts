import './hooks';
import './config/http';
import './style.scss';

import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import store from './store/store';
import App from './app';
import routes from './routes';

export const router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'active',
});

// we don't want any nagging about using Vue in development environment...
Vue.config.productionTip = false;

// Sync router with store
const unsync = sync(store, router);

// tslint:disable-next-line
new Vue({
  components: { App },
  el: '#app',
  router,
  store,
  template: '<App />',
});
