var path = require('path');

var webpackConfig = {
	context: __dirname,
	entry: './src/app.ts',
	mode: 'development',
	output: {
			path: path.join(__dirname, 'lib'),
			publicPath: '',
			filename: 'app.js'
	},
	devServer: {
		inline: true,
		port: 8080
 },
	resolve: {
    extensions: [".ts", ".js"]
  },
	module: {
			rules: [
				{ test: /\.ts?$/, loader: "ts-loader" }
			]
	}
};

module.exports = webpackConfig;