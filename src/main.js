import Vue from 'vue'
//导入路由包
import VueRouter from 'vue-router'
//导入vue-resource包
import VueResource from 'vue-resource'
//导入格式化时间的插件
import moment from 'moment'
//安装缩略图插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)
//安装路由
Vue.use(VueRouter)
//安装vue-resource
Vue.use(VueResource)
//注册安装vuex
import Vuex from 'vuex'
Vue.use(Vuex)
//实例化一个store仓库
//从本地存储中获取购物车商品信息
var car = JSON.parse(localStorage.getItem('car') || '[]')
var store = new Vuex.Store({
    state: {
        goods: car//用来存放加入购物车时所有的商品信息对象
                // 格式为{id:商品的id,count:选择商品的数量,price:商品的单价,selected:商品是否为选中状态，默认为true}
    },
    mutations: {
        //将商品信息存到store仓库中
        //如果已经有该商品信息，仅添加数量
        addToCar(state,goodsinfo){
            var flag = false //默认购物车中没有该商品
            state.goods.some(item => {
                if (item.id == goodsinfo.id){
                    item.count += parseInt(goodsinfo.count)
                    flag = true
                    return true
                }
            })
            //如果购物车中没有该商品信息，则把该商品信息push到仓库中
            if(!flag){
                this.state.goods.push(goodsinfo)
            }
            //将购物车中的商品信息存放到本地
            localStorage.setItem('car',JSON.stringify(state.goods))
        },
        //更新购物车中的商品数量
        updateGoodsCount(state,goodsinfo){
            state.goods.some(item=>{
                if (item.id == goodsinfo.id){
                    item.count = parseInt(goodsinfo.count)
                    return true
                }
            })
            localStorage.setItem('car',JSON.stringify(state.goods))
        },
        //删除商品
        removeComment(state,id){
            state.goods.some((item,i)=>{
                if(item.id == id){
                    state.goods.splice(i,1)
                    return true
                }
            })
            localStorage.setItem('car',JSON.stringify(state.goods))
        },
        //得到选择框的选中状态并将改变存储到本地存储中
        getSelectedChanged(state,o){
            state.goods.some(item=>{
                if (item.id == o.id){
                    item.selected = o.selected
                    return true
                }
            })
            localStorage.setItem('car',JSON.stringify(state.goods))
        }
    },
    getters:{
        //计算所有加入购物车的数量
        countAll(state){
            var sum = 0
            state.goods.forEach(item=>{
                sum += item.count
            })
            return sum
        },
        //获取每项商品的数量,属性名为id值，属性值为数量
        getGoodsCount(state){
            var o = {}
            state.goods.forEach(item=>{
                o[item.id] = item.count
            })
            return o
        },
        //获取每件商品的选中状态,属性名为id值，属性值为selected选中状态
        getSelected(state){
            var o = {}
            state.goods.forEach(item => {
                o[item.id] = item.selected
            })
            return o
        },
        //计算共买了多少件商品，共花了多少钱
        getAmount(state){
            var o = {
                amount:0,
                price:0
            }
            state.goods.forEach(item=>{
                if (item.selected){
                    o.amount += item.count
                    o.price += item.price*item.count
                }
            })
            return o
        }
    }
})

//配置资源请求根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005/'

// 按需导入Mint UI 模块
// import { Header, Swipe, SwipeItem, Button, Lazyload} from 'mint-ui'
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.component(Button.name, Button)
// Vue.use(Lazyload)
//按需导入不能实现懒加载，所以改为全部导入
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
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
//全局配置post数据提交格式
Vue.http.options.emulateJSON = true

//创建一个vue实例
var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router, //将路由对象挂载到vue实例中
    store//将store挂载到vue实例中
})
