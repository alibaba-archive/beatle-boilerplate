import React from 'react';
import getAccount from '../../biz/schemas/getAccount';
import {contextTypes} from 'emr-app-common';

export default {
  layout: {
    cname: 'LandingLayout',
    componentType: 'hc',
    option: {
      props: {
        style: {
          height: document.body.offsetHeight,
          overflow: 'hidden',
          padding: 0
        }
      },
      components: [
        {
          key: 'Header',
          cname: 'Header',
          componentType: 'hc',
          contextTypes: ['header', 'brand'],
          getProps: (props, context) => {
            return Object.assign({routes: []}, context.header, {brand: context.brand});
          }
        },
        {
          key: 'Footer',
          cname: 'GlobalFooter',
          componentType: 'hc',
          contextTypes: ['footer'],
          getProps: (props, context) => {
            return context.footer;
          }
        }
      ]
    }
  },
  layer: {
    cname: 'SimpleLayer',
    componentType: 'hc',
    components: [
      {
        cname: 'Archive',
        componentType: 'hc',
        hoc: {
          cname: 'Card',
          componentType: 'antd',
          props: {
            title: '广告主登录',
            style: {
              margin: '100px auto',
              width: 400
            }
          }
        },
        contextTypes: contextTypes,
        getProps: (props, context) => {
          const Button = context.layer.findComponent('Button', 'antd');
          return {
            formItemLayout: {
              required: false
            },
            onSubmit: () => {
              // 登录并跳转
            },
            cols: 1,
            readonly: false,
            options: getAccount(props, context, 'login'),
            buttons: [
              (<Button key="login" type="primary" style={{width: '100%'}} htmlType="submit">登录</Button>),
              (<div key="extra" style={{width: '100%', textAlign: 'right'}}><a href="javascript:;" onClick={() => {
                context.app.push('/register');
              }}>注册</a></div>)
            ]
          };
        }
      }
    ]
  }
};
