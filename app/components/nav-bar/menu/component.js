import Ember from 'ember';

const {
  Component,
  inject: {
    service,
  },
} = Ember;

export default Component.extend({
  onLogin: null,
  onLogout: null,

  tagName: '',

  session: service(),
  profile: service(),
  
  actions: {
    login() {
      this.attrs.onLogin();
    },
    logout() {
      this.attrs.onLogout();
    }
  },
});
