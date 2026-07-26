module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  plugins: [
    'react',
    'react-hooks',
    'react-refresh'
  ],
  rules: {
    // React
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/prop-types': 'off',
    'react/display-name': 'off',

    // Material UI
    'no-restricted-imports': [
      'error',
      {
        paths: [{
          name: '@mui/material',
          message: 'Import trực tiếp từ @mui/material/Button'
        }]
      }
    ],

    // General
    'no-console': 'warn',
    'no-lonely-if': 'warn',
    'no-unused-vars': 'warn',
    'no-trailing-spaces': 'warn',
    'no-multi-spaces': 'warn',
    'no-multiple-empty-lines': 'warn',

    'space-before-blocks': ['error', 'always'],
    'object-curly-spacing': ['warn', 'always'],
    'array-bracket-spacing': ['warn', 'never'],

    'indent': ['warn', 2],
    'quotes': ['error', 'single'],

    // Không cho phép dấu ;
    'semi': ['warn', 'never'],

    // Không cho phép dấu , cuối object/array/function...
    'comma-dangle': ['warn', 'never'],

    // Dấu , phải có khoảng trắng phía sau
    'comma-spacing': [
      'warn',
      {
        before: false,
        after: true
      }
    ],

    'keyword-spacing': ['warn', {
      before: true,
      after: true
    }],
    'arrow-spacing': ['warn', {
      before: true,
      after: true
    }],

    'linebreak-style': 'off',
    'no-unexpected-multiline': 'warn'
  }
}