import Vue from 'vue';
import Component from 'vue-class-component';
import { namespace } from 'vuex-class';

const PostsModule = namespace('posts');

@Component
export default class PostList extends Vue {

  @PostsModule.Getter('all') posts;
  @PostsModule.Action('fetchAllPosts') fetchPosts;

  animation: string = 'flipInX';
  animationDelay: number = 25; // in ms
  postsFilter: string = '';

  /**
   * Computed props
   */
  get filteredPosts() {
    return this.posts.filter((post) => post.title &&
      post.title.toLowerCase().indexOf(this.postsFilter.toLowerCase()) !== -1);
  }

  /**
   * Lifecycle hooks
   */
  mounted() {
    if (!this.posts.length) {
      this.fetchPosts();
    }
  }

  /**
   * Methods for transitions
   */
  handleBeforeEnter(el) {
    el.style.opacity = 0;
    el.classList.add('animated');
  }

  handleEnter(el) {
    const delay = el.dataset.index * this.animationDelay;
    setTimeout(() => {
      el.style.opacity = 1;
      el.classList.add(this.animation);
    }, delay);
  }

  render() {
    return (
      <div>
        <h1 class="mb-4"><i class="fa fa-file-text-o"></i> Posts</h1>
        <div class="form-group">
          <input class="form-control" placeholder="Filter posts..." v-model={this.postsFilter}/>
        </div>
        <transition-group
          tag="div"
          class="list-group"
          onBeforeEnter={this.handleBeforeEnter}
          onEnter={this.handleEnter}>

          {this.filteredPosts.map((post, index) => (
            <router-link key={post.id}
                         class="list-group-item"
                         data-index={index}
                         to={`post/${post.id}`}>
              {index + 1} {post.title}
            </router-link>
          ))}

        </transition-group>
      </div>
    );
  }
}
