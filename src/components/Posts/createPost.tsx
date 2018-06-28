import Vue from 'vue';
import Component from 'vue-class-component';
import VeeValidate, { ErrorBag, FieldBag } from 'vee-validate';
import { Post, Message } from './types';

Vue.use(VeeValidate);

import { postsResource } from '../../util/resources';

@Component
export default class EditPost extends Vue {

  post: Post = { title: '', body: '', id: null };
  message: Message = null;
  errors: ErrorBag;
  fields: FieldBag;

  get isDirty() {
    return Object.keys(this.fields).some((key) => this.fields[key].dirty);
  }

  displayMessage(message, timeout = 2000) {
    this.message = message;
    setTimeout(() => {
      this.message = null;
    }, timeout);
  }

  async handleSubmit(e) {
    e.preventDefault();
    const isValid = await this.$validator.validateAll();

    if (isValid) {
      return this.savePost();
    }

    return this;
  }

  async savePost() {
    const { data } = await postsResource.post('/', this.post);
    this.post = data;

    this.$validator.reset();

    return this.displayMessage({
      type: 'success',
      text: 'Post created!',
    });
  }

  render() {

    const {
      errors,
      message,
      handleSubmit,
      post,
    } = this;

    return (
      <transition
        name="post-appear-animation"
        enter-active-class="animated flipInX">
        <div>

          <header>
            <h1 class="card-title">{post.title}</h1>
            <hr/>
          </header>

          <form name="editPostForm" class="card mb-4" onSubmit={handleSubmit}>
            <div class="card-body">
              {message &&
              <transition
                name="post-message-animation"
                enter-active-class="animated flipInX"
                leave-active-class="animated flipOutX">
                <div>
                  <div
                    class={{
                      'alert': true,
                      'alert-success': message.type === 'success',
                    }}
                    role="alert">
                    {message.text}
                  </div>
                </div>
              </transition>
              }

              {errors.any() && errors.items.map((error) => {
                return (
                  <transition
                    name="error-animation"
                    enter-active-class="animated flipInX"
                    leave-active-class="animated flipOutX">
                    <div class="alert alert-danger" role="alert">
                      <strong>Doh!</strong> {error.msg}
                    </div>
                  </transition>
                );
              })}

              <div class="form-group row">
                <label for="title" class="col-2 col-form-label">Title</label>
                <div class="col-10">
                  <input id="title"
                         name="title"
                         type="text"
                         class="form-control"
                         data-vv-as="Post title"
                         v-model={post.title}
                         v-validate="required"/>
                </div>
              </div>

              <div class="form-group row">
                <label for="body" class="col-2 col-form-label">Body</label>
                <div class="col-10">
                <textarea id="body"
                          name="body"
                          rows="5"
                          class="form-control"
                          data-vv-as="Post body"
                          v-model={post.body}
                          v-validate="required"/>
                </div>
              </div>

              <div class="form-group row">
                <div class="col-2"/>
                <div class="col-10">
                  <button
                    type="submit"
                    class="btn btn-primary"
                    disabled={errors.any() || !this.isDirty}
                  >
                    <i class="fa fa-floppy-o"/> Save
                  </button>
                </div>
              </div>

            </div>
          </form>

          <hr/>
          <router-link to="/posts">
            <i class="fa fa-chevron-left"/> Back to posts
          </router-link>
        </div>
      </transition>
    );
  }
}
