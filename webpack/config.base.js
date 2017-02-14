import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import cssMqpacker from 'css-mqpacker';
import cssnext from 'postcss-cssnext';
import WebpackErrorNotificationPlugin from 'webpack-error-notification';

import {config} from '../package.json';
import preloaders from './config/preloaders';
import loaders from './config/loaders';
import cssnextConfig from './config/cssnext.json';

export const source = path.resolve(path.join(config.src));
export const destination = path.resolve(path.join(config.dest));

export default () => ({
    entry: {
        background: path.join(source, 'js', 'background'),
        popup: path.join(source, 'js', 'popup')
    },

    module: {
        preLoaders: preloaders(source),
        loaders: loaders(source)
    },

    resolve: {
        root: [
            source
        ]
    },

    eslint: {
        configFile: '.eslintrc'
    },

    htmlhint: {
        configFile: '.htmlhintrc'
    },

    sassLoader: {
        includePaths: [
            './',
            './node_modules'
        ]
    },

    output: {
        filename: 'js/[name].js',
        path: destination
    },

    devServer: {
        outputPath: destination
    },

    postcss: () => [cssnext(cssnextConfig), cssMqpacker],

    plugins: [
        new ExtractTextPlugin('css/[name].css'),
        new HtmlWebpackPlugin({
            filename: 'background.html',
            chunks: ['vendor', 'background'],
            template: 'src/background.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'popup.html',
            chunks: ['vendor', 'popup'],
            template: 'src/popup.html'
        }),
        new CopyWebpackPlugin([
            {
                from: path.join(source, 'assets'),
                to: path.join(destination, 'assets')
            }, {
                from: path.join(source, '../src/manifest.json'),
                to: path.join(destination, 'manifest.json')
            }
        ]),
        new webpack.NoErrorsPlugin(),
        new WebpackErrorNotificationPlugin(),
        // Automatically move all modules defined outside of application directory to vendor bundle.
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.js',
            minChunks: (module) => module.resource &&
                        module.resource.indexOf(path.resolve(__dirname, '..', 'src')) === -1
        })
    ]
});
