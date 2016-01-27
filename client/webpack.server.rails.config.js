// Common webpack configuration for server bundle.

const webpack = require('webpack');
const path = require('path');

const devBuild = process.env.NODE_ENV !== 'production';
const nodeEnv = devBuild ? 'development' : 'production';

module.exports = {
  context: __dirname,
  entry: [
    'babel-polyfill',
    './app/bundles/HelloWorld/startup/serverRegistration',
    './app/bundles/Posts/startup/serverRegistration'
  ],
  output: {
    filename: 'server-bundle.js',
    path: '../app/assets/webpack'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      lib: path.join(process.cwd(), 'app', 'lib'),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv),
      },
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        query: {
          plugins: ['../config/build/babelRelayPlugin.js'],
          presets: ['react', 'es2015', 'stage-0'],
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loaders: [
          'css/locals?modules&importLoaders=0&localIdentName=[name]__[local]__[hash:base64:5]',
        ],
      },
      {
        test: /\.scss$/,
        loaders: [
          'css/locals?modules&importLoaders=2&localIdentName=[name]__[local]__[hash:base64:5]',
          'sass',
          'sass-resources',
        ],
      },
    ],
  },

  sassResources: ['./app/assets/styles/app-variables.scss'],
};
