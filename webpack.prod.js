const webpack = require('webpack')
const path = require('path')
const { merge } = require('webpack-merge');
const WebPackCommonConfig = require('./webpack.common.js')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = merge(WebPackCommonConfig, {
    output: {
        filename: '[name].js',
        chunkFilename: '[name].[chunkhash:5].js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        },
        runtimeChunk: true,
        usedExports: true, //只导出在外部使用的成员
        concatenateModules: true,
        minimizer: [
            new TerserWebpackPlugin(),
            new OptimizeCssAssetsWebpackPlugin()
        ]
    },
    plugins: [
    ]
})