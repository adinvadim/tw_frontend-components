// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  extends: [
    'airbnb-base',
    'plugin:promise/recommended',
    'plugin:import/warnings',
    'plugin:import/errors',
    'plugin:vue/recommended',
  ],
  parserOptions: {
    sourceType: 'module',
    parser: 'babel-eslint',
    ecmaVersion: 2017,
  },
  env: {
    browser: true,
  },
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js',
      },
    },
  },
  plugins: ['promise', 'import', 'vue'],
  // add your custom rules here
  rules: {
    // don't require .vue extension when importing
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        vue: 'never',
      },
    ],
    'no-unused-vars': 1,
    'no-console': 1,
    // allow optionalDependencies
    'import/no-extraneous-dependencies': [
      'error',
      {
        optionalDependencies: ['test/unit/index.js'],
      },
    ],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-param-reassign': ['error', { props: false }],
    'import/prefer-default-export': 1,
    'max-len': 0,
    'vue/max-attributes-per-line': 0,
  },
};
