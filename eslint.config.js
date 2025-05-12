import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default defineConfig([
    {
        ignores: ['dist/**', 'eslint.config.js', 'webpack.config.js'],
        files: ['**/*.js', '**/*.ts'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: './tsconfig.json',
                tsconfigRootDir: '.',
                sourceType: 'module',
            },
            globals: {
                ...globals.node,
                ...globals.jest,
            },
        },
        plugins: {
            '@typescript-eslint': tseslint,
            js,
        },
        extends: ['js/recommended'],
        rules: {
            ...tseslint.configs.recommended.rules,
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/explicit-function-return-type': 'error',
            '@typescript-eslint/no-unused-vars': 'error',
            'array-bracket-spacing': ['error', 'never'],
            'eol-last': 'error',
            'max-len': ['error', { 'code': 120 }],
            'no-multi-spaces': 'error',
            'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0, 'maxBOF': 0 }],
            'no-trailing-spaces': 'error',
            'one-var-declaration-per-line': ['error', 'always'],
            'padded-blocks': ['error', 'never'],
            'semi-spacing': 'error',
            'semi-style': ['error', 'last'],
            'space-in-parens': 'error',
            'comma-dangle': ['error', 'always-multiline'],
            'indent': ['error', 4, { SwitchCase: 1 }],
            'no-extra-semi': 'error',
            'object-curly-newline': ['error', { 'multiline': true, 'minProperties': 4, 'consistent': true }],
            'object-curly-spacing': ['error', 'always'],
            'padding-line-between-statements': [
                'error',
                { blankLine: 'always', prev: '*', next: ['export', 'return', 'function'] },
            ],
            'quotes': ['error', 'single'],
            'semi': 'error',
            'space-before-blocks': 'error',
            'no-console': 'warn',
        },
    },
    {
        files: ['**/*.test.ts', '**/*.spec.ts'],
        languageOptions: {
            globals: {
                ...globals.jest,
            },
        },
        rules: {
            '@typescript-eslint/explicit-function-return-type': 'off',
            'max-len': 'off',
        },
    },
]);
