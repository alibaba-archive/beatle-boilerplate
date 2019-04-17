import React from 'react';
import path from 'path';
import getAccount from '../../biz/schemas/getAccount';
import {Select} from 'antd';
export default function getHeader(context, brand, parentRoute) {
  const CONFIG = window.CONFIG || {};
  const RichSelect = context.hocCreator.getRichComponent(Select, {
    childProps: {
      className: 'g-header-project'
    },
    getResolver: () => {
      return Promise.resolve([{
        value: '1',
        text: '工业知识图谱'
      }, {
        value: '2',
        text: '智能问答'
      }, {
        value: '3',
        text: '语言分析图谱'
      }]).then(ret => {
        return {
          value: '1',
          children: ret.map(item => (<Select.Option key={item.value}>{item.text}</Select.Option>))
        };
      });
    }
  });
  return {
    profileProps: {
      search: '',
      nick: CONFIG.nick,
      avatar: CONFIG.avatar
    },
    noSider: true,
    menuProps: {
      brand: brand,
      prefix: (<RichSelect />),
      menu: {
        mode: 'horizontal'
      },
      route: parentRoute,
      routes: [
        {
          name: 'home',
          title: '首页',
          path: '/home'
        },
        {
          name: 'ide',
          title: '知识图谱开发',
          path: '/ide'
        },
        {
          name: 'nlp',
          title: '关系实体抽取',
          path: '/nlp'
        },
        {
          name: 'semantic',
          title: '语义问答',
          path: '/semantic'
        },
        {
          name: 'vision',
          title: '可视化分析',
          path: '/vision'
        },
        {
          name: 'maintenance',
          title: '运维分析',
          path: '/maintenance'
        },
        {
          name: 'analysis',
          title: '分析服务',
          path: '/analysis'
        }
      ]
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

