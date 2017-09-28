import Vue from 'vue';
import VueRouter from 'vue-router';

import Navigation from './components/Navigation/navigation';
import Loader from './components/Loader/loader';

Vue.use(VueRouter);

import './config/http';
import routes from './routes';
import './style.scss';

export const router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'active'
});

const app: Vue = new Vue({
  router,
  components: {
    Navigation,
    Loader
  },
});

app.$mount('#app');
