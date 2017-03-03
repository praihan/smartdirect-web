import Ember from 'ember';
import EventForwardingComponentMixin from '../../../../mixins/event-forwarding-component';

const {
  String: {
    w,
  },
  Component,
} = Ember;

export default Component.extend(EventForwardingComponentMixin, {
  tagName: 'tr',
  classNames: w('table-entry'),
});
