<template>
    <div class="goods-list">
        <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
            <img :src="item.img_url" alt="">
            <h3 class="title">{{item.title}}</h3>
            <div class="goods-info">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </div>
        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    export default {
        data(){
            return {
                pageindex: 1,
                goodslist: []
            }
        },
        created(){
            this.getGoodsList()
        },
        methods:{
            getGoodsList(){
                this.$http.get('api/getgoods?pageindex='+this.pageindex).then(result=>{
                    if (result.body.status===0){
                        this.goodslist = this.goodslist.concat(result.body.message)
                    }else{
                        Toast('商品信息加载失败！')
                    }
                })
            },
            getMore(){
                this.pageindex++
                this.getGoodsList()
            },
            goDetail(id){
                this.$router.push('/home/goodsinfo/'+id)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .goods-list{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 7px;
        .goods-item{
            width: 49%;
            border: 1px solid #ccc;
            box-shadow: 0 0 8px #ccc;
            margin-bottom: 7px;
            padding: 3px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 293px;
            img{
                width: 100%;
            }
            .title{
                font-size: 14px;
            }
            .goods-info{
                background-color: #eee;
                .price{
                    .now{
                        font-size: 16px;
                        color: red;
                        font-weight: bold;
                    }
                    .old{
                        font-size: 12px;
                        text-decoration: line-through;
                        margin-left: 10px;
                    }
                }
                p{
                    margin: 0;
                    padding: 5px;
                }
                .sell{
                    font-size: 13px;
                    display: flex;
                    justify-content: space-between;

                }

            }
        }
    }
</style>