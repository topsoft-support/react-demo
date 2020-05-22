/*
 * webpack.base.conf.js
 * @version 1.0.0
 * @date 2020-02-19
 * @author DoubleZ
 */
const path = require('path');//引入node 的path插件
const SRC_PATH = path.resolve(__dirname, './src');//定义源码目录
const STATIC_PATH = path.resolve(__dirname, 'public');
const DIST_PATH = path.resolve(__dirname, './dist');//定义打包目的目录
const {CleanWebpackPlugin} = require('clean-webpack-plugin');//清理插件
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {getThemeVariables} = require('antd/dist/theme');

/*
 * 样式处理插件
 */
let extractTextWebpackPlugin = new ExtractTextWebpackPlugin('css/[name].css');
let cssLoader = extractTextWebpackPlugin.extract({fallback: "style-loader", publicPath: "../", use: ["css-loader"]});
let lessLoader = [{
    loader: 'style-loader',
}, {
    loader: 'css-loader', // translates CSS into CommonJS
}, {
    loader: 'less-loader', // compiles Less to CSS
    options: {
        modifyVars: getThemeVariables({
            // dark: true, // 开启暗黑模式
            compact: true, // 开启紧凑模式
        }),
        javascriptEnabled: true,
    },
}];

let sassLoader = extractTextWebpackPlugin.extract({fallback: 'style-loader', publicPath: "../", use: ["css-loader", "sass-loader"]});


/*
 * 静态资源拷贝
 */
const copyWebpackPlugin = new CopyWebpackPlugin([
    {from: STATIC_PATH, to: DIST_PATH, force: true, dot: true}
]);

module.exports = {
    entry: {
        "polyfill": "core-js",
        "app": path.resolve(SRC_PATH, "index.js")
    },
    output: {
        path: DIST_PATH,
        chunkFilename: "js/[name].js",//optimization 公共代码打包文件名
        filename: "js/[name].js",//入口文件打包文件名
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: "image/[hash:8].[name].[ext]",
                        limit: 8192  //是把小于8192B的文件打成Base64的格式，写入JS
                    }
                }]
            },
            {
                test: /\.(woff|svg|eot|woff2|tff)$/,
                use: 'url-loader',
            },

            {
                test: /\.(js|jsx)$/,
                use: ['babel-loader?cacheDirectory=true'],
                include: [SRC_PATH]
            },
            {
                test: /\.(html)$/,
                use: ['html-loader'],
                include: [SRC_PATH]
            },
            {
                test: /\.css$/,
                use: cssLoader
            },
            {
                test: /\.less$/,
                use: lessLoader,
            },
            {
                test: /\.(sass|scss)/,
                use: sassLoader
            }
        ]
    },
    /*optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    name: 'core',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    reuseExistingChunk: true,
                    chunks: 'all',
                    minSize: 0,
                    minChunks: 1,
                    maxAsyncRequests: 5,
                    maxInitialRequests: 3,
                }
            }
        }
    },*/
    plugins: [
        new CleanWebpackPlugin(),
        copyWebpackPlugin,
        extractTextWebpackPlugin,
    ],
    node: {
        fs: "empty"
    }
};
