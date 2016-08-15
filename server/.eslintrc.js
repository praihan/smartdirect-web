module.exports = {
  'env': {
    'es6': true
  },
  'plugins': ['node'],
  'extends': ['eslint:recommended', 'plugin:node/recommended'],
  'rules': {
    "node/no-unsupported-features": ['error', {'version': 6}],
    'strict': ['error', 'global'],
    'indent': ['error', 2],
    'semi': ['error', 'always'],
    'no-var': ['error'],
    'no-console': ['off']
  },
};