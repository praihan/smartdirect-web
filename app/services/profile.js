import Ember from 'ember';

export default Ember.Service.extend({
  session: Ember.inject.service('session'),

  givenName: Ember.computed.alias('session.data.authenticated.profile.given_name'),
  name: Ember.computed.alias('session.data.authenticated.profile.name'),
  email: Ember.computed.alias('session.data.authenticated.profile.email'),
});
