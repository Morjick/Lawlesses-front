import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt({
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true,
  },
  root: true,
  extends: [
    '@nuxt/eslint-config',
    'plugin:vue/vue3-essential',
    'standard-with-typescript',
    '@vue/eslint-config-typescript',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: ['./tsconfig.json'],
    extraFileExtensions: ['.vue', '.ts'],
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['vue'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'vue/no-unused-components': [
      'warn',
      {
        ignoreWhenBindingPresent: true,
      },
    ],
    '@typescript-eslint/comma-dangle': [
      'warn',
      {
        arrays: 'always',
        objects: 'always',
      },
    ],
    'comma-dangle': [
      'warn',
      {
        arrays: 'always',
        objects: 'always',
        imports: 'never',
        exports: 'never',
        functions: 'never',
      },
    ],
    'comma-spacing': 'off',
    '@typescript-eslint/comma-spacing': 'warn',
    quotes: ['warn', 'single'],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: {
          max: 1,
        },
        multiline: {
          max: 1,
        },
      },
    ],
    'no-console': 'warn',
    'max-len': ['error', { code: 100 }],
    '@typescript-eslint/strict-boolean-expressions': 'off',
    'array-bracket-spacing': 0,
    'space-before-function-paren': ['warn', 'always'],
    '@typescript-eslint/ban-types': 'off',
    'for-direction': 'off'
  },
})
