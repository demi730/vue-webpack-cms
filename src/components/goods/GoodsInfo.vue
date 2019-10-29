<template>
    <div class="goodsinfo-container">
        <!--小球动画-->
<!--        半场动画只能使用钩子函数-->
        <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter">
            <div class="ball" v-show="ballflag" ref="ball"></div>
        </transition>
<!--轮播图区域-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :imgList="imgList" :isfull="isfull"></swiper>
                </div>
            </div>
        </div>
<!--购买区域-->
        <div class="mui-card">
            <div class="mui-card-header">{{goodsinfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：<del>￥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价：<span class="now_price">￥{{goodsinfo.sell_price}}</span>
                    </p>
                    <p>购买数量:&nbsp;<numberbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numberbox></p>
                    <br>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToShopcar">加入购物车</mt-button>
                    </p>
                </div>
            </div>
        </div>
<!--商品详情区域-->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{goodsinfo.goods_no}}</p>
                    <p>库存情况：{{goodsinfo.stock_quantity}}</p>
                    <p>上架时间：{{goodsinfo.add_time | dataFormat()}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goodsDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goodsComment(id)">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
    import swiper from '../subcomponents/swiper.vue'
    import numberbox from '../subcomponents/goodsinfo_numberbox.vue'
    import { Toast } from 'mint-ui'
    export default {
        data(){
            return {
                id:this.$route.params.id,
                imgList:[],
                goodsinfo:{},
                isfull:false,//轮播图不设置宽度为100%
                ballflag:false,//控制小球显示或隐藏
                selectedCount:1//默认小球选中数量为1
            }
        },
        created(){
            this.getImgList()
            this.getGoodsInfo()
        },
        methods:{
            getImgList(){
                this.$http.get("api/getthumimages/"+this.id).then(result=>{
                    if (result.body.status===0){
                        this.imgList = result.body.message
                        this.imgList.forEach(item=>{
                            item.img = item.src
                        })
                    }else{
                        Toast('图片获取失败')
                    }
                })
            },
            getGoodsInfo(){
                this.$http.get('api/goods/getinfo/'+this.id).then(result=>{
                    if (result.body.status===0){
                        this.goodsinfo=result.body.message[0]
                    }else{
                        Toast('图片获取失败')
                    }
                })
            },
            goodsDesc(id){
                this.$router.push({name:'goodsdesc',params:{id}})
            },
            goodsComment(id){
                this.$router.push({name:'goodscomment',params:{id}})
            },
            addToShopcar(){
                this.ballflag=!this.ballflag
                //保存商品信息{id:商品的id,count:选择商品的数量,price:商品的单价,selected:商品是否为选中状态，默认为true}
                var goodsinfo = {
                    id: this.id,
                    count: this.selectedCount,
                    price: this.goodsinfo.sell_price,
                    selected: true
                }
                //点击加入购物车时，将商品信息存到store仓库中
                this.$store.commit('addToCar',goodsinfo)
            },
            beforeEnter(el){
                el.style.transform = 'translate(0,0)'
            },
            enter(el,done){
                el.offsetWidth//不加没有动画
                //获取小球的位置
                const ballPos = this.$refs.ball.getBoundingClientRect()
                //获取购物车徽标的位置
                const badgePos = document.getElementById('badge').getBoundingClientRect()
                //计算x距离
                const x = badgePos.left - ballPos.left
                //计算y距离
                const y = badgePos.top - ballPos.top
                el.style.transform = `translate(${x}px,${y}px)`
                el.style.transition = 'all 0.5s cubic-bezier(.15,-0.39,1,.59)'
                done()
            },
            afterEnter(el){
                this.ballflag = !this.ballflag
            },
            //获取选中小球数量
            getSelectedCount(count){
                this.selectedCount = count
            }
        },
        components:{
            swiper,
            numberbox
        }
    }
</script>

<style lang="scss" scoped>
    .goodsinfo-container{
        background-color: #eee;
        overflow: hidden;
        .ball{
            width: 15px;
            height: 15px;
            background-color: red;
            border-radius: 50%;
            position: absolute;
            z-index: 9999;
            top: 390px;
            left: 142px;
        }
        .now_price{
            color: red;
            font-size: 16px;
            font-weight: bold;
        }
        .mui-card-footer{
            display: block;
            button{
                margin: 15px 0;
            }
        }
    }
</style>