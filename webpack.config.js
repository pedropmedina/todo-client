const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// return module.exports config for mode
const modeConfig = ({ mode, presets }) =>
	require(`./build-utils/webpack.${mode}`)({ mode, presets });

module.exports = ({ mode, presets } = { mode: 'production', presets: [] }) =>
	merge(
		{
			mode,
			entry: ['babel-polyfill', './src/index'],
			output: {
				filename: 'bundle.js',
				path: path.resolve(__dirname, 'build'),
				publicPath: '/',
			},
			module: {
				rules: [
					{
						test: /\.(js|jsx)$/,
						use: { loader: 'babel-loader' },
						include: path.resolve(__dirname, 'src'),
					},
					{
						test: /\.css$/,
						use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
					},
					{
						test: /\.(png|jpe?g|gif|svg)$/,
						use: [
							{
								loader: 'file-loader',
								options: { name: '[hash].[ext]', outputPath: 'assets/images/' },
							},
							{ loader: 'image-webpack-loader' },
						],
					},
					{
						test: /\.(otf|ttf|eot|woff|woff2)$/,
						use: {
							loader: 'file-loader',
							options: { name: '[hash].[ext]', outputPath: 'assets/fonts/' },
						},
					},
				],
			},
			plugins: [
				new webpack.ProgressPlugin(),
				new CleanWebpackPlugin(['build']),
				new HTMLWebpackPlugin({
					template: path.resolve(__dirname, 'public/index.html'),
					filename: 'index.html',
				}),
			],
		},
		modeConfig({ mode, presets }),
	);
