import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Mixin.create(ApplicationRouteMixin, {
  routeAfterAuthentication: 'index',

  sessionAuthenticated() {
    const attemptedTransition = this.get('session.attemptedTransition');
    const cookies = Ember.getOwner(this).lookup('service:cookies');
    const redirectTarget = cookies.read('ember_simple_auth-redirectTarget');

    if (attemptedTransition) {
      attemptedTransition.retry();
      this.set('session.attemptedTransition', null);
    } else if (redirectTarget) {
      this.transitionTo(redirectTarget);
      cookies.clear('ember_simple_auth-redirectTarget');
    } else {
      this.transitionTo(this.get('routeAfterAuthentication'));
    }
  }
});