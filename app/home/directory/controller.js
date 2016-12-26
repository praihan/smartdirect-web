import Ember from 'ember';

const {
  Controller,
  $,
  assert,
} = Ember;

export default Controller.extend({
  selectedDirectory: null,

  newDirOrFileNameText: '',

  actions: {
    setSelectedDirectory(directory) {
      this.set('selectedDirectory', directory);
      // We need to highlight the selected directory
      //   1. Unhighlight all directories
      //   2. Highlight only the selected directory(ies)
      const rows = $('table tr.table-entry');
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
    }
  }
});
