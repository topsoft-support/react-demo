/*
 * webpack.dev.conf.js
 * @version 1.0.0
 * @date 2020-02-19
 * @author DoubleZ
 */
const path = require('path');
const merge = require('webpack-merge');//合并配置插件
const baseWebpackConfig = require('./webpack.base.conf.js');//引入基础配置
const webpack = require('webpack');//webpack
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PUBLIC_PATH = "/";

/*
 * 热部署插件
 */
const hotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin();

/*
 * html插件
 */
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.resolve(__dirname, './public/index.html'),
    favicon: path.resolve(__dirname, './public/favicon.ico'),
    filename: 'index.html',
    hash: true,
    title: "topsoft-web-react",
    server: "http://localhost:8080/app/",
    base: PUBLIC_PATH
});


module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
        publicPath: PUBLIC_PATH,
    },
    plugins: [
        htmlWebpackPlugin,
        hotModuleReplacementPlugin
    ],
    devServer: {//开发模式服务器配置
        port: '9000',
        host: 'localhost',
        contentBase: path.join(__dirname, "/dist"), //网站的根目录为 根目录/dist
        compress: false, //压缩
        historyApiFallback: true,
        hot: true, //开启热更新
        https: false,
        noInfo: true,
        open: true,
        index: '/index.html',
        inline: true, // 默认为true, 意思是，在打包时会注入一段代码到最后的js文件中，用来监视页面的改动而自动刷新页面,当为false时，网页自动刷新的模式是iframe，也就是将模板页放在一个frame中
    }
});