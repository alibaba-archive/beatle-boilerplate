# 集成环境

### quick start

1. 安装nodejs、npm、yarn
> npm install -g yarn

2. 启动，默认端口8080

> yarn start

3. 打包，文件放到build目录

> yarn build


### 项目结构

```javascript
Project
├── assets/
|     ├── biz/                业务代码
|     |    ├── locales/         国际化
|     |    ├── models/          数据模型
|     |    ├── resources/       接口资源
|     |    ├── schemas/         数据结构
|     |    └── themes/          主题
|     ├── common/             通用
|     |    ├── components/      组件
|     |    ├── services/        服务
|     |    └── utils/           工具类
|     ├── pages/              页面
|     ├── app.jsx             应用入口
|     ├── app.less
|     └── staticPublicPath.js 按需加载路劲
├── build/
|     ├── x.x.x/              按版本打包，版本号由pakcage.json#version来定
|     |    ├── assets/        静态文件（图片、字体等）
|     |    ├── locale/        应用语言包文件
|     |    └── .js|.css       其他打包文件
|     └── v.js                监测版本更新文件
├── view/                     页面入口
|     ├── index.html
|     └── favicon.ico
├── babel.config.js
├── rule.config.js
├── webpack.common.js
├── webpack.development.js
├── webpack.env.js
└── webpack.production.js
```

### 前期准备

1. react - 16.x
2. react-router 5.x
3. beatle
4. antd


### css module

1. 根据xxx.jsx文件来命名xxx.module.less
2. 样式名定义按照jsx中引用的位置来决定，驼峰命名法，如果是内置组件则首字母小写，非内置组件则首字母大写
3. 针对内联样式名，可以指定:global来声明样式
4. BEM规范 - http://getbem.com/
5. 内联样式 - https://speakerdeck.com/vjeux/react-css-in-js
6. css-module - https://github.com/css-modules/css-modules


### antd > 3.9

1. iconfont不依赖cdn，使用svg绘图
2. 来自iconfont.cn的图片，可以通过Icon.createFromIconfontCN来构建

### React v15.x to v16.x

#### 特性

1. Accessibility
2. Code-Splitting
  * `Babel import(...).then(...)`
  * `React.lazy(() => import(...))` | `React.lazy(promise)`
3. Context
  * `contextType = React.createContext(value)`
  * `contextType.Provider#value`
  * `contextType.Consumer > value | NestedComponent`
4. Error boundaries
  * `static getDerivedStateFromError(error)`
  * `componentDidCatch(error, info)`
5. Forwarding Refs
  * `React.forwardRef(NestedComponent)`
6. Fragments
7. Hooks
  * NestedComponent useState(initValue) => [state, setState)、useEffect、useContext
  * useReducer(reducer, initialArg, init) => [state, dispatch]、useCallback、useMemo、useRef() => refInstance、useImperativeHandle、useLayoutEffect、useDebugValue

#### 细节
1. Component#render
  * multi
  * Literal
2. React.createPortal
3. Break changes
  * error boundaries - componentDidCatch
  * setState null值不触发，在render调用也可以触发，不会等组件加载完成
4. componentDidUpdate只有prevProps，没有prevContext
5. lifecycles
  * __componentWillMount__
  * __componentWillReceiveProps__
  * __componentWillUpdate__
  * static getDerivedStateFromProps
  * shouldComponentUpdate
  * componentDidMount
  * getSnapshotBeforeUpdate
  * componentDidUpdate
  * componentWillUnmount

### Babel7.x

1. export default 会带上default关键字，加上babel.add-module-exports来解决
2. export * 需要改为 export {xxx}

### react-router5.x

1. 下线config配置动态路由
2. 蜂窝状路由配置通过Switch来组装
3. getComponent下线
4. indexRoute下线


### 参考资料
1. react-router5.x - https://reacttraining.com/react-router/web/api/Redirect
2. @babel7.x - https://babeljs.io/docs/en/babel-plugin-transform-modules-commonjs
3. react16.x - https://reactjs.org/docs/code-splitting.html