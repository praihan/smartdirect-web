import Ember from 'ember';

const {
  Service,
  inject: {
    service,
  },
  computed: {
    alias,
  },
} = Ember;

export default Service.extend({
  session: service('session'),

  givenName: alias('session.data.authenticated.profile.given_name'),
  name: alias('session.data.authenticated.profile.name'),
  email: alias('session.data.authenticated.profile.email'),
});
