var entries = {};
var i = 0;
// require('glob').sync('app/assets/**/!(_)*.js').sort().forEach(function (file) {
//     console.log(file);
//     entries[file.substr(11)] = file.substr(11);
// })
require('glob').sync('app/assets/**/!(_)*.scss').sort().forEach(function (file) {
    console.log(file);
    entries[file.substr(11) + ".js"] = file.substr(11);
})

var env = process.env.NODE_ENV || "development";
var readYaml = require('read-yaml');
var config = readYaml.sync('./config/server.yml')[env];
if (!config) {
    throw `./config/service.yml#${env} is required`
}
module.exports = options = {
    entry: entries,
    output: {
        publicPath: (config.cdn || "/static/"),
        path: require('path').resolve(process.cwd() + "/public"),
        filename: "[name]",
        chunkFilename: "[id].js"
    },
    module: {
        loaders: [
            {test: /\.dust$/, loader: "dust-loader"},
            {test: /\.css$/, loader: "style!css"},
            {
                test: /\.scss$/, loaders: [
                "style-loader",
                "css-loader?" + (config.minimize === false ? "-" : "+") + "minimize",
                "sass-loader?includePaths[]=" + require('path').resolve(__dirname, "./node_modules/bourbon-neat/app/assets/stylesheets/") + "&includePaths[]=" + require('path').resolve(__dirname, "./node_modules/bourbon/app/assets/stylesheets/"),
            ]
            },
            {test: /\.svg(\#.*)?$/, loader: "url?limit=1"},
            {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=1&minetype=application/font-woff"},
            {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=1&minetype=application/font-woff"},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=1&minetype=application/octet-stream"},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
            {
                test: /\.(png|jpe?g)(\?.*)?$/,
                loader: "url?limit=1!image!image-maxsize" + (process.env.SKIP_MAXSIZE === "true" ? "?skip" : "")
            }
        ]
    },
    debug: true,
    resolve: {
        modulesDirectories: ["lib", "node_modules", "app/assets", "node_modules/@eskygo/koala-puree", "app/view", "app/assets/global"]
    },
    externals: {
        "jquery": "jQuery",
        "io": "io",
        "dust": "dust",
        "moment": "moment",
        "lodash": "_",
        "hammerjs": "Hammer",
        "_pt_sp_2": "_pt_sp_2",
        "$script": "$script"
    }
};
var webpack = require('webpack');

options.plugins = options.plugins || [];
if (env === "production") {
    options.plugins.push(new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}));
}
