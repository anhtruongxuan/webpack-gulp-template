const config = require('../config');
const childProcess = require('child_process');

console.log('- ENV: ', config.env);
console.log('- APP_MODE: ', config.build.mode);

const mode = config.build.mode;
const watch = config.build.watch ? '--watch' : '';
const clientCommand = `cross-env NODE_ENV=${mode} npx webpack --config webpack/webpack.config.js --mode ${mode} --config webpack/webpack.config.js ${watch}`;

// ==== BUILD ====
childProcess.spawn(clientCommand, {
  shell: true,
  stdio: 'inherit',
});
