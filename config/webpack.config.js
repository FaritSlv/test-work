const cfg = require('config')
const {VueLoaderPlugin} = require('vue-loader');
const path = require('path')
const rootDir = path.resolve(__dirname, "../")

module.exports = {
    context: path.join(rootDir, 'server'),
    entry: {
        app: process.cwd() + "/server/main.js"
    },
    output: {
        path: path.resolve(rootDir, "assets"),
        publicPath: "/assets/",
        filename: "build.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                loaders: [
                    'vue-style-loader',
                    'css-loader'
                ],
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {}
                    // other vue-loader options go here
                }
            },
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loaders: ['babel-loader']
            },
            {
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader',
            },
            {
                test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
                loader: 'file-loader',
            }
        ]
    },

    resolve: {
        alias: {
            'vue$': 'vue/dist/vue',
            'jquery$': "jquery/dist/jquery"
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    devServer: {
        hot: true,
        contentBase: path.resolve(rootDir, "./public"),
        proxy: {
            '/api': {
                target: "http://localhost:" + cfg.proxy.port,
                "secure": false,
                "logLevel": "debug"
            }
        },
        historyApiFallback: true,
        noInfo: false,
        overlay: true,
        port: cfg.server.port,
        inline: true,
        serverSideRender: false,
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map',
    mode: 'development',
    plugins: [
        new VueLoaderPlugin(),
    ]
}