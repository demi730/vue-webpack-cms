import Vue from 'vue'
//导入路由包
import VueRouter from 'vue-router'
//安装路由
Vue.use(VueRouter)

// 按需导入Mint UI 模块
import { Header, Swipe, SwipeItem} from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
//导入Mint UI 样式
import 'mint-ui/lib/style.css'
// 导入mui样式文件
import './lib/mui/dist/css/mui.min.css'
import './lib/mui/dist/css/icons-extra.css'

// 导入APP组件
import app from './App.vue'
//导入路由模块
import router from './router.js'

//创建一个vue实例
var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router //将路由对象挂载到vue实例中
})