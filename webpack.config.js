const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const webpack = require('webpack');


module.exports = {
    mode: "development",

    entry: {
        "bundle": ["./src/app/index.tsx"],
        "main": ["./src/app/main.tsx"],
        "vendor": [
            'react',
            'react-dom',
            'react-router-dom',
            'unstated-next',
            'classnames',
            'rc-queue-anim',
            'rc-animate',
        ],
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
                use: [
                    {
                        loader: 'cache-loader',
                    }, {
                        loader: 'thread-loader',
                        options: {
                            workers: require('os').cpus().length - 1,
                            poolTimeout: Infinity,
                        },
                    }, {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            happyPackMode: true,
                        },
                    },
                ],
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
        new ForkTsCheckerWebpackPlugin({
            checkSyntacticErrors: true,
        }),
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