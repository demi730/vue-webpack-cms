<template>
    <div class="mui-numbox" data-numbox-min='1' style="height: 26px">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input class="mui-input-numbox" type="number" :value="count" readonly @change="changedCount" ref="numbox"/>
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
            changedCount(){
                this.$store.commit('updateGoodsCount',{id:this.id,count:this.$refs.numbox.value})
            }
        },
        props: ['count','id']
    }
</script>

<style lang="scss" scoped></style>