import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import l20n from 'hc-l20n';
import Beatle from 'beatle';
import {Layer, LoadingBar, getLayout, BreadCrumb, Cascader, HocCreator, RouteHelper, Resizer, Modaler} from 'hc-materials';
import Locale from '../biz/locales';
import getHeader from '../common/utils/getHeader';
import getFooter from '../common/utils/getFooter';

export default class BaseContainer extends React.PureComponent {
  static contextTypes = {
    app: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.any,
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

    this.state = {
      lang: null
    };
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
          getProps: () => {
            if (this._childContext.header === null) {
              this._childContext.header = getHeader(this._childContext, props.noSider ? this._brand : null, props.parentRoute);
            }
            return this._childContext.header;
          }
        }
      }
    };
    const route = this.getRoute();
    const routeOptions = route && route.component && route.component.routeOptions || {};

    this._viewContent = routeOptions.isolated ? props.children : getLayout({
      layoutOption: this._layoutOption,
      layout: 'ConsoleLayout',
      route: route
    }, props.children);

    const modaler = new Modaler(context);
    this._childContext = {
      app: context.app,
      l20n: l20n,
      navs: children ? BreadCrumb.parse(children.props.route, subMenus) : [],
      brand: this._brand,
      category: subMenus,
      layer: new Layer(context),
      routeHelper: new RouteHelper({history: props.history}, {kgId: 1}),
      resizer: new Resizer(),
      cascader: new Cascader(),
      hocCreator: new HocCreator({modaler: modaler}),
      modaler: modaler,
      header: null
    };
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
    const location = this.props.history.location;
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
    return (
      <Locale lang={this.state.lang}>
        <Fragment>
          <LoadingBar
            style={{position: 'fixed', height: 2, top: 48, zIndex: 999, backgroundColor: '#20C1EA'}}
            updateTime={100}
            maxProgress={95}
            progressIncrease={10}
          />
          {this._viewContent}
        </Fragment>
      </Locale>
    );
  }
}
