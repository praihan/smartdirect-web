import DS from 'ember-data';

const {
  JSONAPISerializer
} = DS;

export default JSONAPISerializer.extend({
  serializeAttribute(snapshot, json, key, attribute) {
    // do not serialize the attribute!
    if (attribute['options'] && attribute['options']['readOnly']) {
      return;
    }
    return this._super(...arguments);
  },
  serializeHasMany(snapshot, json, relationship) {
    // do not serialize the relationship!
    if (relationship['options'] && relationship['options']['readOnly']) {
      return;
    }
    return this._super(...arguments);
  },
  serializeBelongsTo(snapshot, json, relationship) {
    // do not serialize the relationship!
    if (relationship['options'] && relationship['options']['readOnly']) {
      return;
    }
    return this._super(...arguments);
  },
});
