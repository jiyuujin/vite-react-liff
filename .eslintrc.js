module.exports = {
  extends: [
    '@nekohack/eslint-config-react',
    'plugin:@typescript-eslint/recommended'
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    }
  },
  rules: {
    '@typescript-eslint/no-empty-function': 0
  }
}
