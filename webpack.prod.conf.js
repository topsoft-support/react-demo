/*
 * webpack.prod.conf.js
 * @version 1.0.0
 * @date 2020-02-19
 * @author DoubleZ
 */
const path = require('path');
const merge = require('webpack-merge'); //合并配置
const baseWebpackConfig = require('./webpack.base.conf');//引入base配置
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PUBLIC_PATH = "./";

/*
 * html插件
 */
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.resolve(__dirname, './public/index.html'),
    favicon: path.resolve(__dirname, './public/favicon.ico'),
    filename: 'index.html',
    hash: true,
    title: "portal-plugin-main",
    server: PUBLIC_PATH,
    base: "/app/",//根据实际部署路径和路由路径设置
    minify: {
        removeComments: true,
        removeAttributeQuotes: true
    }
});

/*
 *css样式压缩插件
 */
const optimizeCssAssetsPlugin = new OptimizeCssAssetsPlugin({
    assetNameRegExp: /\.css$/,
    cssProcessor: require('cssnano'),
    cssProcessorOptions: {discardComments: {removeAll: true}},
    canPrint: true
});

module.exports = merge(baseWebpackConfig, {
    mode: 'production', //环境配置
    output: {
        publicPath: PUBLIC_PATH,
    },
    plugins: [
        optimizeCssAssetsPlugin,
        htmlWebpackPlugin
    ]
});
