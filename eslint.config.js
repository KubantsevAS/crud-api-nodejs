import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';

export default defineConfig([
    {
        files: ['**/*.js', '**/*.ts'],
        plugins: {
            js,
        },
        languageOptions: { globals: globals.browser },
        extends: ['js/recommended'],
        rules: {
            'array-bracket-spacing': ['error', 'never'],
            'eol-last': 'error',
            'jsx-quotes': ['error', 'prefer-single'],
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
            // 'member-delimiter-style': 'error',
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
            // 'type-annotation-spacing': [
            //     'error',
            //     { 'before': false, 'after': true, 'overrides': { 'arrow': { 'before': true, 'after': true } } },
            // ],
            'no-console': 'error',
        },
        ignores: ['eslint.config.js'],
    },
]);
