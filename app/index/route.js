import Ember from 'ember';
import UnauthenticatedRouteMixin from '../mixins/unauthenticated-route-mixin';

const {
  Route,
} = Ember;

export default Route.extend(UnauthenticatedRouteMixin, {
  routeIfAlreadyAuthenticated: 'home',
});
