module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  rules: {
    'import/extensions': ['error', 'never'],
    'no-plusplus': 0,
  },
  settings: {
    // eslint-disable-next-line no-undef
    'import/resolver': {
      /* 上一行是eslint-plugin-import/resolver的省略 */
      webpack: {
        config: './build/webpack.base.conf.js',
      },
    },
  },
  globals: {
    $: 'writable',
    flatpickr: 'writable',
  },
};
