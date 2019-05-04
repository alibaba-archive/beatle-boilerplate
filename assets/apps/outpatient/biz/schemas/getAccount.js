import {getSchema} from 'emr-app-common';
export default (props, context, filterType) => {
  const schema = [
    {
      title: 'ID',
      dataIndex: 'id',
      showTypes: ['column']
    },
    {
      title: '账号名称',
      dataIndex: 'name',
      showTypes: ['field', 'register', 'login'],
      props: {
        placeholder: '请输入账号名称'
      },
      decorator: {
        rules: [{
          required: true, message: '账号名称不能为空!',
        }],
      },
    },
    {
      title: '账号密码',
      dataIndex: 'password',
      showTypes: ['register', 'login'],
      private: true,
      getProps: (props) => {
        context.layer.state.form = props.form;
        return {
          type: 'password',
          placeholder: '请输入账号密码',
          onBlur: (e) => {
            context.layer.state.confirmDirty = context.layer.state.confirmDirty || !!e.target.value;
          }
        };
      },
      decorator: {
        rules: [{
          required: true, message: '账号密码不能为空！', min: 6,
        }, {
          validator: (rule, value, callback) => {
            if (value && context.layer.state.confirmDirty) {
              context.layer.state.form.validateFields(['confirmPassword'], {force: true});
            }
            callback();
          },
        }]
      }
    },
    {
      title: '确认密码',
      dataIndex: 'confirmPassword',
      showTypes: ['register'],
      private: true,
      props: {
        type: 'password',
        placeholder: '请输入账号密码'
      },
      decorator: {
        rules: [{
          required: true, message: '确认密码不能为空!', min: 6
        }, {
          validator: (rule, value, callback) => {
            if (value && value !== context.layer.state.form.getFieldValue('password')) {
              callback('确认密码不正确！');
            } else {
              callback();
            }
          }
        }],
      }
    },
    {
      title: context.l20n.$m('lang.account.comment', '备注'),
      dataIndex: 'comment',
      showTypes: []
    },
    {
      title: context.l20n.$m('lang.account.create_time', '创建时间'),
      dataIndex: 'gmtCreate',
      showTypes: ['column']
    },
    {
      title: context.l20n.$m('lang.account.modify_time', '更新时间'),
      dataIndex: 'gmtModify',
      showTypes: ['column']
    }
  ];

  return getSchema(schema, filterType);
};
