const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const pkgPath = path.resolve(process.cwd(), 'package.json');
const pkg = require(pkgPath);

module.exports = (options) => ({
    entry: [
        path.join('node_modules', 'babel-polyfill', 'browser'),
    ],
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                'env',
                                {
                                    targets: {
                                        browsers: [
                                            'last 2 versions',
                                        ],
                                    },
                                    exclude: [
                                        'transform-regenerator',
                                        'es6.set',
                                    ],
                                },
                            ],
                        ],
                    },
                },
            },
        ],
    },
    output: {
        path: path.resolve(process.cwd(), options.out),
        filename: 'index.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: options.title || pkg.name,
        }),
    ],
});
