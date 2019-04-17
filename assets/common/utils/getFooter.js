export default function getFooter(context) {
  return {
    links: [
      {
        title: context.l20n.$m('lang.common.help', '帮助'),
        href: ''
      }, {
        title: context.l20n.$m('lang.common.privacy', '隐私'),
        href: ''
      }, {
        title: context.l20n.$m('lang.common.clause', '条款'),
        href: '',
        blankTarget: true
      }
    ],
    copyright: context.l20n.$m('lang.common.copyright', '© 2009-2019 Aliyun.com 版权所有 ICP证：浙B2-20080101')
  };
}
