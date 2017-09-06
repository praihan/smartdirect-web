import Ember from 'ember';
import ApplicationRouteMixin from '../mixins/application-route-mixin';

const {
  Route,
  assign, copy,
  inject: {
    service,
  },
} = Ember;

const DEFAULT_LOCK_OPTS = {
  autoclose: true,
  auth: {
    redirect: false,
    params: {
      scope: 'openid email name',
    },
  },
};

export default Route.extend(ApplicationRouteMixin, {
  session: service(),

  routeAfterAuthentication: 'home',

  actions: {
    login(extraOpts) {
      const lockOptions = assign(
        copy(DEFAULT_LOCK_OPTS, true), // make a deep copy of defaults
        extraOpts
      );
      this.get('session').authenticate('authenticator:auth0-lock', lockOptions);
    },

    logout() {
      this.get('session').invalidate();
    }
  }
});
