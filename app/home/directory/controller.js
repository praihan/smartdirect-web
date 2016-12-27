import Ember from 'ember';
import DS from 'ember-data';

const {
  PromiseObject
} = DS;

const {
  Controller,
  $,
  assert,
  computed,
  observer,
  run: {
    scheduleOnce,
  },
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
  pendingDirectories: computed('model.children.@each.isNew', function() {
    return this.get('model.children').filterBy('isNew');
  }),
  /**
   * Loading state is if we have any pending directories or files that need
   * updating on the backend.
   */
  isLoading: computed.notEmpty('pendingDirectories'),

  /**
   * If we change directories, drop our selected item.
   */
  _unselectOnModelChange: observer('model', function() {
    this.send('clearSelectedDirOrFiles');
  }),

  actions: {
    addSelectedDirOrFile(dirOrFile) {
      Ember.assert('directory or file provided', dirOrFile);
      this.get('selectedDirOrFiles').pushObject(dirOrFile);
    },
    clearSelectedDirOrFiles() {
      this.get('selectedDirOrFiles').clear();
    },
    setSelectedDirOrFile(dirOrFile) {
      this.send('clearSelectedDirOrFiles');
      this.send('addSelectedDirOrFile', dirOrFile);
    },

    createNewDirectory(directoryName) {
      assert('directoryName is string', typeof directoryName === 'string');
      const newDirectory = this.store.createRecord('directory', {
        name: directoryName,
        parent: this.get('model'),
      });
      newDirectory.save()
        .then(() => {
          // Set the current (and only) selected item to the
          // newly created directory
          this.send('setSelectedDirOrFile', newDirectory);
        })
        .catch(() => {
          newDirectory.destroyRecord();
        });
    },

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
    destroyDirOrFiles(dirOrFiles) {
      assert('directories and files provided', dirOrFiles);
      dirOrFiles.forEach((dirOrFile) => {
        this.send('destroyDirOrFile', dirOrFile);
      });
    }
  }
});
