import Ember from 'ember';
import UnauthenticatedRouteMixin from '../mixins/unauthenticated-route-mixin';

const {
  Route,
  run: {
    scheduleOnce,
  }
} = Ember;

export default Route.extend(UnauthenticatedRouteMixin, {
  routeIfAlreadyAuthenticated: 'index',
  actions: {
    didTransition() {
      scheduleOnce('afterRender', this, function() {
        // after we render, we need to also render the inline login thing
        this.send('loginWithOptions', { container: 'login-container' });
      })
    }
  }
});
