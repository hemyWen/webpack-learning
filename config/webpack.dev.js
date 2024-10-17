const path = require('path')
const ESLintWebpackPlugin = require("eslint-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
  entry: "./src/main.js",
  output: {
    path: undefined,
    filename: 'static/js/main.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.s[ac]ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.styl$/,
        use: ["style-loader", "css-loader", "stylus-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 20 * 1024 // 小于20kb的图片会被base64处理
          }
        },
        generator: {
          // 将图片文件输出到 static/imgs 目录中
          // 将图片文件命名 [hash:8][ext][query]
          // [hash:8]: hash值取8位
          // [ext]: 使用之前的文件扩展名
          // [query]: 添加之前的query参数
          filename: 'static/images/[hash:8][ext][query]'
        }
      },
      {
        test: /\.(ttf|woff2?|map?|avi|mp4|mp3|pdf|txt)$/,
        type: "asset/resource",
        generator: {
          filename: "static/media/[hash:8][ext][query]",
        },
      },
      {
        test: /\.js$/,
        // exclude: /node_modules/, // 排除node_modules代码不编译
        include: path.resolve(__dirname, "../src"), // 也可以用包含
        loader: "babel-loader",
      }
    ]
  },
  plugins: [
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, "../src"),
      exclude: "node_modules", // 默认值
    }),
    new HtmlWebpackPlugin({
      // 指定模板文件
      template: path.resolve(__dirname, "../public/index.html")
    })
  ],
  devServer: {
    port: 3000,
    hot: true
  },
  mode: 'development',
  devtool: 'cheap-module-source-map'
}