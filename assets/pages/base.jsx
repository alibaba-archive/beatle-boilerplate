import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import l20n from 'hc-l20n';
import Beatle from 'beatle';
import {withRouter} from 'react-router-dom';
import {Layer, LoadingBar, getLayout, BreadCrumb, Cascader, HocCreator, RouteHelper, Resizer} from 'hc-materials';
import getHeader from '../common/utils/getHeader';
import getFooter from '../common/utils/getFooter';

class BaseContainer extends React.PureComponent {
  static contextTypes = {
    app: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.any,
    location: PropTypes.any,
    orderKeys: PropTypes.array,
    appRoutes: PropTypes.array,
    subMenus: PropTypes.object,
    getRoutes: PropTypes.func,
    route: PropTypes.object,
    parentRoute: PropTypes.object,
    noSider: PropTypes.bool,

    history: PropTypes.object,
    match: PropTypes.object,
  }

  static defaultProps = {
    orderKeys: [],
    appRoutes: [],
    subMenus: {},
    getRoutes: () => {}
  }

  static childContextTypes = {};

  constructor(props, context) {
    super(props, context);

    const {orderKeys, subMenus, getRoutes, children} = props;

    this._brand = {
      title: '工程模板',
      logo: 'https://img.alicdn.com/tfs/TB14dINRpXXXXcyXXXXXXXXXXXX-64-64.png?t=1554043355305'
    };

    this._layoutOption = {
      components: {
        Link: Beatle.Link,
        Sider: props.noSider ? false : {
          props: {
            orderKeys: orderKeys,
            getResolvePath: Beatle.getResolvePath,
            routes: getRoutes(context.app) || context.app.getRoutes()[0].routes || [],
            category: subMenus,
            width: 230,
            collapsedWidth: 60,
            menu: {
              inlineIndent: 15
            },
            brand: this._brand
          },
          getProps: () => {
            return {
              route: this.getRoute()
            };
          }
        },
        Header: {
          getProps: () => this._childContext && this._childContext.header
        }
      }
    };

    this._childContext = {
      l20n: l20n,
      navs: children ? BreadCrumb.parse(children.props.route, subMenus) : [],
      brand: this._brand,
      category: subMenus,
      layer: new Layer(context),
      routeHelper: new RouteHelper({history: props.history}),
      resizer: new Resizer(),
      cascader: new Cascader(),
      hocCreator: new HocCreator(),
    };
    this._childContext.header = getHeader(this._childContext, props.noSider ? this._brand : null, props.parentRoute);
    this._childContext.footer = getFooter(this._childContext);
    Object.keys(this._childContext).forEach(key => {
      if (Array.isArray(this._childContext[key])) {
        BaseContainer.childContextTypes[key] = PropTypes.array;
      } else {
        BaseContainer.childContextTypes[key] = PropTypes.object;
      }
    });
  }

  getChildContext() {
    this._childContext.navs = this.props.children ? BreadCrumb.parse(this.getRoute(), this.props.subMenus) : [];

    return this._childContext;
  }

  componentDidMount() {
    this.setRouteTitle();
  }

  componentDidUpdate() {
    this.setRouteTitle();
  }

  setRouteTitle() {
    const route = this.getRoute();
    let title = this._brand.title;
    if (route) {
      title = route.title + ' - ' + title;
    }
    document.title = title;
  }

  getRoute() {
    const location = this.props.location;
    if (this._route && this._route.path === location.pathname) {
      return this._route;
    }
    if (!this.props.match.isExact) {
      if (this.props.children) {
        const cProps = this.props.children.props;
        if (Array.isArray(cProps.children)) {
          const child = cProps.children.find(item => item.props.path === location.pathname);
          this._route = child.props.route;
        } else {
          this._route = cProps.children && cProps.children.props.route;
        }
      }
    }
    return this._route;
  }

  render() {
    const viewContent = this.props.children;
    const route = this.getRoute();
    const routeOptions = route && route.component && route.component.routeOptions || {};
    return (
      <Fragment>
        <LoadingBar
          style={{position: 'fixed', height: 2, top: 48, zIndex: 999, backgroundColor: '#20C1EA'}}
          updateTime={100}
          maxProgress={95}
          progressIncrease={10}
        />
        {routeOptions.isolated ? viewContent : getLayout({
          layoutOption: this._layoutOption,
          layout: 'ConsoleLayout',
          route: route
        }, viewContent)}
      </Fragment>
    );
  }
}

export default withRouter(BaseContainer);
