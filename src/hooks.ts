import Component from 'vue-class-component';

// Enable some hooks to Vue-extended Classes
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
]);
