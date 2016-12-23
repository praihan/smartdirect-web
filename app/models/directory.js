import DS from 'ember-data';

const {
  Model,
  attr,
  belongsTo,
  hasMany,
} = DS;

export default Model.extend({
  user: belongsTo('user'),
  name: attr('string'),

  parent: belongsTo('directory', { inverse: 'children' }),
  children: hasMany('directory', { inverse: 'parent' }),

  createdAt: attr('date'),
  updatedAt: attr('date'),
});
