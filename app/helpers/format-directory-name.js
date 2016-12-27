import Ember from 'ember';

export function formatDirectoryName([name]) {
  Ember.assert('name must be a string', typeof name === 'string');
  if (name == '') {
    // this is the root Directory
    return 'Home';
  }
  return name;
}

export default Ember.Helper.helper(formatDirectoryName);
