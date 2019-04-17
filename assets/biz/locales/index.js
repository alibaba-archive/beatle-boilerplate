import path from 'path';
import React, {useState, createContext} from 'react';
import {IntlProvider, addLocaleData} from 'react-intl';
import {LocaleProvider} from 'antd';
import l20n, {L20nProvider} from 'hc-l20n';
import {cookie} from 'hc-materials';

const locales = {};
// only build one language, default by zh_CN
if (process.env.APP_LOCALE === 'only') {
  locales['zh_CN'] = require('./zh_CN.js');
} else {
  // build all language if we had;
  const requireContext = require.context('.', false, /^index\.js$/);
  requireContext.keys().forEach(key => {
    const lang = path.basename(key, path.extname(key));
    locales[lang] = requireContext(key);
  });
}

function getLanguage() {
  const cookieLang = cookie.get('aliyun_lang');
  const cookieTerritory = cookie.get('aliyun_territory');
  if (cookieLang && cookieTerritory) {
    return `${cookieLang}_${cookieTerritory.toLocaleUpperCase()}`;
  } else {
    const langMeta = document.querySelector('meta[name="defaultLanguage"]');
    if (langMeta) {
      return langMeta.getAttribute('content');
    } else {
      return navigator.language.replace('-', '_');
    }
  }
}

addLocaleData(Object.values(locales).reduce((a, b) => a.intlLocale.concat(b.intlLocale), {intlLocale: []}));

const localeContext = createContext();

/* eslint-disable react/prop-types */
export default function Locale({lang, children}) {
  lang = lang || getLanguage();
  const [state, setState] = useState(locales[lang]);
  // implement interface
  Locale.changeLanguage = (newLang) => {
    setState(locales[newLang]);
    l20n.changeLanguage(newLang);
  };
  /**
   * 应用的国际化通过L20nProvider来实现
   * 日期等格式化需要国际化单位则通过IntlProvider
   * antd及通用组件国际化LocaleProvider
   */
  return (<localeContext.Provider value={state}>
    <IntlProvider
      locale={state.intlLang}
      messages={{}}
    >
      <LocaleProvider locale={state.antdLocale}>
        <L20nProvider
          onChangeLanguage={lang => {
            const [newLang, territory] = lang.split('_');
            cookie.set('aliyun_lang', newLang, 365, document.domain, '/');
            cookie.set('aliyun_territory', territory, 365, document.domain, '/');
          }}
        >
          {React.Children.only(children)}
        </L20nProvider>
      </LocaleProvider>
    </IntlProvider>
  </localeContext.Provider>);
}

Locale.getLocales = () => Object.values(locales);
// interface
Locale.changeLanguage = () => {};
