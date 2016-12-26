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
    this._super(...arguments);
  },
});
