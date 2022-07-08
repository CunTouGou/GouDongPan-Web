const path = require('path')

module.exports = {
  // 选项...
  publicPath: '/',

  // 配置项不懂的地方，请查看 Vue CLI 官方文档 https://cli.vuejs.org/zh/config/#devserver
  devServer: {
    allowedHosts: 'all',
    host: '0.0.0.0',
    port: 8081, //  本地开发环境 - 前端工程启动的端口；
    proxy: {
      '/api': {
        target: 'http://localhost:8080', //  本地开发环境 - 连接后台服务，协议 + IP + 端口
        ws: true, //是否跨域
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  },

  productionSourceMap: false,

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'stylus',
      patterns: []
    }
  },
  configureWebpack: (config) => {
    config.resolve.alias = {
      '@': path.resolve(__dirname, './src'),
      _v: path.resolve(__dirname, './src/views'),
      _c: path.resolve(__dirname, './src/components'),
      _a: path.resolve(__dirname, './src/assets'),
      _r: path.resolve(__dirname, './src/request'),
      _public: path.resolve(__dirname, './public')
    }
  }
}
