module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', [
      'build', 'docs', 'feat', 'merge', 'fix', 'pref', 'refactor', 'style', 'test', 'revert', 'chore',
    ]],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
  },
};
