import Ember from 'ember';

export default Ember.Component.extend({
  /**
   * The callback to execute when the close button is clicked on
   * this error message.
   */
  onClose: null,

  /**
   * The JSONAPI error object that caused this error.
   */
  errorData: null,

  actions: {
    /**
     * The action for this component that will call the given on closeCallback.
     */
    close(...args) {
      const closeCallback = this.get('onClose');
      Ember.assert('Tried to close an error message when no onClose callback was given', closeCallback);
      closeCallback(...args);
    }
  }
});
