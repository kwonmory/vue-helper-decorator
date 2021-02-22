module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'airbnb-base',
  ],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVerson: 11,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: false,
    },
  },
  globals: {
    context: 'readonly',
    given: 'readonly',
  },
  rules: {
    'prettier/prettier': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-types': 'off',
    'object-curly-spacing': 'off',
    'no-param-reassign': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'no-shadow': 'off',
    'no-console': 'off',
    'no-restricted-syntax': 'off',
    'no-bitwise': 'off',
    'no-continue': 'off',
    'max-classes-per-file': 'off',
    'no-use-before-define': 'off',
    'no-new': 'off',
    'class-methods-use-this': 'off',
    'import/prefer-default-export': 'off',
    'no-undef': 'off',
    'func-names': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-empty-function': 'off',
    'linebreak-style': 'off',
  },
};
