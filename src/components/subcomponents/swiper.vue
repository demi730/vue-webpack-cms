<template>
    <div>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in imgList" :key="item.id" :class="{'isfull':isfull}">
                <img :src="item.img" alt="">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
    export default {
        props:['imgList','isfull']
    }
</script>

<style lang="scss" scoped>
    .mint-swipe{
        height: 200px;
        .mint-swipe-item{
            text-align: center;
            img{
                /*width: 100%;*/
                height: 100%;
            }


            }
        }
    /*为了兼容首页的轮播图和商品详情页的轮播图的大小，设置一个isfull属性，来设置宽度是否为100%*/
    .isfull {
        img {
            width: 100%;
        }
    }

</style>