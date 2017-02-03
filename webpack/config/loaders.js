export default source => [
    {
        test: /\.scss$/,
        loaders: ['style', 'css?sourceMap', 'postcss?sourceMap', 'sass?sourceMap'],
    },
    {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: 'babel',
    },
    {
        test: /\.json$/,
        loader: 'json',
    },
    {
        test: /\.html$/,
        loader: 'raw',
    },
    {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'file?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack',
        ],
    },
    {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file',
    },
];
