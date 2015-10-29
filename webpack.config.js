var path = require('path');

module.exports = {
    entry: [
        path.resolve(__dirname, 'app/index.js')
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: path.join(__dirname, 'node_modules'),
                loader: 'babel-loader',
                query: { stage: 0 }     // support ES7 syntax
            }
        ]
    }
};
