"use strict"

const path = require("path")

module.exports = {
    dev: {
        //paths
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable:{},
         //dev server settings
         host: 'localhost',
         port: 8080,
         autoOpenBrowser: false,
         errorOverloay: true,
         notifyOnErrors: true,
         poll: false,

         /**
          * Source Maps
          */
         devtool:'cheap-module-eval-source-map',

         cacheBusting: true,
         
         cssSourceMap: true
    },
     build:{
         index: path.resolve(__dirname, "../dist/index.html"),

         //paths
         assetsRoot: path.resolve(__dirname, '../dist'),
         assetsSubDirectory: 'static',
         assetsPublicPath: '/',

         /**
          * Source Maps
          */
          cssExtract: false,
          productionSourceMap: true,

          devtool:'#source-map',
          productionGzip: true, //需要 npm install -D compression-webpack-plugin
          productionGzipExtensions: ['js', 'css'],

          bundleAnalyzerReport: process.env.npm_config_report

     }
}