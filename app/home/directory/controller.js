import Ember from 'ember';

import genericErrorNotifier from '../../notifications/errors/generic-error';
import invalidDirectoryNameNotifier from '../../notifications/errors/invalid-directory-name';

const {
  Controller,
  assert,
  computed,
  observer,
  A,
  getOwner,
  inject: {
    service,
  },
} = Ember;

const errorNotifiers = {
  'generic-error': genericErrorNotifier,
  'invalid-directory-name': invalidDirectoryNameNotifier,
};

export default Controller.extend({
  /**
   * The ember-notify service.
   */
  notify: service(),

  /**
   * The list of selected directories and files.
   */
  selectedDirOrFiles: A(),
  /**
   * A binding to the text input for the name of a new file/directory.
   */
  newDirOrFileNameText: '',

  /**
   * An array of child directories that have not been saved to the backend
   * by our adapter yet.
   */
  pendingDirectories: computed('model.children.@each.isSaving', function() {
    return this.get('model.children').filterBy('isSaving');
  }),
  /**
   * Loading state is if we have any pending directories or files that need
   * updating on the backend.
   */
  isLoading: computed.notEmpty('pendingDirectories'),

  /**
   * Create a new directory with the given name and set it selected.
   * Returns a promise that resolves to the newly created directory.
   */
  _createNewDirectory(directoryName) {
    assert('directoryName is string', typeof directoryName === 'string');
    const newDirectory = this.store.createRecord('directory', {
      name: directoryName,
      parent: this.get('model'),
    });
    return newDirectory.save()
      .then(() => {
        // Set the current (and only) selected item to the
        // newly created directory
        this._clearSelectedDirOrFiles();
        this._addSelectedDirOrFile(newDirectory);
        return newDirectory;
      })
      .catch((err) => {
        newDirectory.destroyRecord();
        throw err;
      });
  },
  /**
   * Creates a new directory from the user-visible input text.
   */
  _createNewDirectoryFromInput() {
    this._createNewDirectory(this.get('newDirOrFileNameText'))
      .then(() => {
        this.set('newDirOrFileNameText', '');
      })
      .catch((err) => {
        (err.errors || []).forEach((apiError) => {
          const errorCode = apiError.code;
          const errorSource = apiError.source.pointer;
          // determine the appropriate component to display the error. Fallback
          // to a generic error.
          let errorType = 'generic-error';
          if (errorCode === 'VALIDATION_ERROR' && errorSource === '/data/attributes/name') {
            // name validation failed, set the appropriate error data.
            errorType = 'invalid-directory-name';
          }
          // pop out a new error.
          this._notifyError(errorType, apiError);
        });
      });
  },
  
  /**
   * Clears the selectedDirOrFiles array.
   */
  _clearSelectedDirOrFiles() {
    this.get('selectedDirOrFiles').clear();
  },
  /**
   * Add a directory to file to the selected array.
   */
  _addSelectedDirOrFile(dirOrFile) {
    Ember.assert('directory or file provided', dirOrFile);
    this.get('selectedDirOrFiles').pushObject(dirOrFile);
  },
  /**
   * Destroy the given directory or file from the store.
   */
  _destroyDirOrFile(dirOrFile) {
    assert('directory or file provided', dirOrFile);
    return dirOrFile.destroyRecord()
      .then(() => {
        // if we destroy our selected one, it can't be
        // selected any more.
        // Note that this will happen only after the backend
        // verifies that it's gone.
        this.get('selectedDirOrFiles').removeObject(dirOrFile);
      })
      .catch((err) => {
        dirOrFile.rollback();
        throw err;
      });
  },
  _destroyDirOrFiles(dirOrFiles) {
    assert('directories and files provided', dirOrFiles);
    dirOrFiles.forEach((dirOrFile) => {
      this._destroyDirOrFile(dirOrFile);
    });
  },

  /**
   * notifies an error given the name and error data.
   */
  _notifyError(name, errorData) {
    assert('error name is valid', errorNotifiers[name] != null);
    errorNotifiers[name](getOwner(this), this.get('notify'), errorData);
  },

  actions: {
    /**
     * Add a directory or file to the list of selected ones.
     */
    addSelectedDirOrFile(dirOrFile) {
      this._addSelectedDirOrFile(dirOrFile);
    },
    /**
     * Deselect all selected directories and files.
     */
    clearSelectedDirOrFiles() {
      this._clearSelectedDirOrFiles();
    },
    /**
     * Select a directory or file and deselect everything else.
     */
    setSelectedDirOrFile(dirOrFile) {
      this._clearSelectedDirOrFiles();
      this._addSelectedDirOrFile(dirOrFile);
    },

    /**
     * Create a new directory from the user-visible input text.
     */
    createNewDirectoryFromInput() {
      this._createNewDirectoryFromInput();
    },

    /**
     * Destroy the given directory or file from the store.
     */
    destroyDirOrFile(dirOrFile) {
      this._destroyDirOrFile(dirOrFile);
    },
    /**
     * Destroy a list of directories and files.
     * @see destroyDirOrFile
     */
    destroyDirOrFiles(dirOrFiles) {
      this._destroyDirOrFiles(dirOrFiles);
    },
  }
});
