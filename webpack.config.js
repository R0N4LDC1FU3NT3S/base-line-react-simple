const path = require("path")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")
const DotenvWebpack = require("dotenv-webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

/** @type {import('webpack').Configuration} */
module.exports = (webpackConfigEnv, argv, mode) => {
	let env
	let envObj
	if (argv.mode === "development") {
		envObj = { path: ".env.development" }
		require("dotenv").config(envObj)
		env = new DotenvWebpack(envObj)
	}
	if (argv.mode === "production") {
		envObj = { path: ".env.production" }
		require("dotenv").config(envObj)
		env = new DotenvWebpack(envObj)
	}

	return {
		entry: "./src/index",
		output: {
			path: path.resolve(__dirname, "dist"),
			filename: "[name].[contenthash].js",
			publicPath: ""
		},
		module: {
			rules: [
				{
					test: /.(js|jsx)$/,
					use: "babel-loader"
				},
				{
					test: /.(css|s[ac]ss)$/,
					use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
				},
				{
					test: /\.(png|svg|jpg|jpeg|gif)$/i,
					use: ["image-webpack-loader"],
					type: "asset"
				}
			]
		},
		resolve: {
			extensions: [".js", ".jsx", ".json"],
			alias: {
				"@": path.resolve(__dirname, "src")
			}
		},
		plugins: [
			new CleanWebpackPlugin(),
			new HtmlWebpackPlugin({
				template: "./public/index.html"
			}),
			new MiniCssExtractPlugin(),
			env
		],
		optimization: {
			minimize: true,
			minimizer: [new CssMinimizerPlugin(), new TerserPlugin()]
		},
		devServer: {
			port: process.env.PORT
		}
	}
}
