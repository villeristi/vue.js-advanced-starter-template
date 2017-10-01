import Vue from 'vue';
import Component from 'vue-class-component';
import { postsResource } from '../../util/resources';
import { Action, Getter, Mutation, namespace } from 'vuex-class';
import { Post } from './types';

const PostsGetter = namespace('posts', Getter);
const PostsAction = namespace('posts', Action);
const PostsMutation = namespace('posts', Mutation);

@Component
export default class Posts extends Vue {

  @PostsGetter('current') post;
  @PostsAction('fetchSinglePost') fetchPost;
  @PostsMutation('setPost') setPost;

  /**
   * Lifecycle hooks
   */
  created() {
    const { id } = this.$route.params;
    if (!this.post || (this.post.id !== id)) {
      this.fetchPost(id);
    }
  }

  /**
   * Router hooks
   * @param to
   * @param from
   * @param next
   */
  beforeRouteLeave(to, from, next) {
    this.setPost(null);
    return next();
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
