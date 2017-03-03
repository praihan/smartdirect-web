import Ember from 'ember';
import EventForwardingComponentMixin from '../../../../mixins/event-forwarding-component';

const {
  String: {
    w,
  },
  Component,
} = Ember;

export default Component.extend(EventForwardingComponentMixin, {
  classNames: w('ui item'),
  attributeBindings: w('href'),
});
