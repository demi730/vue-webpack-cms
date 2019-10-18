import Vue from 'vue'

import { Header } from 'mint-ui'
Vue.component(Header.name, Header)
import 'mint-ui/lib/style.css'
import './lib/mui/dist/css/mui.min.css'

import App from './app.vue'

var vm = new Vue({
    el: '#app',
    render: c => c(App)
})