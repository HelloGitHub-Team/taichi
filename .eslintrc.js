module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    page: true,
  },
  rules: {
    'no-param-reassign': ['error', { props: false }],
    '@typescript-eslint/camelcase': 0,
  },
};
