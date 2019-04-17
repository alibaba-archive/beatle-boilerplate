import {$m} from 'hc-l20n';
import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

import {Layer, converter, bootstrap} from 'hc-materials';

Layer.resolveGallery = (callback) => new Promise(resolve => {
  Object.assign(window, {
    React: React,
    ReactDOM: ReactDOM,
    moment: moment,
    $m: $m
  });
  // > see: https://github.com/voronianski/babel-transform-in-browser
  require.ensure(['lodash', 'antd', 'babel-standalone'], function (require) {
    Object.assign(window, {
      Babel: require('babel-standalone'),
      _: require('lodash')
    });

    function transform(code, varName) {
      if (code) {
        return window.Babel.transform(
          (varName ? 'window.' + varName + '=' : '') + code,
          {
            presets: ['es2015', 'react', 'stage-0'],
            plugins: ['transform-object-assign']
          }
        ).code;
      }
    }

    function runCode(code) {
      code = transform(code, '__tmp_code__');
      new Function(code)('__tmp_code__');
      code = window.__tmp_code__;
      delete window.__tmp_code__;
      return code;
    }
    converter.transform = transform;
    converter.parse = (obj) => {
      try {
        if (typeof obj === 'function') {
          return obj;
        } else if (Object(obj) === obj) {
          return JSON.parse(obj, (k, v) => {
            if (typeof v === 'string' && v.indexOf('function') === 0) {
              return runCode(obj);
            } else {
              return v;
            }
          }, 2);
        } else {
          return runCode(obj);
        }
      } catch (e) {
        window.console.error(e);
      }
    };

    const gallery = {
      components: {
        antd: require('antd')
      }
    };

    callback && callback(gallery);
    resolve(gallery);
  }, 'standalone');
});

function ibootstrap(app, getInitData, versionKey) {
  return bootstrap(app, getInitData, versionKey, {
    // 登录失效
    sessionTimeout: (ret) => {
      return ret;
    },
    // 未授权
    noAuth: (ret) => {
      return ret;
    },
    // 未知异常
    exception: (ret) => {
      return ret;
    },
    // 接口数据预处理，取data作为数据结构
    proccessData: (ret) => {
      if (ret) {
        if (ret.code === 'SUCCESS') {
          return ret.data || null;
        } else {
          return new Error(ret.msg);
        }
      } else {
        return null;
      }
    }
  });
}

Object.keys(bootstrap).forEach(key => {
  ibootstrap[key] = bootstrap[key];
});

export default ibootstrap;
