import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Mixin.create(UnauthenticatedRouteMixin, {
  routeIfAlreadyAuthenticated: 'index',

  beforeModel() {
    // There seems to be a bug in ember-simple-auth that calls transition.abort()
    if (this.get('session').get('isAuthenticated')) {
      const routeIfAlreadyAuthenticated = this.get('routeIfAlreadyAuthenticated');
      Ember.assert('The route configured as Configuration.routeIfAlreadyAuthenticated cannot implement the UnauthenticatedRouteMixin mixin as that leads to an infinite transitioning loop!', this.get('routeName') !== routeIfAlreadyAuthenticated);

      return this.transitionTo(routeIfAlreadyAuthenticated);
    } else {
      return this._super(...arguments);
    }
  }
});