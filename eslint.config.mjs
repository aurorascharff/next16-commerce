import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import autofix from 'eslint-plugin-autofix';
import reactHooks from 'eslint-plugin-react-hooks';
import sortKeysFix from 'eslint-plugin-sort-keys-fix';
import reactCompiler from 'eslint-plugin-react-compiler';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  allConfig: js.configs.all,
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [{
  ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts"]
}, {
  ignores: ['**/next-env.d.ts'],
}, ...fixupConfigRules(
  compat.extends(
    'eslint:recommended',
    'eslint-config-prettier',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
    'next',
    'next/core-web-vitals',
    'prettier',
  ),
), {
  languageOptions: {
    ecmaVersion: 12,
    globals: {
      ...globals.browser,
    },
    parser: tsParser,
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
    sourceType: 'module',
  },
  plugins: {
    autofix,
    'react-compiler': reactCompiler,
    'react-hooks': fixupPluginRules(reactHooks),
    'sort-keys-fix': sortKeysFix,
  },
  rules: {
    'react-compiler/react-compiler': 'error',
    'sort-keys-fix/sort-keys-fix': 'warn',
  },
}, {
  files: ['**/*.ts?(x)'],
  rules: {
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      {
        prefer: 'type-imports',
      },
    ],
    'arrow-body-style': ['warn', 'always'],
    'autofix/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
    'import/order': [
      'warn',
      {
        alphabetize: {
          order: 'asc',
        },
        groups: ['builtin', 'external', 'parent', 'sibling', 'index', 'object', 'type'],
        pathGroups: [
          {
            group: 'parent',
            pattern: '@/**/**',
            position: 'before',
          },
        ],
      },
    ],
    'no-console': 'warn',
    'no-redeclare': 'warn',
    quotes: ['warn', 'single'],
    'react/display-name': 'error',
    'react/jsx-key': 'warn',
    'react/react-in-jsx-scope': 'off',
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],
    'spaced-comment': 'warn',
  },
}];

export default eslintConfig;
