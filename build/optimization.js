const constants = require('./constants')
const config = require('./config')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports =
    constants.APP_ENV === 'dev'
        ? {}
        : {
              runtimeChunk: {
                  //默认为false,定义name后生成此name的manifest文件
                  name: 'manifest'
              },
              splitChunks: {
                  //采用不同的策略分割打包的bundle
                  cacheGroups: {
                      default: false,
                      buildup: {
                          //打包node_module下的文件
                          chunks: 'all',
                          test: /[\\/]node_modules[\\/]/
                      },
                      vendor: {
                          name: 'vendor', //打包后的名称为vendor,打包react等一系列文件
                          test: /[\\/]node_modules[\\/](react|react-dom|lodash|moment|immutable|mobx|mobx-react|axios)[\\/]/,
                          chunks: 'all',
                          priority: 10
                      }
                  }
              },
              minimizer: [
                  //
                  new TerserPlugin({
                      //用于缩小javasciprt体积
                      cache: true, //是否启用文件缓存
                      parallel: true, //使用多进程提高构建速度
                      sourceMap: Boolean(config.sourceMap) //是否将错误返回到模块,会影响编译速度
                  }),
                  new OptimizeCSSAssetsPlugin({
                      //用于优化或压缩css资源
                      cssProcessor: require('cssnano'), //用于优化和压缩css的处理器,默认为cssnano
                      cssProcessorOptions: {
                          reduceIdents: false,
                          autoprefixer: false
                      }
                  })
              ]
          }
