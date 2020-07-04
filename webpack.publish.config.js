const path = require('path')
//导入在内存中生成页面的webpack插件
const htmlWebpackPlugin = require('html-webpack-plugin')
//导入删除文件夹的插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
//导入webpack这个模块
const webpack = require('webpack')
//导入抽取css样式文件的插件
const extractTextPlugin = require('extract-text-webpack-plugin')
//导入优化压缩css样式表的插件
const optimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
    entry: {
        app: path.join(__dirname,'src/main.js'), //这是项目的主入口文件
        vendors: ['vue','vuex','vue-router','vue-resource','vue-preview','moment','mint-ui']//这是第三方包的名称
    },//项目的入口文件
    output:{
        filename: 'js/index.js',
        path: path.join(__dirname,'./dist')
    },
    plugins:[
        new htmlWebpackPlugin({
            template:path.join(__dirname, 'src/index.html'),
            filename: 'index.html',
            minify: {//表示提供压缩选项
                removeComments: true, //移出页面中的注释
                collapseWhitespace: true, //合并空白字符
                removeAttributeQuotes: true//移除属性节点上的引号
                }
            }),
        new CleanWebpackPlugin(), //指定每次重新发布的时候，删除的dist文件夹
        new webpack.optimize.CommonsChunkPlugin({
            name:'vendors',
            filename:'js/vendors.js' //指定抽离出来的第三方包文件名
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false //压缩完毕的代码中，移除警告信息
        //     }
        // }),
        new webpack.DefinePlugin({ /**此插件的作用，相当于在项目的全局配置了一些全局可用的变量，
             将来我们引用的第三方包中，比如vue，会检查webpack中有没有提供process.env.NODE_ENV字段，如果有
             ，并且字段的名字为production，就表示是生产发布环境，那么会移出不必要的vue警告功能，并做其他优化*/
            'process.env.NODE_ENV': '"production"'
        }),
        new extractTextPlugin('css/styles.css'),//抽取css文件到单独的目录中
        new optimizeCSSAssetsPlugin()//自动压缩css
    ],
    module: {
        rules: [
            {
                test:/\.vue$/,
                use:'vue-loader'
            },
            {
                test:/\.css$/,
                use: extractTextPlugin.extract({
                    fallback: 'style-loader',
                    use:['css-loader'],
                    publicPath: '../' //表示如果将来生成的样式中，包含路径，那么需要自动在路径前面加上../前缀
                })
            },
            {
                test:/\.less$/,
                use: extractTextPlugin.extract({
                    fallback: 'style-loader',
                    use:['css-loader','less-loader'],
                    publicPath: '../'
                })
            },
            {
                test:/\.scss$/,
                use: extractTextPlugin.extract({
                    fallback: 'style-loader',
                    use:['css-loader','sass-loader'],
                    publicPath: '../'
                })
            },
            {
                test:/\.(png|jpg|gif|ttf|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        // 限制图片大小 10240 表示10kb
                        limit: 10240,
                        name: 'images/[hash:8]-[name].[ext]'
                    }
                }]
            },
            {
                test:'/\.(js|jsx)$/',
                use:{
                    loader:'babel-loader'
                },
                exclude:/node_module/
            }
        ]
    }
}

