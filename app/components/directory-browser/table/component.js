import Ember from 'ember';

const {
  String: {
    w,
  },
  Component,
} = Ember;

export default Component.extend({
  tagName: 'table',
  classNames: w('ui bottom attached table'),
});
