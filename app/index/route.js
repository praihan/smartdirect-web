import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),

  beforeModel() {
    if (this.get('session.isAuthenticated')) {
      // if we're loading into this route and we're already authenticated,
      // then just redirect to the home route
      this.transitionTo('home');
    }
  },

  _transitionToHomeOnAuthenticated: Ember.observer('session.isAuthenticated', function() {
    if (this.get('session.isAuthenticated')) {
      // if we sign in while we're in this route, then transition out afterwards
      this.transitionTo('home');
    }
  }),
});
