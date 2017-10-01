import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import posts from '../components/Posts/store';

import { isProduction } from '../util/helpers';

Vue.use(Vuex);

const state = {
  isFetching: false,
};

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  modules: {
    posts,
  },
  strict: !isProduction,
});
