<template>
    <div>
        <!--轮播图区域-->
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in imgList" :key="item.id">
                <img :src="item.img" alt="">
            </mt-swipe-item>
        </mt-swipe>
        <!-- 六宫格区域-->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
                <img src="../../images/menu1.png" >
                <div class="mui-media-body">新闻资讯</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photolist">
                <img src="../../images/menu2.png" >
                <div class="mui-media-body">图片分享</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu3.png" >
                <div class="mui-media-body">商品购买</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu4.png" >
                <div class="mui-media-body">留言反馈</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu5.png" >
                <div class="mui-media-body">视频专区</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu6.png" >
                <div class="mui-media-body">联系我们</div></a></li>
        </ul>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui'
    export default {
        data() {
            return {
                imgList:''
            }
        },
        created() {
            this.getImgList()
        },
        methods: {
            getImgList(){
                this.$http.get("api/getlunbo").then(result=>{
                    if (result.body.status===0){
                        this.imgList = result.body.message
                    }else{
                        Toast('图片获取失败')
                    }
                })
            }
        }
    }
</script>

<style lang="scss"scoped>
    .mint-swipe{
        height: 200px;
        .mint-swipe-item{
            img{
                width: 100%;
                height: 100%;
            }
        }

    }
    .mui-grid-view.mui-grid-9{
        background-color: #fff;
        .mui-table-view-cell{
            border-right: none;
            border-bottom: none;
            img{
                height: 60px;
                width: 60px;
            }
            .mui-media-body {
                font-size: 13px;
            }
        }
    }
</style>