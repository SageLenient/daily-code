module.exports = {
  extends: [
    'eslint-config-ali/vue',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'eslint-disable-next-line': 'off',
    'no-new': 'off',
    'no-param-reassign': 'off',
  },
};
