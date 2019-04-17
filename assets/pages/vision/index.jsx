import React from 'react';
import PropTypes from 'prop-types';

import BaseContainer from '../base';

export default class Vision extends React.PureComponent {
  static routeOptions = {
    title: '可视化分析'
  }

  static propTypes = {
    children: PropTypes.any,
    route: PropTypes.object
  }

  render() {
    return (<BaseContainer parentRoute={this.props.route}>{this.props.children}</BaseContainer>);
  }
}
