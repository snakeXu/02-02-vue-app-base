const path = require('path')
const { resolve } = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
	mode: process.env.NODE_ENV || 'production',
	entry: resolve(__dirname, './src/main.js'),
	output: {
		filename: 'bundle.js',
		path: resolve(__dirname, './dist'),//需要绝对路径
		publicPath: '/'
	},
	resolve: {
        extensions: ['*', '.js', '.vue', '.json']
    },
	module: {
		rules: [
			{
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'] 
					}
				},
   				exclude: /node_modules/
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                enforce: "pre",
                loader: 'eslint-loader',
    //             use: {
				// 	loader: 'eslint-loader',
	   //              enforce: "pre",//编译前检查
	   //              include: [path.resolve(__dirname, 'src')], // 指定检查的目录
				// },
            },
            {
        		test: /\.css$/,
		        use: [
		            "style-loader",
			        "css-loader"
		        ]
		    },
            {
        		test: /\.less$/,
		        use: [
		            "style-loader",
			        "css-loader",
			        "less-loader"
		        ]
		    },
		 //    {
			// 	test: /\.html$/i,
			// 	loader: 'html-loader',
			// 	options: {
			// 		attributes: {
			// 			list: [
			// 			    {
			// 			    	tag: 'img',
			// 			    	attribute: 'src',
			// 			    	type: 'src',
			// 			    },
			// 			    {
			// 			    	tag: 'a',
			// 			    	attribute: 'href',
			// 			    	type: 'src',
			// 			    },
			// 			]
			// 		}
			// 	}
			// },
			{
                test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                	esModule: false, 
                    limit: 10 * 1024,
                    name: '[name].[hash:8].[ext]'
                },
            }
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
	    new htmlWebpackPlugin({
	        title: 'vue-app-base',
	        template: resolve(__dirname, 'public/index.html'),
	        favicon: path.resolve('public/favicon.ico'),
	        inject:true
	    }),
		new CopyWebpackPlugin({
			patterns:[
	      		{
			        from: path.resolve(__dirname, './public'),
			        to: path.join(__dirname, './dist')
	      		},
	      	]
		}),
	    new webpack.DefinePlugin({
	        // 'process.env': {
	        //     'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
	        // },
	        BASE_URL: JSON.stringify(process.env.NODE_ENV)
	    }),
	    new VueLoaderPlugin(),
	]
}