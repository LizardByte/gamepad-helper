const path = require('path');
const { codecovWebpackPlugin } = require("@codecov/webpack-plugin");

let production = process.env.NODE_ENV === 'production';

let config = {
    entry: {
        'gamepad-helper': './src/js/gamepad-helper',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
    plugins: [
        // Put the Codecov webpack plugin after all other plugins
        codecovWebpackPlugin({
          enableBundleAnalysis: process.env.CODECOV_TOKEN !== undefined,
          bundleName: "shared-web",
          uploadToken: process.env.CODECOV_TOKEN,
        }),
    ],
    resolve: {
        extensions: ['.js'],
    },
    devtool: 'inline-source-map',
    mode: "development",
    devServer: {
        static: './dist',
        watchFiles: ['src/**/*'],
    },
}

if (production) {
    config.mode = 'production';
    config.devtool = 'source-map';
}

module.exports = config;
