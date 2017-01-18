import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('errors/invalid-directory-name', 'Integration | Component | errors/invalid directory name', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{errors/invalid-directory-name}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#errors/invalid-directory-name}}
      template block text
    {{/errors/invalid-directory-name}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
