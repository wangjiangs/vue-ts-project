"use strict"
process.env.NODE_ENV = 'production'

const ora = require('ora')
const path = require("path")
const chalk = require("chalk")
const webpack = require("webpack")
const webpackConfig = require("../build/webpack.prod.conf")
const spinner = ora("building for production...")
spinner.start()

const compiler = webpack(webpackConfig)

compiler.run((err, stats) => {
    spinner.stop()
    if(err) throw err
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false, //if you are using ts-loader, setting this to true for display ts errors
        chunks: false,
        chunkModules: false
    }) + "\n\n")

    if(stats.hasErrors()){
        console.log(chalk.red(' Build failed with errors.\n'))
        process.exit(1)
    }
    console.log(chalk.cyan(' Build complete.\n'))
    console.log(chalk.yellow(`
        Tip: built files are meant to be served over an HTTP server.
        Opening index.html over file:// won't work.
    `))
})