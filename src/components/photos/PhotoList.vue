<template>
    <div>
        <!--顶部滑动区域-->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item',item.id==0 ? 'mui-active' : '']" href="#item1mobile" data-wid="tab-top-subpage-1.html"
                       v-for="item in categories" :key="item.id" @click="getPhotoListById(item.id)">
                        {{item.title}}
                    </a>
                </div>
            </div>
        </div>
        <!--图片区域-->
        <ul class="photo-list">
            <router-link v-for="item in list" :to="'/home/photoinfo/'+item.id" tag="li" :key="item.id">
                <img v-lazy="item.img_url">
                <div class="photo-info">
                    <h3 class="info-title">{{item.title}}</h3>
                    <p class="info-body">{{item.zhaiyao}}</p>
                </div>
            </router-link>
        </ul>

    </div>
</template>

<script>
    import mui from '../../lib/mui/dist/js/mui.min.js'
    import {Toast} from 'mint-ui'
    export default {
        data (){
            return {
                categories:[],//所有分类列表
                list:[]//所有图片列表
            }
        },
        created (){
            this.getCategory(),
            this.getPhotoListById(0)
        },
        mounted (){//当所有DOM元素都挂载到页面上再初始化scroll控件
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            })
        },
        methods: {
            //获取所有分类
            getCategory(){
                this.$http.get('api/getimgcategory').then(result=>{
                    if (result.body.status===0){
                        result.body.message.unshift({title:"全部",id:0})
                        this.categories = result.body.message
                    }else{
                        Toast('所有分类加载失败！')
                    }
                })
            },
            //获取所有图片
            getPhotoListById(cateId){
                this.$http.get('api/getimages/'+cateId).then(result=>{
                    if (result.body.status === 0){
                        this.list = result.body.message
                    }else{
                        Toast('图片获取失败！')
                    }
                })
            }
        }
    }

</script>

<style lang="scss" scoped>
    * { touch-action: none; }
    .photo-list{
        list-style: none;
        padding: 10px;
        padding-bottom: 0;
        margin: 0;
        text-align: center;
        box-shadow: 0 0 9px #999;
        li{
            background-color: #ccc;
            margin-bottom: 10px;
            position: relative;
            img{
                width: 100%;
                vertical-align: middle;
            }
            img[lazy=loading] {
                width: 40px;
                height: 300px;
                margin: auto;
            }
            .photo-info{
                text-align: left;
                color: white;
                position: absolute;
                bottom: 0;
                background-color: rgba(0,0,0,0.4);
                max-height: 84px;
                .info-title{
                    font-size: 14px;
                }
                .info-body{
                    font-size: 13px;
                    color: white;
                }
            }

        }
    }
</style>