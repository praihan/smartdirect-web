const path = require('path');

module.exports = {
  extends: [
    require.resolve('ember-cli-eslint/coding-standard/ember-application.js')
  ],
  rules: {
    'comma-dangle': ['off'],
  }
};
