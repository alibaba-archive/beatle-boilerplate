import React from 'react';
import path from 'path';
import getAccount from '../../biz/schemas/getAccount';
import {Select} from 'antd';
export default function getHeader(context, brand, parentRoute) {
  const CONFIG = window.CONFIG || {};
  return {
    profileProps: {
      search: '',
      nick: CONFIG.nick,
      avatar: CONFIG.avatar,
    },
    noSider: true,
    menuProps: {
      brand: brand,
      menu: {
        mode: 'horizontal'
      },
      route: parentRoute,
      routes: context.app.getRoutes().sort((a, b) => {
        return a.value - b.value;
      }).slice(1, -4).map(item => ({
        name: item.name,
        title: item.title,
        path: item.resolvePath
      }))
    },
    onChange: (e) => {
      if (!CONFIG.nick) return;
      switch (e.key) {
        case 'profile':
          context.hocCreator.getModalComponent(
            context.layer.findComponent('Archive', 'hc'),
            {
              modalType: 'info',
              modalProps: {
                title: context.l20n.$m('lang.header.profile', '个人信息'),
                okText: context.l20n.$m('lang.button.ok', '确定')
              }
            },
            {
              childProps: {
                cols: 1,
                options: getAccount({}, context, 'field')
              },
              getResolver: () => {
                const model = context.app.model('account');
                return model.getProfile().then(ret => {
                  return {
                    dataSource: ret
                  };
                });
              }
            }
          );
          break;
        case 'logout':
          window.location = path.normalize(CONFIG.prefix + '/logout');
          break;
      }
    }
  };
}

