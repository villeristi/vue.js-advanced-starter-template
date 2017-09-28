import Vue from 'vue';
import Component from 'vue-class-component';
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);

import {postsResource} from '../../util/resources';
import template from './editPost.html';

@Component
export default class CreatePost extends Vue {

  template: string = template;
  post: object;
  message: object;
  fields: Array<object>;

  get isDirty() {
    return Object.keys(this.fields).some(key => this.fields[key].dirty);
  }

  async handleSubmit(): Promise<any> {
    this.$validator.validateAll().then((success) => {
      if (success) {
        return this.savePost();
      }
    });
  };

  showMessage(message: object = {}, timeout: number = 2000): void {
    this.message = message;
    setTimeout(() => {
      this.message = null;
    }, timeout);
  };

  savePost() {
    return postsResource.post('/', this.post)
      .then((response) => {
        this.post = response.data;

        this.showMessage({
          type: 'success',
          text: 'Post created!'
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
  }
};
