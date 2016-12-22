import Ember from 'ember';
import UnauthenticatedRouteMixin from '../mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  routeIfAlreadyAuthenticated: 'index',
  actions: {
    didTransition() {
      Ember.run.scheduleOnce('afterRender', this, function() {
        this.send('login', { container: 'login-container' });
      })
    }
  }
});
