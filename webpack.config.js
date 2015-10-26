var webpack = require('webpack');

var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
  __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
});

module.exports = {
    cache: true,
    entry: {
        main:  './src/components/index.jsx'
    },
    output: {
        path: 'public/build',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {test: /\.jsx$/, loader: 'jsx-loader?harmony'},
            {test: /\.js$/ , loader: 'jsx-loader?harmony'},
            {test: /\.js.*$/, exclude: /node_modules/, loader: "babel-loader"},
            {test: /\.css$/,loader: "style-loader!css-loader"},
            {test: /\.gif/,loader: 'url-loader?limit=10000&mimetype=image/gif'},
            {test: /\.jpg/,loader: 'url-loader?limit=10000&mimetype=image/jpg'},
            {test: /\.png/,loader: 'url-loader?limit=10000&mimetype=image/png'},
            {test: /\.svg/,loader: 'url-loader?limit=10000&mimetype=image/svg+xml'}
        ]
    },
    plugins: [
        definePlugin
    ]
};