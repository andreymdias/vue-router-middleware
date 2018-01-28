const webpack = require('webpack')
const merge = require('webpack-merge')

const npm = require("../package.json")

module.exports = merge(
  require('./base.webpack.js'),
  {
    plugins: [
      new webpack.BannerPlugin((
      [
        "Copyright (c) Andrey Dias (http://github.com/andreymdias)",
        "\n",
        "Licensed Under MIT (http://opensource.org/licenses/MIT)",
        "\n",
        "\n",
        "Vue Router Middeware @ Version "+ npm.version,
        "\n"
      ])
      .join("")),

      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': '"production"'
        }
      })
    ]
  }
)
