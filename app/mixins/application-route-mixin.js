import Ember from 'ember';
// Note that this is from the auth0 package, not simple-auth
import ApplicationRouteMixin from 'ember-simple-auth-auth0/mixins/application-route-mixin';

const {
  Mixin
} = Ember;

export default Mixin.create(ApplicationRouteMixin, {
});