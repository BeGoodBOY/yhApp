const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const UglifyPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  //部署相对路径
  // publicPath: './',
  //生产环境map
  productionSourceMap: false,
  css: {
    //默认为false，设置为true影响构建速度
    sourceMap: false
  },
  devServer: {
    proxy: {
      '/handleTrans.cdo': {
        target: 'http://app.zhiyunyi.net',//目标地址
        ws: true, //// 是否启用websockets
        changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        // pathRewrite: { '^/api': '/' }    //这里重写路径
      }
    },
    // https: true
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.mode = 'production'
      // 将每个依赖包打包成单独的js文件
      let optimization = {
        minimizer: [new UglifyPlugin({
          uglifyOptions: {
            warnings: false,
            compress: {
              drop_console: true, // console
              drop_debugger: false,
              pure_funcs: ['console.log'] // 移除console
            }
          }
        })],
      }
      Object.assign(config, {
        optimization
      }),
      config.plugins = [
        ...config.plugins,
        new CompressionWebpackPlugin({
          //[file] 会被替换成原始资源。[path] 会被替换成原始资源的路径， [query] 会被替换成查询字符串。默认值是 "[path].gz[query]"。
        filename: '[path].gz[query]', // 提示compression-webpack-plugin@3.0.0的话asset改为filename
        //可以是 function(buf, callback) 或者字符串。对于字符串来说依照 zlib 的算法(或者 zopfli 的算法)。默认值是 "gzip"。
        algorithm: 'gzip',
        //所有匹配该正则的资源都会被处理。默认值是全部资源。
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        //只有大小大于该值的资源会被处理。单位是 bytes。默认值是 0。
        threshold: 10240,
        //只有压缩率小于这个值的资源才会被处理。默认值是 0.8。
        minRatio: 0.8
        })
      ]
    } else {
      // 为开发环境修改配置...
      config.mode = 'development'
    }
  },
  chainWebpack: config => {
    config
      .plugin('webpack-bundle-analyzer')
      .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
  }
};
