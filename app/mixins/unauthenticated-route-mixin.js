import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

const {
  Mixin
} = Ember;

export default Mixin.create(UnauthenticatedRouteMixin, {
});