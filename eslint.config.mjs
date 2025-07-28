// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import json from '@eslint/json'

export default withNuxt(
  {
    plugins: {
      json,
    },
  },
  {
    files: ['**/*.json'],
    language: 'json/json',
    rules: {
      'json/no-duplicate-keys': 'error',
      'json/no-empty-keys': 'error',
    },
  },
  {
    files: ['**/*.jsonc'],
    language: 'json/jsonc', // JSON with comments
    rules: {
      'json/no-duplicate-keys': 'error',
    },
  },
)
