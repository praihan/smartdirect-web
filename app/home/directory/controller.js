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
} = Ember;

export default Controller.extend({
  /**
   * The selected directory or file.
   */
  selectedDirOrFile: null,
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
    this.set('selectedDirOrFile', null);
  }),

  actions: {
    setSelectedDirOrFile(dirOrFile) {
      this.set('selectedDirOrFile', dirOrFile);
      // We need to highlight the selected directory
      //   1. Unhighlight all directories
      //   2. Highlight only the selected directory(ies)
      const rows = $('table tr.table-entry').not('.loading');
      rows.removeClass('active');
      if (dirOrFile == null) {
        return;
      }
      // TODO: Account for files too
      rows.each((i, tr) => {
        if ($.attr(tr, 'data-id') === dirOrFile.get('id')) {
          $(tr).addClass('active');
        }
      });
    },

    createNewDirectory(directoryName) {
      assert('directoryName is string', typeof directoryName === 'string');
      const newDirectroy = this.store.createRecord('directory', {
        name: directoryName,
        parent: this.get('model'),
      });
      newDirectroy.save()
        .catch(() => {
          newDirectroy.destroyRecord()
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
          if (this.get('selectedDirOrFile') == dirOrFile) {
            this.set('selectedDirOrFile', null);
          }
        })
        .catch(() => {
          dirOrFile.rollback();
        });
    }
  }
});
