import Ember from 'ember';

export default Ember.Service.extend({

  /**
   * Stores a key mapped to a value in the persistence store
   * @param {String|Number} key
   * @param {String|Number} value
   */
  store(key, value) {
    window.localStorage.setItem(key, value);
  },
  
  /**
   * Returns the value mapped to `key` or `null`
   * @param {String|Number} key
   */
  find(key) {
    return window.localStorage.getItem(key);
  },

  /**
   * Removes a given key from the storage
   * @param {String|Number} key
   */
  remove(key) {
    window.localStorage.removeItem(key);
  },

  /**
   * Clears all set keys and values
   */
  clear() {
    window.localStorage.clear();
  },

  _ensureLocalStorageExists: Ember.on('init', function ensureLocalStorageExists() {
    Ember.assert(window.localStorage, 'window.localStorage should exist');
  }),
});
