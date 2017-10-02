import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import { postsResource } from '../../util/resources';
import { PostsState } from './types';
import { RootState } from '../../store/store';

type PostsGetter = GetterTree<PostsState, RootState>;

// Initial state for post
const state: PostsState = {
  current: null,
  all: [],
};

const getters: PostsGetter = {
  all: ({ all }, getters, rootState) => all,
  current: ({ current }, getters, rootState) => current,
};

const mutations: MutationTree<PostsState> = {
  setPosts(state, posts) {
    state.all = posts;
  },
  setPost(state, post) {
    state.current = post;
  },
};

const actions: ActionTree<PostsState, RootState> = {
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

  async updatePost({ commit, dispatch, rootState }, postData) {
    const { id } = postData;
    const { data } = await postsResource.put(`/${id}`, postData);
    commit('setPost', data);
  },
};

export const posts: Module<PostsState, RootState> = {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
