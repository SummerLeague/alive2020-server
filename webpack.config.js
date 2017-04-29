module.exports = {
  entry: [
    './public/webpack/app.js.jsx'
  ],
  output: {
    path: __dirname + '/public/',
    publicPath: './public/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.js.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './public/js/'
  }
};
