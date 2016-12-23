import Ember from 'ember';
import AuthenticatedRouteMixin from '../../mixins/authenticated-route-mixin';

const {
  Route,
} = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  authenticationRoute: 'login',

  model() {
    return this.store.findAll('user', { include: 'directory' });
  },

  afterModel(model) {
    Ember.assert('There should be only one user from API call', model.content.length === 1);

    // get the id without another api call
    const directoryId = model.get('firstObject').belongsTo('directory').id();
    Ember.assert('directory id should be available from our api call in model()', directoryId != null);

    // make the query and show the directory
    const directory = this.store.findRecord('directory', directoryId);
    this.transitionTo('home.directory', directory);
  }
});