const path = require('path');

const configFolder = __dirname;

const env = process.env.ENV || 'development';

const defaultConfig = require('./default.json');

// eslint-disable-next-line import/no-dynamic-require
const configByEnv = require(`${configFolder}/${env}.json`);

module.exports = {
  [env]: true,
  env,
  root: path.resolve(configFolder, '..'),
  ...configByEnv,
  // ...defaultConfig,
};
