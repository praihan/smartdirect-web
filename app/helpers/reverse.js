import Ember from 'ember';

const {
  assert,
  isArray,
} = Ember;

export function reverse([array]) {
  assert('reverse helper should be given an array', isArray(array));
  return array.slice().reverseObjects();
}

export default Ember.Helper.helper(reverse);
