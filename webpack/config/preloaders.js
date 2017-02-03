

export default (source) => [
    {
        test: /\.js$/,
        include: [source],
        loader: 'eslint-loader',
    },
    {
        test: /\.html/,
        loader: 'htmlhint',
        exclude: [/node_modules/],
    },
]
