import { postsResource } from '../../util/resources';

const state = {
  current: null,
  all: [],
};

const getters = {
  all: ({ all }) => all,
  current: ({ current }) => current,
};

const mutations = {
  setPosts(state, posts) {
    state.all = posts;
  },
  setPost(state, post) {
    state.current = post;
  },
};

const actions = {
  async fetchAllPosts({ commit, dispatch, rootState }) {
    const { data } = await postsResource.get('/');
    commit('setPosts', data);
  },

  async fetchSinglePost({ commit, dispatch, rootState }, id) {
    const { data } = await postsResource.get(id);
    commit('setPost', data);
  },

  async createPost({ commit, dispatch, rootState }, postData) {
    const { data } = await postsResource.post('/', postData);
    commit('setPost', data);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
