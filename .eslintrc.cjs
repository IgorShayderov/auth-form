module.exports = {
  root: true,
  env: {
    browser: true,
    'vue/setup-compiler-macros': true,
  },
  extends: [
    '@vue/airbnb',
    '@vue/typescript/recommended',
    'plugin:vue/vue3-strongly-recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'arrow-body-style': 'off',
    'import/prefer-default-export': 'off',
  },
};
