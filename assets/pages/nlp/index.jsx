import React from 'react';
import PropTypes from 'prop-types';

import BaseContainer from '../base';

export default class NLP extends React.PureComponent {
  static routeOptions = {
    title: '实体关系抽取'
  }

  static propTypes = {
    children: PropTypes.any,
    route: PropTypes.object
  }

  render() {
    return (<BaseContainer parentRoute={this.props.route}>{this.props.children}</BaseContainer>);
  }
}
