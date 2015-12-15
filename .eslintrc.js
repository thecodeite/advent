module.exports = {
  rules: {
    'indent': [2, 2],
    'quotes': [2, 'single'],
    'linebreak-style': [2, 'unix'],
    'semi': [2, 'always'],
    'require-jsdoc': [0],
    'no-console': [0]
  },
  env: {
    es6: true,
    node: true
  },
  extends: 'eslint:recommended'
};