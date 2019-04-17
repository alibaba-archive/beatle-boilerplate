import PropTypes from 'prop-types';

export const contextTypes = {
  app: PropTypes.object,
  layer: PropTypes.object,
  l20n: PropTypes.object,
  hocCreator: PropTypes.object,
  cascader: PropTypes.object,
  routeHelper: PropTypes.object,
  modaler: PropTypes.object,
};

export const contexts = Object.keys(contextTypes);
