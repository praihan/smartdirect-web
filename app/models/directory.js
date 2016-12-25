import Ember from 'ember';
import DS from 'ember-data';

const {
  computed,
} = Ember;

const {
  Model,
  PromiseObject,
  attr,
  belongsTo,
  hasMany,
} = DS;

export default Model.extend({
  user: belongsTo('user'),
  name: attr('string'),

  parent: belongsTo('directory', { inverse: 'children', async: true, }),
  children: hasMany('directory', { inverse: 'parent', async: true, }),

  createdAt: attr('date'),
  updatedAt: attr('date'),

  ancestors: computed('', function() {
    const promise = this.get('parent').then(parent => {
      // base case: root Directory
      if (parent == null) {
        return [];
      }
      // recursively get the parent's ancestors and tack
      // the parent on
      return parent.get('ancestors').then(parentsAncestors => {
        return [
          ...parentsAncestors,
          parent
        ];
      });
    });

    // return a DS promise
    return PromiseObject.create({
      promise,
    });
  }),
});
