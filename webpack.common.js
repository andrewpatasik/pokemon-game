const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: "./src/app.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        assetModuleFilename: "images/[name][ext][query]"
    },
    optimization: {
        splitChunks: {
          cacheGroups: {
            styles: {
              name: "styles",
              type: "css/mini-extract",              
              chunks: "all",
              enforce: true,
            },
          },
        },
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
              test: /\.(png|svg|jpg|jpeg|gif)$/i,
              type: 'asset/resource',
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/template.html",
            filename: "index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        })
    ]
};