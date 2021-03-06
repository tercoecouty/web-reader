const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isDev = process.env.NODE_ENV !== "production";

let config = {
    mode: isDev ? "development" : "production",
    entry: "./src/index.tsx",
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "dist"),
        // clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(tsx|ts)$/,
                use: "babel-loader",
            },
            {
                test: /\.less$/,
                use: [
                    isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                    // {
                    //     loader: "css-loader",
                    //     options: {
                    //         modules: {
                    //             localIdentName: "[local]_[hash:base64:8]",
                    //         },
                    //     },
                    // },
                    "css-loader",
                    "less-loader",
                ],
            },
            {
                test: /\.txt$/,
                use: "raw-loader",
            },
            {
                test: /\.svg$/,
                use: "raw-loader",
            },
            {
                test: /\.png$/,
                loader: "file-loader",
                options: {
                    outputPath: "images",
                    name: "[name].[ext]",
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: isDev ? "public/index-dev.html" : "public/index-prod.html",
            inject: "body",
        }),
        new MiniCssExtractPlugin(),
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            $src: path.resolve(__dirname, "src"),
        },
    },
    externals: {
        react: "React",
        "react-dom": "ReactDOM",
    },
};

if (isDev) {
    config = {
        ...config,
        devtool: "inline-source-map",
        devServer: {
            static: "dist",
        },
    };
}

module.exports = config;
