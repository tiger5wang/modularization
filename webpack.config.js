const path = require('path');

module.exports = {
	entry: './src/animation/animation.js',
	mode: 'development',
	optimization: {
		minimize: false
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ['@babel/preset-env'],
						plugins: [['@babel/plugin-transform-react-jsx', {pragma: 'createElement'}]]
					}
				}
			},
            {
                test: /\.vueee/,
                use:{
                    loader: require.resolve("./src/2_sfc/myloader.js")
                }
            }
		]
		
	}
}