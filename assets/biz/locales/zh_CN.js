// 引入 react-intl 多语言包
import intlLocale from 'react-intl/locale-data/zh';

// 引入基础组件的语言包
import antdLocale from 'antd/lib/locale-provider/zh_CN';

// 引入 locale 配置文件
import momentLocale from 'moment/locale/zh-cn';

import hcLocale from 'hc-materials/locale/zh_CN';

export default {
  appLang: 'zh_CN',
  intlLang: 'zh',
  intlLocale: intlLocale,
  antdLocale,
  hcLocale,
  momentLocale
};
