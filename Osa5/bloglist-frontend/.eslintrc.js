module.exports = {
  'env': {
    'browser': true,
    'es2020': true,
    'commonjs':true,
    'jest/globals': true,
    'cypress/globals': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'settings': {
    'react': {
      'createClass': 'createReactClass',
      'pragma': 'React',
      'version': 'detect',
      'flowVersion': '0.53'
    },
    'propWrapperFunctions': [
      { 'property': 'freeze', 'object': 'Object' },
      { 'property': 'myFavoriteWrapper' }
    ],
    'linkComponents': [
      'Hyperlink',
      { 'name': 'Link', 'linkAttribute': 'to' }
    ]
  },
  'plugins': [
    'react', 'jest', 'cypress'
  ],
  'rules': {
    'indent': [
      'error',
      2
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ],
    'eqeqeq': 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': [
      'error', 'always'
    ],
    'arrow-spacing': [
      'error', { 'before': true, 'after': true }
    ],
    'no-console': 0,
    'react/prop-types': 0
  }
}