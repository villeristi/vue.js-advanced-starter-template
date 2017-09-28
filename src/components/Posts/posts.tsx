import Vue from 'vue';
// import Component from 'vue-class-component';
import {Component} from 'vue-property-decorator'


import {postsResource} from '../../util/resources';
import template from './posts.html';

const animation = 'flipInX';
const animationDelay = 25; // in ms

type Post = {
  title: string,
  id: number,
};

@Component
export default class Posts extends Vue {

  template: string = template;
  postsFilter: string = '';
  posts: Array<Post> = []; // = [{title: 'eka', id: 1}];

  get filteredPosts() {
    return this.posts.filter((post) => post.title.toLowerCase().indexOf(this.postsFilter.toLowerCase()) !== -1);
  };

  fetchPosts() {
    return postsResource.get('/')
      .then((response) => {
        this.posts = response.data;
      })
      .catch((errorResponse) => {
        // Handle error...
        console.log('API responded with:', errorResponse);
      });
  };

  mounted() {
    console.log('mounted');
    this.fetchPosts();
  }

  testi (){
    alert();
  }

  render(h) {
    return (
      <div>
        <h1 class="mb-4"><i class="fa fa-file-text-o"></i> Posts</h1>
        <div class="form-group">
          <input class="form-control" placeholder="Filter posts..." v-model="postsFilter" />
        </div>
        <div class="list-group">
          {this.posts.map((post, index) => (<router-link class="list-group-item" to={`post/${index}`}>{ index+1 } {post.title}</router-link>))}
        </div>
      </div>
    );
  };
};
