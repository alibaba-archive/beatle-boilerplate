const path                      = require('path');
const MiniCssExtractPlugin      = require('mini-css-extract-plugin');
const autoprefixer              = require('autoprefixer');
const babelConfig               = require('./babel.config');
const L20nPlugin                = require('hc-honeypack-intl-plugin/babel-l20n-plugin');
const L20nLoader                = require('hc-honeypack-intl-plugin/babel-l20n-loader');
const babelAddModuleExports     = require('./babel.add-module-exports');
const deepAssign                = require('deep-assign');

const AWESOME_TYPESCRIPT_LOADER = require.resolve('awesome-typescript-loader');
const CSS_LOADER                = require.resolve('css-loader');
const LESS_LOADER               = require.resolve('less-loader');
const POSTCSS_LOADER            = require.resolve('postcss-loader');
const SASS_LOADER               = require.resolve('sass-loader');
const SASS_VARS_LOADER          = require.resolve('@epegzz/sass-vars-loader');
const CSS_HOT_LOADER            = require.resolve('css-hot-loader');
const URL_LOADER                = require.resolve('url-loader');
const URL_LOADER_LIMIT          = 8192;

module.exports = function addLoaders({isDev, isHot, theme, outputDir, entryDir}) {
  function withCssHotLoader(loaders) {
    if (isHot) {
      return [CSS_HOT_LOADER].concat(loaders);
    }
    return loaders;
  }

  // css
  const CSS_LOADER_CONF = {
    loader: CSS_LOADER,
    options: {
      sourceMap: isDev,
    },
  };

  // css module
  const CSS_MODULE_CONF = {
    loader: CSS_LOADER,
    options: {
      sourceMap: isDev,
      modules: true,
      localIdentName: '[folder]--[local]--[hash:base64:7]',
    },
  };

  // postcss when sass or less
  const postcssLoaderConf = {
    loader: POSTCSS_LOADER,
    options: {
      sourceMap: isDev,
      plugins: [
        autoprefixer({
          browsers: [
            'last 2 versions',
            'Firefox ESR',
            '> 1%',
            'ie >= 9',
            'iOS >= 8',
            'Android >= 4',
          ],
        })
      ]
    },
  };

  const themeVars = theme ? require(path.join(entryDir, 'themes', theme + '.js')) : {};
  // sass
  const sassLoaderConf = [
    postcssLoaderConf,
    {
      loader: SASS_LOADER,
      options: {
        sourceMap: isDev,
      },
    },
    {
      loader: SASS_VARS_LOADER,
      options: {
        syntax: 'scss', // Option 1) Specify vars here
        vars: themeVars,
      },
    },
  ];

  // less
  const lessLoaderConf = {
    loader: LESS_LOADER,
    options: {
      sourceMap: isDev,
      // https://github.com/ant-design/ant-motion/issues/44
      modifyVars: themeVars,
      javascriptEnabled: true,
    },
  };
  // refs: https://github.com/webpack-contrib/mini-css-extract-plugin
  const miniCssExtractPluginLoader = {loader: MiniCssExtractPlugin.loader};
  const fileOutputDir = path.join(outputDir, 'assets', '[hash].[ext]');
  const babelExclude = /node_modules/;

  let BABEL_LOADER = 'babel-loader';
  const babelLoaderConfig = deepAssign({}, babelConfig);
  if (isDev) {
    // BABEL_LOADER = 'babel-loader?cacheDirectory=true&metadataSubscribers=' + JSON.stringify([L20nPlugin.metadataContextFunctionName]);
    babelLoaderConfig.plugins.push([L20nLoader, {
      duplicate: false,
      filename: path.join(outputDir, 'locale', 'zh_CN.json')
    }]);
    babelLoaderConfig.cacheDirectory = true;
    babelLoaderConfig.metadataSubscribers = [L20nPlugin.metadataContextFunctionName];
  }

  if (isHot) {
    babelLoaderConfig.plugins.unshift('react-hot-loader/babel');
  }
  // ref: https://segmentfault.com/a/1190000010787241
  // ref: https://github.com/babel/babel/issues/5127
  babelLoaderConfig.plugins.unshift(babelAddModuleExports);

  return [
    {
      test: /\.jsx?$/,
      exclude: babelExclude,
      use: [
        {
          loader: BABEL_LOADER,
          options: babelLoaderConfig
        },
      ]
    },
    // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'
    {
      test: /\.tsx?$/,
      exclude: babelExclude,
      use: [
        {
          loader: BABEL_LOADER,
          options: babelLoaderConfig,
        },
        {
          loader: AWESOME_TYPESCRIPT_LOADER,
          options: {
            useCache: false,
          },
        },
      ],
    },
    {
      test: /\.scss$/,
      exclude: /\.module\.scss$/,
      use: withCssHotLoader([
        miniCssExtractPluginLoader,
        CSS_LOADER_CONF,
        ...sassLoaderConf,
      ]),
    },
    {
      test: /\.module\.scss$/,
      use: withCssHotLoader([
        miniCssExtractPluginLoader,
        CSS_MODULE_CONF,
        ...sassLoaderConf,
      ]),
    },
    {
      test: /\.css$/,
      exclude: /\.module\.css$/,
      use: withCssHotLoader([
        miniCssExtractPluginLoader,
        CSS_LOADER_CONF,
        postcssLoaderConf,
      ]),
    },
    {
      test: /\.module\.css$/,
      use: withCssHotLoader([
        miniCssExtractPluginLoader,
        CSS_MODULE_CONF,
        postcssLoaderConf,
      ]),
    },
    {
      test: /\.less$/,
      exclude: /\.module\.less$/,
      use: withCssHotLoader([
        miniCssExtractPluginLoader,
        CSS_LOADER_CONF,
        postcssLoaderConf,
        lessLoaderConf,
      ]),
    },
    {
      test: /\.module\.less$/,
      use: withCssHotLoader([
        miniCssExtractPluginLoader,
        CSS_MODULE_CONF,
        postcssLoaderConf,
        lessLoaderConf,
      ]),
    },
    // extra url loader usage
    {
      test: /\.woff2?$/,
      use: [
        {
          loader: URL_LOADER,
          options: {
            limit: URL_LOADER_LIMIT,
            minetype: 'application/font-woff',
            name: fileOutputDir,
          },
        },
      ]
    },
    {
      test: /\.ttf$/,
      use: [
        {
          loader: URL_LOADER,
          options: {
            limit: URL_LOADER_LIMIT,
            minetype: 'application/octet-stream',
            name: fileOutputDir,
          },
        }
      ],
    },
    {
      test: /\.eot$/,
      use: [
        {
          loader: URL_LOADER,
          options: {
            limit: URL_LOADER_LIMIT,
            minetype: 'application/vnd.ms-fontobject',
            name: fileOutputDir,
          },
        }
      ],
    },
    {
      test: /\.svg$/,
      use: [
        {
          loader: URL_LOADER,
          options: {
            limit: URL_LOADER_LIMIT,
            minetype: 'image/svg+xml',
            name: fileOutputDir,
          },
        }
      ],
    },
    {
      test: /\.(png|jpg|jpeg|gif)$/i,
      use: [
        {
          loader: URL_LOADER,
          options: {
            limit: URL_LOADER_LIMIT,
            name: fileOutputDir,
          },
        }
      ],
    },
  ];
};
