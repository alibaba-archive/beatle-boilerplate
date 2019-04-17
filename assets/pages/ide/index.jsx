import React from 'react';
import PropTypes from 'prop-types';

import BaseContainer from '../base';

const iconPaths = {
  dataMapping: (<path d="M71.059555 326.396686h901.501812v-159.088555a26.514759 26.514759 0 0 0-26.514759-26.51476h-848.472294a26.514759 26.514759 0 0 0-26.514759 26.51476z m0 53.029518v477.265665a26.514759 26.514759 0 0 0 26.514759 26.51476h848.472294a26.514759 26.514759 0 0 0 26.514759-26.51476v-477.265665z m26.514759-291.662351h848.472294a79.544278 79.544278 0 0 1 79.544278 79.544278v689.383738a79.544278 79.544278 0 0 1-79.544278 79.544278h-848.472294a79.544278 79.544278 0 0 1-79.544278-79.544278v-689.383738a79.544278 79.544278 0 0 1 79.544278-79.544278z m186.929052 534.537545l92.801657 59.923356a26.514759 26.514759 0 1 1-28.901087 44.544795l-127.005697-82.195753a26.514759 26.514759 0 0 1 0-44.544795l127.005697-82.195754a26.514759 26.514759 0 1 1 28.901087 44.544795z m363.782496 59.923356L742.413257 622.301398l-92.801657-59.923356a26.514759 26.514759 0 1 1 28.63594-44.544795l127.270844 82.195754a26.514759 26.514759 0 0 1 0 44.544795l-127.270844 82.195753a26.514759 26.514759 0 1 1-28.63594-44.544795z m-124.619368-180.035215a26.514759 26.514759 0 0 1 49.317452 19.620922l-88.029 222.193682a26.514759 26.514759 0 0 1-34.20404 15.113413 26.514759 26.514759 0 0 1-15.113412-34.469187zM163.861212 193.82289a39.772139 39.772139 0 1 1-39.772139 39.772138 39.772139 39.772139 0 0 1 39.772139-39.772138z m132.573796 0a39.772139 39.772139 0 1 1-39.772139 39.772138 39.772139 39.772139 0 0 1 39.772139-39.772138z m132.573796 0a39.772139 39.772139 0 1 1-39.772139 39.772138 39.772139 39.772139 0 0 1 39.772139-39.772138z" />),
  inference: (<path d="M9.015018 212.118074A26.514759 26.514759 0 0 1 63.635422 212.118074v596.582081a26.514759 26.514759 0 0 0 26.514759 26.51476h874.191611a26.514759 26.514759 0 1 1 0 54.355256H90.945624A81.665458 81.665458 0 0 1 9.015018 808.700155zM212.118074 619.119627a26.514759 26.514759 0 0 1-39.241844 9.280166 30.757121 30.757121 0 0 1-8.749871-41.363024l96.248576-159.088556a28.105645 28.105645 0 0 1 43.749353-5.833247l106.059037 103.407561 165.717245-373.858104a27.840497 27.840497 0 0 1 50.112895-3.181772l201.512169 344.69187L981.04609 303.593993a26.514759 26.514759 0 0 1 40.037286-3.712067 31.287416 31.287416 0 0 1 3.446919 42.158468l-178.974624 221.398239a27.840497 27.840497 0 0 1-46.135681-3.712066L605.066805 226.966339l-159.088555 360.865872a26.514759 26.514759 0 0 1-45.075091 9.280166l-109.240808-106.059037z" />),
  ontology: (<path d="M71.059555 326.396686h901.501812v-159.088555a26.514759 26.514759 0 0 0-26.514759-26.51476h-848.472294a26.514759 26.514759 0 0 0-26.514759 26.51476z m0 53.029518v477.265665a26.514759 26.514759 0 0 0 26.514759 26.51476h848.472294a26.514759 26.514759 0 0 0 26.514759-26.51476v-477.265665z m26.514759-291.662351h848.472294a79.544278 79.544278 0 0 1 79.544278 79.544278v689.383738a79.544278 79.544278 0 0 1-79.544278 79.544278h-848.472294a79.544278 79.544278 0 0 1-79.544278-79.544278v-689.383738a79.544278 79.544278 0 0 1 79.544278-79.544278z m186.929052 534.537545l92.801657 59.923356a26.514759 26.514759 0 1 1-28.901087 44.544795l-127.005697-82.195753a26.514759 26.514759 0 0 1 0-44.544795l127.005697-82.195754a26.514759 26.514759 0 1 1 28.901087 44.544795z m363.782496 59.923356L742.413257 622.301398l-92.801657-59.923356a26.514759 26.514759 0 1 1 28.63594-44.544795l127.270844 82.195754a26.514759 26.514759 0 0 1 0 44.544795l-127.270844 82.195753a26.514759 26.514759 0 1 1-28.63594-44.544795z m-124.619368-180.035215a26.514759 26.514759 0 0 1 49.317452 19.620922l-88.029 222.193682a26.514759 26.514759 0 0 1-34.20404 15.113413 26.514759 26.514759 0 0 1-15.113412-34.469187zM163.861212 193.82289a39.772139 39.772139 0 1 1-39.772139 39.772138 39.772139 39.772139 0 0 1 39.772139-39.772138z m132.573796 0a39.772139 39.772139 0 1 1-39.772139 39.772138 39.772139 39.772139 0 0 1 39.772139-39.772138z m132.573796 0a39.772139 39.772139 0 1 1-39.772139 39.772138 39.772139 39.772139 0 0 1 39.772139-39.772138z" />),
  search: (<path d="M9.015018 212.118074A26.514759 26.514759 0 0 1 63.635422 212.118074v596.582081a26.514759 26.514759 0 0 0 26.514759 26.51476h874.191611a26.514759 26.514759 0 1 1 0 54.355256H90.945624A81.665458 81.665458 0 0 1 9.015018 808.700155zM212.118074 619.119627a26.514759 26.514759 0 0 1-39.241844 9.280166 30.757121 30.757121 0 0 1-8.749871-41.363024l96.248576-159.088556a28.105645 28.105645 0 0 1 43.749353-5.833247l106.059037 103.407561 165.717245-373.858104a27.840497 27.840497 0 0 1 50.112895-3.181772l201.512169 344.69187L981.04609 303.593993a26.514759 26.514759 0 0 1 40.037286-3.712067 31.287416 31.287416 0 0 1 3.446919 42.158468l-178.974624 221.398239a27.840497 27.840497 0 0 1-46.135681-3.712066L605.066805 226.966339l-159.088555 360.865872a26.514759 26.514759 0 0 1-45.075091 9.280166l-109.240808-106.059037z" />),
};
export default class IDE extends React.PureComponent {
  static routeOptions = {
    title: '知识图谱开发'
  }

  static propTypes = {
    children: PropTypes.any,
    route: PropTypes.object
  }

  render() {
    const containerProps = {
      parentRoute: this.props.route,
      getRoutes: (app) => {
        const routes = app.route('ide').routes || [];
        return routes.map(route => {
          return Object.assign({}, route, {
            title: (<span className="g-sider-item" ><svg viewBox="0 0 1024 1024">{iconPaths[route.name]}</svg><span>{route.title}</span></span>)
          });
        });
      }
    };
    return (<BaseContainer {...containerProps}>{this.props.children}</BaseContainer>);
  }
}
