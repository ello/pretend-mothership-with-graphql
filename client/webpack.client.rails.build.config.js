// Run like this:
// cd client && npm run build:client
// Note that Foreman (Procfile.dev) has also been configured to do this

const webpack = require('webpack'),
      ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = require('./webpack.client.base.config');

const devBuild = process.env.NODE_ENV !== 'production';

config.output = {
  filename: '[name]-bundle.js',
  path: '../app/assets/webpack',
};

config.entry.vendor.unshift(
  'es5-shim/es5-shim',
  'es5-shim/es5-sham',
  'jquery-ujs',

  // Configures extractStyles to be true if NODE_ENV is production
  'bootstrap-loader/extractStyles'
);

config.module.loaders.push(
  {
    test: /\.jsx?$/,
    loader: 'babel',
    query: {
      plugins: ['../config/build/babelRelayPlugin.js'],
      presets: ['react', 'es2015', 'stage-0']
    },
    exclude: /node_modules/,
  },
  {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract(
      'style',
      'css?minimize&modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]' + '!postcss'
    ),
  },
  {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract(
      'style',
      'css?minimize&modules&importLoaders=3&localIdentName=[name]__[local]__[hash:base64:5]' +
        '!postcss' +
        '!sass' +
        '!sass-resources'
    ),
  },
  {
    test: require.resolve('react'),
    loader: 'imports?shim=es5-shim/es5-shim&sham=es5-shim/es5-sham',
  },
  {
    test: require.resolve('jquery-ujs'),
    loader: 'imports?jQuery=jquery',
  }
);

config.plugins.push(
  new ExtractTextPlugin('[name]-bundle.css', { allChunks: true }),
  new webpack.optimize.DedupePlugin()
);

if (devBuild) {
  console.log('Webpack dev build for Rails'); // eslint-disable-line no-console
  config.devtool = 'eval-source-map';
} else {
  console.log('Webpack production build for Rails'); // eslint-disable-line no-console
}

module.exports = config;
