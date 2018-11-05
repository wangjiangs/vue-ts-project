"use strict"
const path = require("path")
const utils = require("./utils")
const webpack = require("webpack")
const config = require("../config")
const merge = require("webpack-merge")
const baseWebpackConfig = require("./webpack.base.conf")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const cleanWebpackPlugin = require("clean-webpack-plugin")

const env = require("../config/prod.env")

const webpackConfig = merge(baseWebpackConfig, {
    mode:"production",
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: config.build.cssExtract,
            usePostCSS: true
        }),
    },
    devtool: config.build.productionSourceMap? config.build.devtool : false,
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath("js/[name].[chunkhash].js"),
        chunkFilename: utils.assetsPath("js/[id].[chunkhash].js")
    },
    /**
     * 公共代码拆分
     */
    optimization:{
        splitChunks:{
            chunks: "all",
            // cacheGroups: {
            //     vendors: {
            //         test: /[\\/]node_modules[\\/]/,
            //         priority:-10,

            //         name:"vendors"
            //     }
            // }
            // minSize: 30000,
            // minChunks: 1,
            // maxAsyncRequests: 5,
            // maxInitialRequests: 3,
            // automaticNameDelimiter: '~',
            // name: true,
            // cacheGroups: {
            //     vendors: {
            //         test: /[\\/]node_modules[\\/]/,
            //         priority: -10
            //     },
            // default: {
            //         minChunks: 2,
            //         priority: -20,
            //         reuseExistingChunk: true
            //     }
            // }
        }
    }, 
    plugins: [
        new webpack.DefinePlugin({
            uglifyOptions: {
                compress: {
                    warnings: false
                }
            },
            sourceMap: config.build.productionSourceMap,
            parallel: true
        
        }),
        new OptimizeCSSPlugin({
            cssProcessorOptions: config.build.productionSourceMap? {safe: true, map: {inline: false}}: {safe: true} 
        }),
        new HtmlWebpackPlugin({
            filename: config.build.index,
            template: "index.html",
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: "dependency"
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        /**
         * 复制静态目录到dist
         */
        new CopyWebpackPlugin([{
            from:path.resolve(__dirname, "../static/"),
            to: config.build.assetsSubDirectory,
            ignore: [".*"]
        }]),
        /**
         * 清理dist目录
         */
        new cleanWebpackPlugin(["dist"], {root:path.resolve(__dirname, "../")})
    ]
})
if(config.build.productionGzip){
    /**
     * 对js 和css 进行gzip压缩
     */
    const CompressionWebpackPlugin = require("compression-webpack-plugin")
    webpackConfig.plugins.push(new CompressionWebpackPlugin({
        test:/\.(js|css)$/,
        threshold: 20000
    }))
}
if(config.build.bundleAnalyzerReport){

    const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}
if(config.build.cssExtract){
    const ExtractTextPlugin = require("extract-text-webpack-plugin")
    webpackConfig.plugins.push(new ExtractTextPlugin({
        filename: utils.assetsPath("css/[name].[hash].css"),
        allChunks: true
    }))
}
module.exports = webpackConfig