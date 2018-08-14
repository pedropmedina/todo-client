const path = require('path');
const webpack = require('webpack');

module.exports = ({ mode, presets }) => ({
	devtool: 'cheap-module-eval-source-map',
	devServer: {
		contentBase: path.join(__dirname, 'build'),
		port: 4000,
		hot: true,
		historyApiFallback: true,
	},
	plugins: [new webpack.HotModuleReplacementPlugin()],
});
