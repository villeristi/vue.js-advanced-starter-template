import Vue from 'vue';
import Component from 'vue-class-component';
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);

import {postsResource} from '../../util/resources';
import template from './editPost.html';

@Component
export default class EditPost extends Vue {

  template: string = template;
  post: object;
  message: object;
  id: number;
  fields: object;

  get isDirty() {
    return Object.keys(this.fields).some(key => this.fields[key].dirty);
  };

  created() {
    this.fetchPost();
  };

  async handleSubmit(): Promise<any> {
    this.$validator.validateAll().then((success) => {
      if (success) {
        return this.savePost();
      }
    });
  };

  showMessage(message = {}, timeout = 2000) {
    this.message = message;
    setTimeout(() => {
      this.message = null;
    }, timeout);
  };

  savePost() {
    return postsResource.put(`${this.id}`, this.post)
      .then((response) => {
        this.post = response.data;

        this.showMessage({
          type: 'success',
          text: 'Post updated!'
        });

        // TODO: We need to reset the form after success....
        // this.fields.reset();
      })
      .catch((errorResponse) => {
        // Handle error...
        this.showMessage({
          type: 'danger',
          text: errorResponse
        });
        console.log('API responded with:', errorResponse);
      });
  };

  fetchPost() {
    return postsResource.get(`${this.id}`)
      .then((response) => {
        this.post = response.data;
      })
      .catch((errorResponse) => {
        // Handle error...
        console.log('API responded with:', errorResponse);
      });
  };
};
