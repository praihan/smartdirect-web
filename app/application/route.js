import Ember from 'ember';
import ApplicationRouteMixin from '../mixins/application-route-mixin';

const {
  Route,
} = Ember;

export default Route.extend(ApplicationRouteMixin, {
  routeAfterAuthentication: 'home',
});
