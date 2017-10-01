import './hooks';
import './config/http';
import './style.scss';

import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

// we don't want any nagging about using Vue in development environment...
Vue.config.productionTip = false;

import App from './app';
import routes from './routes';

export const router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'active',
});

// tslint:disable-next-line
new Vue({
  el: '#app',
  router,
  template: '<App />',
  components: { App },
});
