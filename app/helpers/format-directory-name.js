import Ember from 'ember';

// TODO: Use i18n when possible.
// see https://github.com/emberjs/ember.js/issues/11021#issuecomment-161987298

export function formatDirectoryName([name]) {
  Ember.assert('name must be a string', typeof name === 'string');
  if (name == '') {
    // this is the root Directory
    return 'Home';
  }
  return name;
}

export default Ember.Helper.helper(formatDirectoryName);
