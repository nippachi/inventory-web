let {DefinePlugin} = require("webpack");
let path           = require("path");

module.exports = {
  entry: {
    "main.js": [
      "babel-polyfill",
      "whatwg-fetch",
      "echat/main",
    ]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules      : true,
              importLoaders: 1
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [
                require("autoprefixer")
              ]
            }
          }
        ]
      },
      {
        exclude: /node_modules/,
        test: /\.jsx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              plugins: [
                "transform-object-rest-spread"
              ],
              presets: [
                "latest",
                "react"
              ]
            }
          }
        ]
      }
    ]
  },
  node: {
    net: 'empty',
  },
  plugins: [
    new DefinePlugin({
      "process.env.API_SERVER_DOMAIN"      : JSON.stringify(
        process.env.API_SERVER_DOMAIN || "https://api.everychat81.com"
      ),
      "process.env.NOTIFICATION_SERVER_DOMAIN" : JSON.stringify(
        process.env.NOTIFICATION_SERVER_DOMAIN|| "wss://notification.everychat81.com"
      ),
      "process.env.MONITORING_SERVER_DOMAIN": JSON.stringify(
        process.env.MONITORING_SERVER_DOMAIN || "wss://monitoring.everychat81.com"
      ),
      "process.env.VISITOR_SERVER_DOMAIN"   : JSON.stringify(
        process.env.VISITOR_SERVER_DOMAIN || "https://visitor.everychat81.com"
      )
    })
  ],
  output: {
    filename  : "[name]",
    path      : path.resolve(__dirname, "build"),
    publicPath: "/"
  },
  resolve: {
    extensions: [".css", ".js", ".jsx"],
    modules: ["src", "node_modules"]
  }
};