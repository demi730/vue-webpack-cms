# vue-webpack-cms

## 目录结构
```
my-project
├── dist                      # 打包完的文件会自动放在这里
|
├── node_modules              # 第三方依赖
|
├── src                       # 项目源码（核心文件）
│   ├── components            # 所有组件
│   ├── images                # 放置图片
│   ├── lib                   # 第三方库
│   ├── App.vue               # 根组件，内含路由和公共部分
|   ├── index.html            # 主页
|   ├── main.js               # 启动配置
│   └── router.js             # 路由配置
|
|
├── .babelrc                  # babel 编译配置
├── .gitignore                # Git 提交忽略的文件配置
├── LICENSE    
|
├── package-lock.json         # 用来锁定依赖的版本号（NPM 自动生成）
├── package.json              # 项目配置
|
├── README.md                 # 项目说明
|
├── webpack.config.js         # wabpack开发配置
├── wepack.public.config.js   # webpack生产配置

```
## 安装

// 安装前请先确保已安装node和npm

// 需要提前在全局安装webpack和webpack-dev-server,如果已安装请忽略
`npm install webpack -g`

`npm install webpack-dev-server -g`

// 安装成功后,再安装依赖

`npm install`
## 运行 
#### 开发环境
// 注意首次使用需要执行下面的init命令来生成入口html文件,以后不用再执行

```
npm run init
npm run dev
```

#### 生产环境(打包)
`npm run pub`

### 使用手机调试Vue项目
* 前提：要保证自己的手机和当前做项目的电脑，处于同一个WIFI环境中；
* 当手机和电脑处于同一个WIFI中之后，大运行终端命令`ipconfig`，查找 无线局域网适配器 的网络配置，复制其IPv4的地址；
* 把复制的Ip地址，粘贴到package.json中：`"dev": "webpack-dev-server --hot --open --port 3000 --host 127.0.0.1"`,将--host指令设置为 WIFI的地址；
* 打开自己的手机浏览器，输入 http:// + IP地址 + 端口号，就能在手机上调试自己的网站了！
### 项目展示
![首页](https://pics.images.ac.cn/image/5f0097ce0fc04.html "首页")
![新闻资讯](https://pics.images.ac.cn/image/5f0097ced3fff.html)
![新闻内容](https://pics.images.ac.cn/image/5f0097d03026f.html)
![新闻评论](https://pics.images.ac.cn/image/5f0097ce75683.html)
![图片分享](https://pics.images.ac.cn/image/5f0097cf4b504.html)
![图片详情](https://pics.images.ac.cn/image/5f0097cfc1ac9.html)
![图片浏览](https://pics.images.ac.cn/image/5f0097d0a9bae.html)
![商品购买](https://pics.images.ac.cn/image/5f0097d10162c.html)
![商品详情](https://pics.images.ac.cn/image/5f0097d15f25b.html)
![购物车](https://pics.images.ac.cn/image/5f0097d1cf632.html)
