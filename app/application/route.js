import Ember from 'ember';
import ApplicationRouteMixin from '../mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  routeAfterAuthentication: 'home',

  actions: {
    login(extraOpts) {
      const lockOptions = Ember.merge(
        {
          auth: {
            redirect: false,
            params: {
              scope: 'openid email name'
            }
          }
        },
        extraOpts
      );
      this.get('session').authenticate('authenticator:auth0-lock', lockOptions);
    },

    logout() {
      this.get('session').invalidate();
    }
  }
});
