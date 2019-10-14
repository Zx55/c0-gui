import { resolve, join } from 'path';
import { cpus } from 'os';
import { Configuration } from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';


const distPath = resolve(__dirname, '../dist');
const sourcePath = resolve(__dirname, '../src');
const configPath = resolve(__dirname);
const modulesPath = resolve(__dirname, '../node_modules');
const themePath = resolve(sourcePath, './app/theme');

const config: Configuration = {
    mode: 'development',
    entry: {
        'bundle': [resolve(sourcePath, './app/index.tsx')],
        'main': [resolve(sourcePath, './app/app.tsx')],
        'vendor': [
            'react',
            'react-dom',
            'react-router-dom',
            'use-react-router',
            'react-intl',
            'unstated-next',
            'classnames',
            'rc-queue-anim',
            'rc-animate',
        ],
    },
    output: {
        filename: 'js/[name].js',
        path: distPath,
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
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
                            workers: cpus().length - 1,
                        },
                    }, {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            happyPackMode: true,
                            configFile: resolve(configPath, './tsconfig.json'),
                        },
                    },
                ],
            }, {
                test: /\.js$/,
                loader: 'source-map-loader',
                enforce: 'pre',
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            }, {
                test: /\.less$/,
                use: ['style-loader', 'less-loader'],
            },
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
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: 'vendor',
                    name: 'vendor',
                },
            },
        },
        minimize: true,
        occurrenceOrder: true,
        removeAvailableModules: true,
        removeEmptyChunks: true,
        mergeDuplicateChunks: true,
        usedExports: true,
        providedExports: true,
        concatenateModules: true,
        sideEffects: true,
    },
    target: 'electron-renderer',
};

export default config;
