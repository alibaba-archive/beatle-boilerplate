import React from 'react';
import PropTypes from 'prop-types';
import {Skeleton} from 'antd';

import Locale from '../biz/locales';
import styles from './index.module.less';
import Home from './home';

export default class Application extends React.PureComponent {
  static routeOptions = {
    indexRoute: {
      path: '/home',
      component: Home
    }
  }

  static propTypes = {
    children: PropTypes.any
  }

  constructor(props) {
    super(props);
    this.state = {
      lang: null
    };
  }

  render() {
    return (<div className={styles.container}>
      <Locale lang={this.state.lang}>
        {this.props.children || (<Skeleton />)}
      </Locale>
    </div>);
  }
}
