const webpack = require('webpack')
const path = require('path')
const WebPackCommonConfig = require('./webpack.common.js')
// const CleanWebpackPlugin = require('clean-webpack-plugin')
const { merge } = require('webpack-merge');

module.exports = merge(WebPackCommonConfig, {
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'), //告诉服务器从哪个目录中提供内容
        compress: true, //启用 gzip 压缩
        hot: true //启用热替换模块  必须配置 webpack.HotModuleReplacementPlugin
    },
    plugins: [
        // new CleanWebpackPlugin(['dist']), //清理文件夹
        new webpack.HotModuleReplacementPlugin(), //启用热替换模块
        new webpack.NamedModulesPlugin() //启用HMR时,插件将显示模块的相对路径
    ]
})