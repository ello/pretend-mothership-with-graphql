// This config file setups up the Webpack Dev Server: https://webpack.github.io/docs/webpack-dev-server.html
// Run like this:
// cd client && node server.js

const webpack = require('webpack');
const path = require('path');
const config = require('./webpack.client.base.config');

const hotRailsPort = process.env.HOT_RAILS_PORT || 3500;
config.entry.app.push(

  // Webpack dev server
  `webpack-dev-server/client?http://localhost:${hotRailsPort}`,
  'webpack/hot/only-dev-server',
);

config.entry.vendor.push(
  'es5-shim/es5-shim',
  'es5-shim/es5-sham',
  'jquery-ujs',
  'bootstrap-loader'
);

config.output = {

  // this file is served directly by webpack
  filename: '[name]-bundle.js',
  path: path.join(__dirname, 'public'),
  publicPath: `http://localhost:${hotRailsPort}/`,
};

// All the styling loaders only apply to hot-reload, not rails
config.module.loaders.push(
  {
    test: /\.jsx?$/,
    loader: 'babel',
    exclude: /node_modules/,
    query: {
      plugins: ['../config/build/babelRelayPlugin'],
      presets: ['react', 'es2015', 'stage-0']
    },
    // query: {
    //   plugins: [
    //     [
    //       'react-transform',
    //       {
    //         transforms: [
    //           {
    //             transform: 'react-transform-hmr',
    //             imports: ['react'],
    //             locals: ['module'],
    //           },
    //         ],
    //       },
    //     ],
    //   ],
    // },
  },
  { test: /\.css$/, loader: 'style-loader!css-loader' },
  {
    test: /\.scss$/,
    loaders: [
      'style',
      'css?modules&importLoaders=3&localIdentName=[name]__[local]__[hash:base64:5]',
      'postcss',
      'sass',
      'sass-resources',
    ],
  },
  {
    test: require.resolve('jquery-ujs'),
    loader: 'imports?jQuery=jquery',
  },
);

config.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
);

config.devtool = 'eval-source-map';

console.log('Webpack dev build for Rails'); // eslint-disable-line no-console

module.exports = config;
