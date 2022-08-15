const HTMLWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const path = require("path");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "./src/index.js"),
  output: {
    filename: '[name][contenthash].js',
    path: path.resolve(__dirname, "./dist"),
    clean: true
  },
  devtool: 'source-map',
  devServer: {
    static: path.resolve(__dirname, "./dist"),
    open: true,
    hot: true,
    compress: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: { presets: ['@babel/preset-env'] }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new Dotenv(),
    new HTMLWebpackPlugin({
      filename: "index.html",
      template: "src/template.html",
      favicon: "src/images/favicon-32x32.png"
    })
  ]
}