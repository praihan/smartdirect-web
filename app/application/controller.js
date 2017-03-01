import Ember from 'ember';

const {
  Controller,
  assign, copy,
  inject: {
    service,
  },
} = Ember;

const DEFAULT_LOCK_OPTS = {
  auth: {
    redirect: false,
    params: {
      scope: 'openid email name'
    },
  },
};

export default Controller.extend({
  session: service(),
  profile: service(),

  actions: {
    login() {
      this.send('loginWithOptions', undefined);
    },
    loginWithOptions(extraOpts) {
      const lockOptions = assign(
        copy(DEFAULT_LOCK_OPTS, true), // make a deep copy of defaults
        extraOpts || {}
      );
      this.get('session').authenticate('authenticator:auth0-lock', lockOptions);
    },

    logout() {
      this.get('session').invalidate();
    }
  }
});
