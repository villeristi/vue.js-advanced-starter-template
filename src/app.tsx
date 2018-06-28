import Vue from 'vue';
import Component from 'vue-class-component';
import Loader from './components/Loader/loader';
import Navigation from './components/Navigation/navigation';
import { Getter } from 'vuex-class';

@Component
export default class App extends Vue {
  @Getter('isFetching') isFetching;

  render() {
    return (
      <div>
        {this.isFetching && <Loader />}
        <Navigation />
        <div class="container mb-4">
          <router-view />
        </div>
      </div>
    );
  }
}
