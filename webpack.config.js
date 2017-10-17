var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');

var commonConfig = {
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                        // the "scss" and "sass" values for the lang attribute to the right configs here.
                        // other preprocessors should work out of the box, no loader config like this necessary.
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                        'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                    }
                    // other vue-loader options go here
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
};

if (process.env.NODE_ENV === 'production') {
    module.exports = [
        // browser environment
        merge(commonConfig, {
            entry: './src/plugin.js',
            output: {
                path: path.resolve(__dirname, './dist'),
                filename: 'vue-match-pairs.min.js',
                libraryTarget: 'window',
                library: 'VueMatchPairs'
            },
            devtool: '#source-map',
            plugins: [
                new webpack.DefinePlugin({
                    'process.env': {
                        NODE_ENV: '"production"'
                    }
                }),
                new webpack.optimize.UglifyJsPlugin({
                    sourceMap: true,
                    compress: {
                        warnings: false
                    }
                }),
                new webpack.LoaderOptionsPlugin({
                    minimize: true
                })
            ]
        }),

        // node environment
        merge(commonConfig, {
            entry: path.resolve(__dirname + '/src/MatchPairs.vue'),
            output: {
                path: path.resolve(__dirname, './dist'),
                filename: 'vue-match-pairs.js',
                libraryTarget: 'umd',
                library: 'vue-match-pairs',
                umdNamedDefine: true
            }
        })
    ];
} else {
    module.exports = merge(commonConfig, {
        entry: './src/main.js',
        output: {
            path: path.resolve(__dirname, './dist'),
            publicPath: '/dist/',
            filename: 'build.js'
        },
    });
}
