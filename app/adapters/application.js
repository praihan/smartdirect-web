import DS from 'ember-data';
import DataAdapterMixin from '../mixins/data-adapter-mixin';

const {
  JSONAPIAdapter,
} = DS;

export default JSONAPIAdapter.extend(DataAdapterMixin, {
  namespace: 'api/v1',
  authorizer: 'authorizer:jwt',
});
