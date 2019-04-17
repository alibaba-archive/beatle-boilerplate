import React from 'react';
import PropTypes from 'prop-types';
import BaseContainer from '../base';

export default class Home extends React.PureComponent {
  static routeOptions = {
    title: '首页'
  }

  static propTypes = {
    route: PropTypes.object
  }

  render() {
    return (<BaseContainer noSider={true} parentRoute={this.props.route}>Hello World</BaseContainer>);
  }
}
