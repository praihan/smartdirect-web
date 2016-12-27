import Ember from 'ember';

const {
  Controller,
  assert,
  computed,
  observer,
  A,
} = Ember;

export default Controller.extend({
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
        this.send('setSelectedDirOrFile', newDirectory);
        return newDirectory;
      })
      .catch((err) => {
        newDirectory.destroyRecord();
        throw err;
      });
  },

  /**
   * If we change directories, drop our selected item.
   */
  _unselectOnModelChange: observer('model', function() {
    this.send('clearSelectedDirOrFiles');
  }),

  actions: {
    /**
     * Add a directory or file to the list of selected ones.
     */
    addSelectedDirOrFile(dirOrFile) {
      Ember.assert('directory or file provided', dirOrFile);
      this.get('selectedDirOrFiles').pushObject(dirOrFile);
    },
    /**
     * Deselect all selected directories and files.
     */
    clearSelectedDirOrFiles() {
      this.get('selectedDirOrFiles').clear();
    },
    /**
     * Select a directory or file and deselect everything else.
     */
    setSelectedDirOrFile(dirOrFile) {
      this.send('clearSelectedDirOrFiles');
      this.send('addSelectedDirOrFile', dirOrFile);
    },

    /**
     * Create a new directory with the given name.
     */
    createNewDirectory(directoryName) {
      this._createNewDirectory(directoryName)
        .catch(() => { });
    },
    /**
     * Create a new directory from the user-visible input text.
     */
    createNewDirectoryFromInput() {
      this._createNewDirectory(this.get('newDirOrFileNameText'))
        .then(() => {
          this.set('newDirOrFileNameText', '');
        })
        .catch(() => { });
    },

    /**
     * Destroy the given directory or file from the store.
     */
    destroyDirOrFile(dirOrFile) {
      assert('directory or file provided', dirOrFile);
      dirOrFile.destroyRecord()
        .then(() => {
          // if we destroy our selected one, it can't be
          // selected any more.
          // Note that this will happen only after the backend
          // verifies that it's gone.
          this.get('selectedDirOrFiles').removeObject(dirOrFile);
        })
        .catch(() => {
          dirOrFile.rollback();
        });
    },
    /**
     * Destroy a list of directories and files.
     * @see destroyDirOrFile`
     */
    destroyDirOrFiles(dirOrFiles) {
      assert('directories and files provided', dirOrFiles);
      dirOrFiles.forEach((dirOrFile) => {
        this.send('destroyDirOrFile', dirOrFile);
      });
    }
  }
});
