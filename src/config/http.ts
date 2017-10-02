import store from '../store/store';
import { postsResource } from '../util/resources';

// Request interceptor
postsResource.interceptors.request.use((config) => {
  store.commit('toggleFetching', true);
  return config;
}, (error) => {
  console.log('RequestError: ', error);
  // Do something with request error
  return Promise.reject(error);
});

// Response interceptor
postsResource.interceptors.response.use((response) => {
  store.commit('toggleFetching', false);
  return response;
}, (error) => {
  console.log('ResponseError: ', error);
  // Do something with response error
  return Promise.reject(error);
});
