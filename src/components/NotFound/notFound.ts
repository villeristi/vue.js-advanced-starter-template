import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class NotFound extends Vue {
  template: string = `
    <div>
        <h1 class="mb-2">Not found...</h1>
        <p>Sorry <i class="fa fa-frown-o"></i></p>
    </div>
  `;
}
