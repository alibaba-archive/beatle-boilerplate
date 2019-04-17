import Beatle from 'beatle';
import {versionDetector} from 'hc-materials';

import bootstrap from './common/utils/bootstrap';
import './app.less';
const app = new Beatle({
  // 加载所有的数据模型
  models: require.context('./biz/models', false, /\w+\.js$/),
  // 加载所有的页面路由
  routes: require.context('./pages', true, /index\.(jsx|js)$/),
  // 配置ajax
  ajax: {
    headers: {
      'Content-Type': 'application/json'
    },
    normalize: true,
    origin: '//api.github.com'
  },
  level: 2
});
app.ready = bootstrap(
  app,
  () => {
    return Promise.resolve();
  },
  process.env.APP_VERSION_NAME
);
app.ready(({versionKey, prefix, dom}) => {
  const CONFIG = window.CONFIG || {};
  if ([0, 1].indexOf(window.location.pathname.indexOf(prefix)) > -1) {
    if (versionKey && CONFIG.VERSION) {
      versionDetector(versionKey, CONFIG.VERSION);
    }
    app.run(dom, prefix);
  }
});
