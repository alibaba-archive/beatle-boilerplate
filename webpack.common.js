const CaseSensitivePathsPlugin  = require('case-sensitive-paths-webpack-plugin');
const merge                     = require('webpack-merge');
const MiniCssExtractPlugin      = require('mini-css-extract-plugin');
const path                      = require('path');
const webpack                   = require('webpack');
const getRules                  = require('./rule.config');
const {outputDir, entryDir, isDev, isHot, theme, version, versionName} = require('./webpack.env');

const etnry = {
  app: isHot ? [
    require.resolve('react-dev-utils/webpackHotDevClient'),
    path.join(__dirname, entryDir, 'app.jsx'),
  ] : [path.join(__dirname, entryDir, 'app.jsx')],
  vendor: [
    path.join(__dirname, entryDir, 'staticPublicPath.js'),
    'react',
    'react-dom',
    'redux',
    'react-redux',
    'redux-saga',
    'react-intl',
    'history',
    'clipboard',
    'moment',
    'beatle',
    'hc-l20n'
  ]
};

const commonConfig = {
  entry: etnry,
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, outputDir),
    publicPath: '/'
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: {
  },
  module: {
    rules: getRules({isDev, isHot, theme, outputDir, entryDir}),
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css',
    }),
    // This saves us a bunch of bytes by pruning locales (which we don't use)
    // from moment.
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
};

module.exports = merge({}, commonConfig, {
  target: 'web',
  resolveLoader: {
    modules: [path.resolve(__dirname, 'node_modules/')],
  },
  resolve: {
    alias: {},
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    modules: [
      'node_modules',
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new webpack.DefinePlugin({
      'process.env.APP_VERSION': JSON.stringify(version),
      'process.env.APP_VERSION_NAME': JSON.stringify(versionName),
      'process.env.APP_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.APP_LOCALE': JSON.stringify('only'),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 2,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        antd: {
          chunks: 'initial',
          test: /(rc-|antd|hc-materials)/, // /(rc-|antd\/lib|hc-materials)/
          name: 'runtime',
          enforce: true,
        },
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'initial',
          minChunks: 2,
        },
      },
    },
  },
});
