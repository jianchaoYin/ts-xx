const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')
const { TypedCssModulesPlugin } = require('typed-css-modules-webpack-plugin')

const { compilerHooks } = require('./custom-plugins')
const constants = require('./constants')
const config = require('./config')
const { assetsPath } = require('./utils')
const env = require('./env.json')

const oriEnv = env[constants.APP_ENV]
Object.assign(oriEnv, {
    APP_ENV: constants.APP_ENV
})
// webpack process.env
const defineEnv = {}
for (const key in oriEnv) {
    defineEnv[`process.env.${key}`] = JSON.stringify(oriEnv[key])
}

const basePlugins = [
    new MomentLocalesPlugin({
        //针对moment.js,antd需要,故引入
        localesToKeep: ['es-us', 'zh-cn']
    }),
    new webpack.DefinePlugin(defineEnv), //定义全局变量,将
    new TypedCssModulesPlugin({
        globPattern: 'src/!(styles)/**/*.scss'
    })
]

const devPlugins = [
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'build/tpl/index.html',
        inject: true
    }),
    new CaseSensitivePathsPlugin(), //用于区分路径大小写的插件,多用于osx
    ...compilerHooks
]

const prodPlugins = [
    new webpack.WatchIgnorePlugin([/css\.d\.ts$/]),
    new HtmlWebpackPlugin({
        filename: config.index,
        template: 'build/tpl/index.html',
        inject: true,
        minify: {
            //丑陋的压缩html
            removeComments: true, //移除注释
            collapseWhitespace: true, //移除空格
            removeAttributeQuotes: true //没有引号
            // more options:
            // https://github.com/kangax/html-minifier#options-quick-reference
        },
        // necessary to consistently work with multiple chunks via CommonsChunkPlugin
        chunksSortMode: 'dependency' //规定排序规则,不太理解
    }),
    new MiniCssExtractPlugin({
        //插件用处:将css形成的js文件打包成独立的css文件
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: assetsPath('css/[name].[contenthash].css'), //由于js文件和css文件分离也共用一个hash值,所以使用contentHash,css文件最好使用contentHash
        chunkFilename: assetsPath('css/[name].[id].[contenthash].css')
    }),
    //workboxplugin可以看成是谷歌创立的pwa框架,用创建server-worker文件
    new WorkboxPlugin.GenerateSW({
        cacheId: 'ts-react-webpack', //设置前缀
        clientsClaim: true, //service-worker被激活后立即获取页面控制
        skipWaiting: true, //强制将等待种的service-worker激活
        offlineGoogleAnalytics: false, //离线的同事也记录ga数据,有网之后在进行上报
        // do not use google cdn
        importWorkboxFrom: 'local',
        // precache ignore
        exclude: [/index\.html$/, /\.map$/],
        // dynamic update
        runtimeCaching: [
            {
                // match html
                urlPattern: config.pagePattern,
                handler: 'NetworkFirst'
            },
            {
                // match static resource
                urlPattern: config.assetsPattern,
                handler: 'StaleWhileRevalidate'
            }
        ]
    })
]

if (config.bundleAnalyzerReport) {
    const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
    prodPlugins.push(new BundleAnalyzerPlugin())
}

module.exports = basePlugins.concat(constants.APP_ENV === 'dev' ? devPlugins : prodPlugins)
