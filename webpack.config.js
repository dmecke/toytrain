var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    entry: './src/App.js',
    output: {
        path: __dirname,
        filename: 'app.js'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.ts', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: "ts-loader"
            },
            {
                test: /\.js$/,
                loader: "babel",
                exclude: /(node_modules)/,
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    plugins: [
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            proxy: 'http://localhost:8080'
        },{
            reload: false
        })
    ]
};
