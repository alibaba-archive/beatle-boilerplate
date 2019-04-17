process.env.NODE_ENV = 'production';
const path                          = require('path');
const ExtractCssAssetsWebpackPlugin = require('extract-css-assets-webpack-plugin');
const merge                         = require('webpack-merge');
const UglifyJsPlugin                = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin             = require('copy-webpack-plugin');
const webpackCommon                 = require('./webpack.common');
const {destDir, version, versionName, outputDir} = require('./webpack.env');
const fs                            = require('fs');

const indexFile = path.join(__dirname, 'view', 'index.html');
const timestamp = +new Date().getTime();
fs.writeFileSync(path.resolve(destDir, 'v.js'), `window.${versionName} = "${version}_${timestamp}"`);

const config = {
  mode: process.env.NODE_ENV,
  devtool: 'none',
  optimization: {
    minimize: false, // 压缩代码后运行失败，先关闭
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: {
            unused: false,
            warnings: false,
          },
          output: {
            /* eslint-disable quote-props */
            'ascii_only': true,
            comments: 'some',
            beautify: false,
          },
          mangle: true,
        },
      }),
    ],
  },
  plugins: [
    new ExtractCssAssetsWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: indexFile,
        to: path.resolve(outputDir),
        transform: (content) => {
          return content.replace(/(<!--|-->)/g, '').reaplce('${version}', version);
        },
        // ignore: ['*.html'],
      },
    ]),
  ],
};

module.exports = merge({}, webpackCommon, config);
