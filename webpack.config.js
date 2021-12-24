const path = require('path')
const WriteFilePlugin = require("write-file-webpack-plugin");
const webpack = require('webpack')

const buildEntry = (defaultEntry, envEntry) => {
    if (!envEntry) return defaultEntry;
    const selectiveEntry = {};
    const entryOption = envEntry.toLowerCase();
    Object.keys(defaultEntry).forEach((key) => {
        if (key.toLowerCase().indexOf(entryOption) > -1) {
            selectiveEntry[key] = defaultEntry[key];
        }
    })
}

module.exports = (env = {}) => {
    const { entry: envEntry } = env;
    const defaultEntry = {
        sharedComoponent: path.resolve(__dirname, 'src') + "/shared",
        projectOne: path.resolve(__dirname, 'src') + "/widgets/project1",
        projectTwo: path.resolve(__dirname, 'src') + "/widgets/project2",
    }
    const entry = buildEntry(defaultEntry, envEntry);
    return {
        entry,
        optimization: {
            runtimeChunk: {
                name: "Vendor"
            }
        },
        output: {
            path: path.resolve(__dirname, path.resolve(__dirname, 'dist')),
            // publicPath: "/src",
            filename: '[name].js'
        },
        module: {
            rules: [
                { test: /\.(js|jsx)$/, use: 'babel-loader' },
                { test: /\.css$/, use: ["style-loader", "css-loader"] }
            ]
        },
        node: {
            fs: 'empty'
        },
        // mode: isProduction ? 'production' : 'development',
        mode: 'development',
        devServer: {
            clientLogLevel: "silent",
            overlay: {
                errors: true
            },
            publicPath: '/dist',
        },
        plugins: [new WriteFilePlugin(), new webpack.IgnorePlugin(/__test__/)
        ],
        resolve: {
            extensions: ['.js', '.jsx'],
        },
    }
}