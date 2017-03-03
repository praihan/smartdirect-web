import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('directory-browser/dimmer', 'Integration | Component | directory browser/dimmer', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{directory-browser/dimmer}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#directory-browser/dimmer}}
      template block text
    {{/directory-browser/dimmer}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
