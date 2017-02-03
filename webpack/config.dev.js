import StyleLintPlugin from 'stylelint-webpack-plugin';
import webpack from 'webpack';
import base, {source} from './config.base';

const wpconfig = base('development');

// development overrides go here
wpconfig.watch = true;
wpconfig.devtool = 'source-map';
// wpconfig.entry.webpackDevServer = 'webpack-dev-server/client?http://0.0.0.0:4000'; // WebpackDevServer host and port
// wpconfig.entry.webpackHot = 'webpack/hot/only-dev-server'; // "only" prevents reload on syntax errors

wpconfig.plugins = wpconfig.plugins.concat([
    new StyleLintPlugin({
        context: source,
        syntax: 'scss'
    }),
    // new webpack.HotModuleReplacementPlugin()
]);

export default wpconfig;
