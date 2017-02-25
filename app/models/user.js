import DS from 'ember-data';

const {
  Model,
  attr,
  belongsTo,
} = DS;

export default Model.extend({
  name: attr('string', { readOnly: true }),
  email: attr('string', { readOnly: true }),

  oauthProvider: attr('string', { readOnly: true }),
  oauthId: attr('string', { readOnly: true }),

  friendlyName: attr('string'),

  directory: belongsTo('directory', { readOnly: true, async: true }),
});
