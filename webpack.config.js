var path = require("path");
module.exports = {
    entry: {
        app: [path.resolve(__dirname, "index.js"),]
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.wasm$/,
                loaders: ['wasm-loader']
            }
        ]
    }
};