module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier', // Add this line
      'plugin:prettier/recommended', // Add this line
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: [
      'react',
      '@typescript-eslint',
      'prettier', // Add this line
    ],
    rules: {
      'prettier/prettier': 'error', // Add this line
      // Your other rules here...
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  };
  