import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {

  actions: {
    login() {
      const lockOptions = {
        authParams: { scope: 'openid email name' }
      };
      this.get('session').authenticate('simple-auth-authenticator:lock', lockOptions);
    },

    logout() {
      this.get('session').invalidate();
    }
  }
});
