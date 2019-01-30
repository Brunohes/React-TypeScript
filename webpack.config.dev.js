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
		entry: [ '@babel/polyfill', './src/index.tsx' ],
		output: {
			path: path.resolve('public'),
			filename: './main.js',
			publicPath: '/'
		},
		resolve: {
			extensions: [ '.ts', '.tsx', '.js', '.jsx', '.json' ]
		},
		devServer: {
			historyApiFallback: true
		},
		module: {
			rules: [
				{
					test: [ /\.tsx?$/, /\.ts?$/ ],
					loader: 'awesome-typescript-loader',
					options: {
						useBabel: true,
						babelOptions: {
							babelrc: false,
							presets: [ '@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript' ],
							plugins: [
								'@babel/plugin-proposal-object-rest-spread',
								'@babel/plugin-proposal-class-properties',
								'emotion'
							]
						},
						babelCore: '@babel/core'
					},
					exclude: /node_modules/
				},
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
		plugins: [ htmlPlugin, new webpack.DefinePlugin(envKeys) ]
	}
}
