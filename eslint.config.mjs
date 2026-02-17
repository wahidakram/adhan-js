import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import jestPlugin from 'eslint-plugin-jest';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

export default tseslint.config(
  {
    ignores: ['lib/**', 'coverage/**', 'Shared/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    rules: {
      complexity: ['warn', 10],
      'max-lines': ['warn', 300],
      'max-params': ['warn', 5],
      eqeqeq: ['error', 'smart'],
      'no-var': 'error',
      'prefer-const': 'error',
      'object-shorthand': 'error',
    },
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-unnecessary-condition': 'warn',
    },
  },
  {
    files: ['test/**/*.ts'],
    ...jestPlugin.configs['flat/recommended'],
  },
  {
    files: ['test/**/*.ts'],
    rules: {
      ...jestPlugin.configs['flat/style'].rules,
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },
  eslintPluginPrettierRecommended,
);
