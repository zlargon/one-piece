module.exports = {
  entry: './app/index.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: { stage: 0 }   // support ES7
      }
    ]
  }
};
