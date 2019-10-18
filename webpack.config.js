 const path = require('path')
 const htmlWebpackPlugin = require('html-webpack-plugin');

 module.exports = {
    entry: path.join(__dirname,'src/main.js'),
     output:{
        filename: 'bundle.js',
         path: path.join(__dirname,'dist')
     },
     plugins:[
         new htmlWebpackPlugin({
             template:path.join(__dirname, 'src/index.html'),
             filename: 'index.html'
         })
     ],
     module: {
         rules: [
             {
                 test:/\.vue$/,
                 use:'vue-loader'
             },
             {
                 test:/\.css$/,
                 use: ['style-loader','css-loader']
             },
             {
                 test:/\.less$/,
                 use: ['style-loader','css-loader','less-loader']
             },
             {
                 test:/\.scss$/,
                 use: ['style-loader','css-loader','sass-loader']
             },
             {
                 test:/\.(png|jpg|gif|ttf|svg)$/,
                 use: ['url-loader?limit=43960']
             },
             // {
             //     test:/\.js$/,
             //     use:'babel-loader',
             //     exclude:/(node_modules|bower_components)/,
             //     options: {
             //         presets: ['@babel/preset-env'],
             //         plugins: ['@babel/transform-runtime']
             //     }
             // }
         ]
     }
 }

