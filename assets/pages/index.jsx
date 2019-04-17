import React from 'react';
import PropTypes from 'prop-types';
import {Skeleton} from 'antd';
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
  }

  render() {
    return this.props.children || (<Skeleton />);
  }
}
