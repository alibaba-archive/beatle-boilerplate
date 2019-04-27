module.exports = {
  env: 'development', // 日常模式
  hot: true,          // 热模块更新
  debug: false,       // 打印所有日志
  theme: null,        // 主题皮肤 build.entryDir + theme + '.js'
  appCode: 'global_app_version', // 检测版本
  l20n: false,        // 国际化
  docco: false,       // 文档化
  analysis: false,    // 打包性能分析

  build: {                    // 构建
    version: '0.0.1',         // 版本号
    entryDir: 'assets',       // 源码入口
    destDir: 'build',         // 打包目录
    outputDir: 'build/0.0.1', // 源码打包目录
    publicPath: '/'           // 访问地址
  },

  server: {                   // web服务
    host: 'localhost',        // 访问域名
    port: '8080',             // 访问端口
    https: false,             // 协议是否升级为https
    http2: false              // http2新协议
  },

  autoLoad: {                         // 自动加载
    enabled: false,                   // 是否开启
    specific: true,
    modelPath: 'workspaces', // 自动加载models文件或者目录
    routePath: 'workspaces'  // 自动加载routes文件或者目录
  }
};
