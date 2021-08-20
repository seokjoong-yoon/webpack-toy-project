const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const apiMocker = require("connect-api-mocker");

module.exports = {
    mode: 'development', // production mode compresses the bundle.js' volume.
    // mode config sets the global variable "process.env.NODE_ENV" to "development" or "production" in COMPILE TIME via
    // webpack.DefinePlugin by the default setting of webpack. so process.env.NODE_ENV cannot be accessed in this file,
    // unless a flag NODE_ENV='mode' was added to script when building.
    // "process.env.NODE_ENV" is substituted by the values in compile time and soon
    // changed to "undefined" in browser runtime.
    // to convey variable that is decided in compile-time to browser runtime, use webpack.DefinePlugin.
    entry: {
        main: "./src/index.js"  // starting point of the webpack modularization
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,  // loader applies to .js, .jsx files
                exclude: /node_modules/,  // exclusion when applying loader
                use: {
                    loader: "babel-loader",  // javascript down-grade conversion
                    options: {
                        presets: ["@babel/preset-env"] // babel is only in charge of "parse" and "print" of the
                    }                                  // three build steps. preset is in charge of the "transforming"
                }                                      // step, which is in the middle of the "parse" and "print"
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"] // css-loader is applied first to convert css code to javascript
                                                    // then style-loader to apply css to browser DOM
            }
        ]
    },
    plugins:[
        new webpack.DefinePlugin({}),  // allow using process.env.NODE_ENV in application files (build time -> runtime)
        new HtmlWebpackPlugin({   // adds parameter variable and bundle.js script tag to the index.html in ./dist
            template: './src/index.html', // reads from ./src/index.html
            templateParameters: {         // designate parameter variable to be injected later to html
              env: `${process.env.NODE_ENV}`,
            },                            // "NODE_ENV=development npm run build" should set env to 'development'
            filename: 'index.html',       // write index.html in dist directory. (output is written in ./dist because
                                          // we notified config file that output.path is path.resolve('./dist'))
            minify: process.env.NODE_ENV === 'production' ? {
                collapseWhitespace: true, // removes spaces and newlines in ./dist/index.html
                removeComments: true,     // removes comments
            }:false,
            hash: true,                // adds to static files a new hash value generated during build as a querystring
        }),
        new CleanWebpackPlugin(),       // cleans up output before running build
    ],
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: path.resolve('./dist'),
        publicPath: "",
        filename: "bundle.js"  // bundle.js and ./dist/index.html are created in build time but deleted when server is executed.
    },
    devServer: {               // adding --progress flag to "npx webpack serve" shows build progression rate.
        contentBase: "./dist", // path to provide static resources
        port: 3000,            // sets devServer port
        historyApiFallback: true, // set when developing SPA that uses history API. redirects index.html when 404.
        overlay: true,         // show error or warnings on browser window when building
        stats: 'errors-only', // defines message level. possible options are: 'none', 'errors-only', 'minimal', 'normal', 'verbose'
        // before: (app, server, compiler) => {  // adds middleware to the devServer. mock API.
        //     app.get("/api/keywords", (req, res) => {     // "curl localhost:3000/api/keywords" gets the response
        //         res.json([
        //             { keyword: 'literature' },
        //             { keyword: 'philosophy' }
        //         ])
        //     })
        // }
        before: (app, server, compiler) => { // before provides general-purpose middleware : use
            app.use(apiMocker('/api', 'mocks/api')) // param1: browser url root, param2: dir path root
        },
        proxy: {  // front-side solution for CORS policy
            "/api" : "http://localhost:8080"
        },
        hot: true // hot module replacement enabled
    },
}

