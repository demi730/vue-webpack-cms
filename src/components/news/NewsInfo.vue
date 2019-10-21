<template>
    <div class="newsinfo-container">
        <h1 class="title" v-text="newsInfo.title"></h1>
        <p class="subtitle">
            <span>发表时间：{{ newsInfo.add_time | dataFormat}}</span>
            <span>点击：{{ newsInfo.click }}次</span>
        </p>
        <hr>
        <!--内容区域-->
        <div class="content" v-html="newsInfo.content"></div>
        <!--评论区域-->
        <comment-box :id="id"></comment-box>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui'
    // 引入评论子组件
    import comments from '../subcomponents/Comments.vue'
    export default {
        data (){
            return {
                newsInfo: {},
                id: this.$route.params.id
            }
        },
        created (){
            this.getNewsInfo()
        },
        methods: {
            getNewsInfo(){
                this.$http.get('api/getnew/'+this.id).then(result=>{
                    if (result.body.status===0){
                        this.newsInfo = result.body.message[0]
                    }else {
                        Toast('新闻资讯获取失败！')
                    }
                })
            }
        },
        components: {
            "comment-box": comments
        }
    }
</script>

<style lang="scss">
    .newsinfo-container{
        padding: 0 10px;
        .title{
            text-align: center;
            margin: 15px 0;
            font-size: 16px;
            color: red;
        }
        .subtitle{
            color: #226aff;
            display: flex;
            justify-content: space-between;
        }
        .content{
            img{
                width: 100%;
            }
        }
    }
</style>