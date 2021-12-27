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
        sharedComoponent: "./shared/index.js",
        projectOne: "./widgets/project1/index.js",
        projectTwo: "./widgets/project2/index.js",
    }
    console.log("Entry", envEntry);
    const entry = buildEntry(defaultEntry, envEntry);
    return {
        context: path.join(__dirname, "src"),
        entry,
        optimization: {
            runtimeChunk: {
                name: "Vendor"
            }
        },
        output: {
            path: path.join(__dirname, 'dist'),
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