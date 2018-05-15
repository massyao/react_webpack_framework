const webpack = require("webpack"); 
const path = require("path");
const CleanWebpackPlugin = require('clean-webpack-plugin');

const Config = {
    buildDir: path.resolve(__dirname, "lib/vendors"),
};

module.exports = {
    entry: {
        vendors1: [
            "react", // 6.74 KiB
            "react-dom", // 96.8 KiB
            "react-router-dom", // 65.5 KiB
        ],
        vendors2: [
            "jquery", // 85 KiB
            "bootstrap/dist/js/bootstrap.bundle.min",
        ]
    },
    target: "web",
    output: {
        path: Config.buildDir,
        filename: "[name].[hash].js",
        library: "[name]",
    },
    plugins: [
        new CleanWebpackPlugin([Config.buildDir]),
        new webpack["DllPlugin"]({
            context: __dirname,
            name: "[name]",
            path: path.join(Config.buildDir, "manifest.[name].json"),
        }),
    ],
};