import Vue from 'vue'
//导入路由包
import VueRouter from 'vue-router'
//导入vue-resource包
import VueResource from 'vue-resource'
//导入格式化时间的插件
import moment from 'moment'
//安装路由
Vue.use(VueRouter)
//安装vue-resource
Vue.use(VueResource)

//配置资源请求根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005/'

// 按需导入Mint UI 模块
import { Header, Swipe, SwipeItem, Button} from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
//导入Mint UI 样式
import 'mint-ui/lib/style.css'
// 导入mui样式文件
import './lib/mui/dist/css/mui.min.css'
import './lib/mui/dist/css/icons-extra.css'

// 导入APP组件
import app from './App.vue'
//导入路由模块
import router from './router.js'

//定义全局过滤器
Vue.filter('dataFormat',function (dataStr,pattern='YYYY-MM-DD HH:mm:ss') {
    return moment(dataStr).format(pattern)
})

//创建一个vue实例
var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router //将路由对象挂载到vue实例中
})