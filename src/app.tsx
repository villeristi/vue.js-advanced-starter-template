import Vue from 'vue';
import Component from 'vue-class-component';
import Loader from './components/Loader/loader';
import Navigation from './components/Navigation/navigation';

@Component
export default class App extends Vue {
  render() {
    return (
      <div>
        {/* Todo: will be fixed on Vuex */}
        {false && <Loader />}
        <Navigation />
        <div class="container mb-4">
          <router-view />
        </div>
      </div>
    );
  }
}
