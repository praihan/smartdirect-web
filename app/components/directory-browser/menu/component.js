import Ember from 'ember';

const {
  String: {
    w,
  },
  Component,
} = Ember;

export default Component.extend({
  classNames: w('ui top attached mini menu'),
});
