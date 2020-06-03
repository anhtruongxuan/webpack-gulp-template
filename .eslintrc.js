const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  root: true,
  env: {
    browser: true,
    jquery: true,
  },
  extends: "airbnb-base",
  rules: {
    "no-console": isProduction ? "warn" : "off",
    "no-debugger": isProduction ? "error" : "off",
    "no-unused-vars": "off",
    "eol-last": "off",
    "linebreak-style": "off",
    "no-param-reassign": "off",
    "no-script-url": "off",
    "no-return-assign": "off",
    "no-multi-assign": "off",
    "no-plusplus": "off",
    "global-require": "off",
    "no-webpack-loader-syntax": "off",
    "import/prefer-default-export": "off",
    "prefer-promise-reject-errors": "off",
    "class-methods-use-this": "off",
    "radix": "off",
    "no-shadow": "off",
    "prefer-destructuring": "off",
    "func-names": "off",
    "arrow-body-style": "off",
    "no-restricted-globals": "off",
    "no-underscore-dangle": "off",
    "function-paren-newline": "off",
    "no-throw-literal": "off",
    "camelcase": "off",
    "no-empty": ["error", { allowEmptyCatch: true }],
    "max-len": ["error", { code: 300 }],
    "import/extensions": "off",
    "import/no-unresolved": "off",
  },
  settings: {
    "import/resolver": "webpack"
  },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: true
  },
  globals: {
    "$": true,
    "jquery": true,
    "console": true,
    "APP_CONFIG": true,
  }
};
