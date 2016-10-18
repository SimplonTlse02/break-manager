const webpack = require('webpack');

module.exports = {
    entry: './src/js/App.jsx',
    output: {
        path: './public',
        filename: 'bundle.js',
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query : {
                "presets": [
                  "es2015",
                  "react"
                ]
              },
        }]
    }
};
