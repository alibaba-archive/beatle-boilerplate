import React from 'react';
import PropTypes from 'prop-types';
import BaseContainer from '../base';

export default class Home extends React.PureComponent {
  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    route: PropTypes.object
  }

  static routeOptions = {
    title: '首页',
    value: 1
  }

  render() {
    return (
      <BaseContainer match={this.props.match} history={this.props.history} noSider={true} parentRoute={this.props.route}>
        <div>Hello World</div>
      </BaseContainer>
    );
  }
}
