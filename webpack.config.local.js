const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const htmlPlugin = new HtmlWebPackPlugin({
	template: './src/index.html',
	filename: './index.html'

	// favicon: './favicon.png'
})

module.exports = env => {
	const envKeys = Object.keys(env).reduce((prev, next) => {
		prev[ `process.env.${ next }` ] = JSON.stringify(env[ next ])
		return prev
	}, {})
	return {
		devtool: 'inline-source-map',
		entry: [ '@babel/polyfill', './src/index.tsx' ],
		output: {
			path: path.resolve('dist'),
			filename: './main.js',
			publicPath: '/'
		},
		devServer: {
			historyApiFallback: true,
			hot: true
		},
		module: {
			rules: [
				{
					test: [ /\.tsx?$/, /\.ts?$/ ],
					exclude: /node_modules/,
					use: 'awesome-typescript-loader',
					resolve: {
						extensions: [ '.ts', '.tsx', '.js', '.jsx', '.json' ]
					}
				},
				{ enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
				{
					test: [ /\.scss$/, /\.css$/ ],
					use: [ 'style-loader', 'css-loader', 'sass-loader' ]
				},
				{
					test: /\.(png|jp(e*)g|svg)$/,
					use: [
						{
							loader: 'url-loader',
							options: {

								// Convert images small than 100kb to base64 strings
								limit: 100000,
								name: 'images/[hash]-[name].[ext]'
							}
						}
					]
				}
			]
		},
		plugins: [ htmlPlugin, new webpack.DefinePlugin(envKeys), new webpack.HotModuleReplacementPlugin() ]
	}
}
