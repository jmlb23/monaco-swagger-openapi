const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/index.jsx",
    "editor.worker": "monaco-editor/esm/vs/editor/editor.worker.js",
    "yaml.worker": "monaco-yaml/lib/esm/yaml.worker.js",
  },
  output: {
    globalObject: "this",
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "build"),
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  module: {
    rules: [{
        test: /\.js*/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.ttf$/,
        loader: "file-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      filename: 'index.html',
      template: 'public/index.html'
    }),
  ],
};