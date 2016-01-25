// Common webpack configuration for server bundle.

const webpack = require('webpack');
const path = require('path');

const devBuild = process.env.NODE_ENV !== 'production';
const nodeEnv = devBuild ? 'development' : 'production';

module.exports = {
  context: __dirname,
  entry: [
    'babel-polyfill',
    './app/bundles/HelloWorld/startup/clientRegistration.jsx'
  ]
}
