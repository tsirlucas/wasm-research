var path = require("path");
module.exports = {
    entry: {
        bundle: [path.resolve(__dirname, "index.js")]
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "[name].js"
    },
    module: {}
};