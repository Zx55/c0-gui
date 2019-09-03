const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');


module.exports = {
    mode: "development",

    entry: {
        "bundle": ["./src/index.tsx"],
        "main": ["./src/main.tsx"],
        "vendor": ['react', 'react-dom'],
    },

    output: {
        filename: "js/[name].js",
        path: __dirname + "/dist"
    },

    devtool: "source-map",

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            }, {
                test: /\.js$/,
                loader: "source-map-loader",
                enforce: "pre",
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            inject: 'body',
            minify: {
                html5: true,
            },
            chunks: ['bundle'],
        }),
        new CleanWebpackPlugin(),
        new webpack.ExternalsPlugin('commonjs', [
            'electron'
        ]),
    ],

    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: "vendor",
                    name: "vendor",
                },
            },
        },
    },

    target: "electron-renderer",
};