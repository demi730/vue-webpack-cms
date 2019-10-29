<template>
        <div class="mui-numbox" data-numbox-min='1' >
            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
            <input class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="number"/>
            <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
        </div>
</template>

<script>
    import mui from '../../lib/mui/dist/js/mui.min.js'
    export default {
        mounted() {
            //初始化数字选择框组件
            mui('.mui-numbox').numbox()
        },
        methods: {
            countChanged(){
                this.$emit('getcount',parseInt(this.$refs.number.value))
            }
        },
        props: ['max'],
        watch: {
            //因为从服务端拿存库是异步操作，所以需要监测数据，当数据改变调用一次，最终得到number类型的数据
            max: function (newVal,oldVal) {
                mui('.mui-numbox').numbox().setOption("max",newVal)
            }
        }
    }
</script>

<style lang="scss" scoped></style>