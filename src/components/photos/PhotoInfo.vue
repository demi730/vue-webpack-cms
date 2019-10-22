<template>
    <div class="photoinfo-container">
        <h3 class="info-title">{{photoinfo.title}}</h3>
        <p class="info-subtitle">
            <span>发表时间：{{photoinfo.add_time | dataFormat}}</span>
            <span>点击：{{photoinfo.click}}次</span>
        </p>
        <hr>
        <!--缩略图区域-->
        <div class="thumbs">
            <vue-preview :slides="slide1" @close="handleClose"></vue-preview>
        </div>
        <!--文字描述区域-->
        <div class="content" v-html="photoinfo.content"></div>
        <!--评论区域-->
        <cmt-box :id="this.id"></cmt-box>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    import comment from '../subcomponents/Comments.vue'
    export default {
        data(){
            return{
                id: this.$route.params.id,
                photoinfo: {},
                slide1: []
            }
        },
        created(){
          this.getPhotoInfo()
          this.getThumbs()
        },
        methods: {
            getPhotoInfo(){
                this.$http.get('api/getimageInfo/'+this.id).then(result=>{
                    if (result.body.status===0){
                        this.photoinfo = result.body.message[0]
                    }else{
                        Toast('图片信息获取失败！')
                    }
                })
            },
            //获取缩略图
            getThumbs(){
                this.$http.get('api/getthumimages/'+this.id).then(result=>{
                    if (result.body.status===0){
                        result.body.message.forEach(item=>{
                            item.w=600
                            item.h=400
                            item.msrc=item.src
                        })
                        this.slide1 = result.body.message
                    }
                })
            },
            handleClose () {
                console.log('close event')
            }
        },
        components:{
            "cmt-box": comment
        }
    }
</script>

<style lang="scss" scoped>
    .photoinfo-container{
        padding: 5px;
        h3{
            font-size: 15px;
            color: #26a2ff;
            text-align: center;
            margin: 15px 0;
        }
        .info-subtitle{
            display: flex;
            justify-content: space-between;
            font-size: 13px;
        }
        .content{
            font-size: 13px;
            line-height: 30px;
        }
        .thumbs {
            /deep/ .my-gallery {
                display: flex;
                flex-wrap: wrap;
                figure {
                    width: 30%;
                    margin: 5px;
                    img {
                        width: 100%;
                    }
                }
            }
        }
    }
</style>