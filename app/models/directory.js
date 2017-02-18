import DS from 'ember-data';

const {
  Model,
  attr,
  belongsTo,
  hasMany,
} = DS;

export default Model.extend({
  user: belongsTo('user', { readOnly: true }),
  name: attr('string'),

  parent: belongsTo('directory', { inverse: 'children', async: true, }),
  children: hasMany('directory', { inverse: 'parent', async: true, readOnly: true, }),

  createdAt: attr('date', { readOnly: true }),
  updatedAt: attr('date', { readOnly: true }),

  ancestors: hasMany('directory', { inverse: null, async: true, readOnly: true, }),
});
