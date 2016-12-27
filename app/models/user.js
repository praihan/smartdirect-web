import DS from 'ember-data';

const {
  Model,
  attr,
  belongsTo,
} = DS;

export default Model.extend({
  name: attr('string'),
  email: attr('string'),

  oauthProvider: attr('string'),
  oauthId: attr('string'),

  directory: belongsTo('directory', { async: true }),
});
