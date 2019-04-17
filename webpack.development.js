process.env.NODE_ENV = 'development';

const {BundleAnalyzerPlugin}  = require('webpack-bundle-analyzer');
const HtmlWebpackPlugin       = require('html-webpack-plugin');
const merge                   = require('webpack-merge');
const webpack                 = require('webpack');
const path                    = require('path');
const L20nPlugin              = require('hc-honeypack-intl-plugin/babel-l20n-plugin');
const Docco                   = require('hc-honeypack-docco-plugin');
const webpackCommon           = require('./webpack.common');
const {entryDir, outputDir, isHot, version} = require('./webpack.env');

const indexFile = path.join(__dirname, 'view', 'index.html');
const plugins = [
  new HtmlWebpackPlugin({
    title: '',
    // excludeChunks: Object.keys(etnry).filter((n) => n != 'index'),
    NODE_ENV: process.env.NODE_ENV,
    templateParameters: {
      version: version,
    },
    meta: {
      appVersion: version,
      availableLanguages: `zh_CN:${version}`,
      defaultLanguage: 'zh_CN',
    },
    filename: 'index.html',
    template: indexFile,
    favicon: path.join(__dirname, 'view', 'favicon.ico'),
    chunks: ['vendor', 'runtime', 'standalone', 'app']
  }),
  new BundleAnalyzerPlugin(),
  new L20nPlugin({filename: path.join(outputDir, 'locale', 'zh_CN.json')}),
  new Docco({
    dir: path.join(entryDir, 'common'),
    output: path.join(__dirname, 'build', 'docs'),
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  })
];
if (isHot) {
  plugins.unshift(new webpack.HotModuleReplacementPlugin());
}

const config = {
  mode: process.env.NODE_ENV,
  devtool: 'source-map',
  plugins: plugins,
  devServer: {
    disableHostCheck: true,
    // contentBase: contentBase,
    watchContentBase: true,
    // publicPath: '/' + outputDir + '/',
    compress: true,
    historyApiFallback: true,
    hot: isHot,
    https: false,
    port: 8080,
    stats: {
      modules: false,
      chunkModules: false,
      chunks: false,
    },
    index: indexFile,
    // proxy: {
    // },
  },
};

module.exports = merge({}, webpackCommon, config);
