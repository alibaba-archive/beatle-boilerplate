import React from 'react';
import PropTypes from 'prop-types';

import BaseContainer from '../base';

export default class Analysis extends React.PureComponent {
  static routeOptions = {
    title: '分析服务'
  }

  static propTypes = {
    children: PropTypes.any,
    route: PropTypes.object
  }

  render() {
    return (<BaseContainer parentRoute={this.props.route}>{this.props.children}</BaseContainer>);
  }
}
