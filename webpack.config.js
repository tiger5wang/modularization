const path = require('path');

module.exports = {
	entry: './src/5_carouselWithLifecycle/main.js',   // './src/1_carousel/main.js',   //'./src/5_carouselWithLifecycle/Carousel.js',   //'./src/2_sfc/main.js',  //'./src/animation/carouselWithAnimation.js',
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