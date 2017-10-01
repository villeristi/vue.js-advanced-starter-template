import Vue from 'vue';
import Component from 'vue-class-component';
import { postsResource } from '../../util/resources';
import { Post } from './types';

@Component
export default class Posts extends Vue {
  post: Post = null;

  created() {
    this.fetchPost();
  }

  async fetchPost() {
    const { id } = this.$route.params;
    const { data } = await postsResource.get(`${id}`);
    this.post = data;
  }

  render() {

    if (!this.post) {
      return;
    }

    return (
      <transition
        name="post-appear-animation"
        enter-active-class="animated flipInX">
        <div>
          <div class="card card-block mb-4">
            <h1 class="card-title">{this.post.title}</h1>
            <p class="card-text">{this.post.body}</p>
          </div>
          <router-link to="/posts">
            <i class="fa fa-chevron-left"></i> Back to posts
          </router-link>
          <router-link class="btn btn-outline-info float-right" to={`${this.post.id}/edit`}>
            <i class="fa fa-pencil"></i> Edit
          </router-link>
        </div>
      </transition>
    );
  }
}
