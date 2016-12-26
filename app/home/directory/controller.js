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
  selectedDirectory: null,
  newDirOrFileNameText: '',

  loadingDirectories: computed('model.children.@each.isNew', function() {
    return this.get('model.children').filterBy('isNew');
  }),
  isLoading: computed.notEmpty('loadingDirectories'),

  _unselectOnModelChange: observer('model', function() {
    this.set('selectedDirectory', null);
  }),

  actions: {
    setSelectedDirectory(directory) {
      this.set('selectedDirectory', directory);
      // We need to highlight the selected directory
      //   1. Unhighlight all directories
      //   2. Highlight only the selected directory(ies)
      const rows = $('table tr.table-entry').not('.loading');
      rows.removeClass('active');
      if (directory == null) {
        return;
      }
      rows.each((i, tr) => {
        if ($.attr(tr, 'data-id') === directory.get('id')) {
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
        .catch(() => {
          dirOrFile.rollback();
        });
    }
  }
});
