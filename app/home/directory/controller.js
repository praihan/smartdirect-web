import Ember from 'ember';

const {
  Controller,
  $,
} = Ember;

export default Controller.extend({
  selectedDirectory: null,

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
    }
  }
});
