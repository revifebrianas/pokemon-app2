const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const webpack = require("webpack");

module.exports = {
    context: __dirname,
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: '/',
    },
    devServer: {
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|j?g|svg|gif)?$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            title: 'Football Update WPA',
            template: path.resolve('public/index.html')
        }),
        new WorkboxPlugin.GenerateSW({
            // these options encourage the ServiceWorkers to get in there fast
            // and not allow any straggling "old" SWs to hang around
            // clientsClaim: true,
            // skipWaiting: true
        }),
        new webpack.HotModuleReplacementPlugin(),

]
};