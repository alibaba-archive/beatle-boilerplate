import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.less';

import layerConfig from './layerConfig';

export default class Login extends React.PureComponent {
  static routeOptions =  {
    hide: true,
    isolated: true,
    title: '登录'
  };

  static contextTypes = {
    layer: PropTypes.object
  }

  render() {
    return (<div className={styles.container}>
      {this.context.layer.render(layerConfig)}
    </div>);
  }
}
