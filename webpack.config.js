const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDevMode = process.env.NODE_ENV !== "production";

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "/src/index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.scss$/,
        use: [
          isDevMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.join(__dirname, "/src/index.html")
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: isDevMode ? "[name].css" : "[name].[hash].css",
      chunkFilename: isDevMode ? "[id].css" : "[id].[hash].css"
    })
  ],
  devServer: {
    historyApiFallback: true,
    open: true
  }
};

// module.exports = {
//   mode: "development",
//   entry: path.join(__dirname, "/src/assets/js/app.js"),
//   output: {
//     path: path.resolve(__dirname, "build"),
//     filename: "[name].bundle.js",
//     chunkFilename: "[id].[chunkhash].js"
//   },
//   devtool: NODE_ENV === "development" ? "source-map" : "none",
//   watch: NODE_ENV === "development",
//   watchOptions: {
//     aggregateTimeout: 300
//   },
//   resolve: {
//     extensions: ["*", ".js", ".scss", ".pub"]
//   },
//   resolveLoader: {
//     modules: [path.join(__dirname, "node_modules")]
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         loaders: ["babel-loader"],
//         include: [path.resolve(__dirname, "src")]
//       }
//     ]
//   },
//   stats: {
//     colors: true
//   },
//   plugins: [
//     new webpack.DefinePlugin({
//       NODE_ENV: JSON.stringify(NODE_ENV)
//     })
//   ],
//   devtool: "source-map",
//   devServer: {
//     // suggested official config:
//     // contentBase: './dist',
//     // hot: true

//     // hot reloading html on save - fix / hack:
//     // https://github.com/webpack/webpack-dev-server/issues/1271
//     contentBase: "./build",
//     watchContentBase: true,
//     hot: true
//   }
// };
