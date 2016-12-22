import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const {
  Mixin
} = Ember;

export default Mixin.create(AuthenticatedRouteMixin, {
});