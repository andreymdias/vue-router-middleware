const path = require('path')


module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    // eslint-disable-next-line
    path: path.resolve(__dirname, '..', 'dist'),
    libraryTarget: "umd",
    library: "VueRouterMiddleware"
  },

  module: {

    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'eslint-loader'
          }
        ]
      }
    ]
  },
  plugins: [
  ]
}
