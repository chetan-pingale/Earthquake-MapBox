const path = require("path");

const DIST_DIR = path.resolve(__dirname, "dist");
const SRC_DIR = path.resolve(__dirname, "src");

const config = {
    context: __dirname + '/src',
    entry: SRC_DIR + "/app/index.js",
    devtool: 'source-map',
    output: {
        path: DIST_DIR + "/app",
        filename: "bundle.js",
        publicPath: "/app/",
    },
    resolve: {
        root: SRC_DIR,
        extensions: ['', '.js', '.jsx'],
    },
    devServer: {
        port: 8080,
        historyApiFallback: true,
    },
    module: {
        loaders: [
            {
                test: /\.js?/,
                include: SRC_DIR,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ["react", "es2015", "stage-2"],
                },
            },
            {
                test: /\.jsx?$/,
                include: SRC_DIR,
                exclude: /node_modules/,
                loaders: [
                    'babel?presets[]=react,presets[]=es2015,plugins[]=transform-object-rest-spread'
                ],
            },
            {
                test: /.css$/,
                loader: 'style!css!',
            },
        ],
    },
};

module.exports = config;