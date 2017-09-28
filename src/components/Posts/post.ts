import Vue from 'vue';
import Component from 'vue-class-component';

import {postsResource} from '../../util/resources';
import template from './post.html';

@Component
export default class Posts extends Vue {
  template: string = template;
  post: object;

  created() {
    this.fetchPost();
  };

  fetchPost() {
    const id = this.$route.params.id;

    return postsResource.get(`${id}`)
      .then((response) => {
        this.post = response.data;
      })
      .catch((errorResponse) => {
        // Handle error...
        console.log('API responded with:', errorResponse);
      });
  };
};
