import { moduleFor, test } from 'ember-qunit';

moduleFor('service:persist', 'Unit | Service | persist', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

test('store() and find() work', function(assert) {
  const service = this.subject();

  service.store('__oompa__loompa', 'Charlie');
  assert.ok(service.find('__oompa__loompa') === 'Charlie', 'persist should be able to store a string');

  service.store('__oompa__loompa', 'Doggy');
  assert.ok(service.find('__oompa__loompa') === 'Doggy', 'persist should be able to overwrite');

  service.store('__hitler__', 1);
  assert.ok(service.find('__hitler__') === '1', 'persist should convert integer value to string');

  service.store(1, '__hitler__');
  assert.ok(service.find(1) === '__hitler__', 'persist should convert integer key to string');
});

test('remove() works', function(assert) {
  const service = this.subject();

  service.store('__oompa__loompa', 'Charlie');
  assert.ok(service.find('__oompa__loompa') === 'Charlie', 'persist should be able to store a string');
  service.remove('__oompa__loompa');
  assert.ok(service.find('__oompa__loompa') === null, 'persist should return `null` when trying to get removed key');
});

test('clear() works', function(assert) {
  const service = this.subject();

  service.store('__oompa__loompa', 'Charlie');
  assert.ok(service.find('__oompa__loompa') === 'Charlie', 'persist should be able to store a string');
  service.store('__hitler__', 1);
  assert.ok(service.find('__hitler__') === '1', 'persist should convert integer value to string');
  service.clear();
  assert.ok(service.find('__oompa__loompa') === null, 'persist should remove all keys when clear is called');
  assert.ok(service.find('__hitler__') === null, 'persist should remove all keys when clear is called');
});
