<template>
    <div class="shopcar-container">
<!--        商品列表区域-->
        <div class="goods-list">
            <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <mt-switch></mt-switch>
                        <img :src="item.thumb_path" alt="">
                        <div class="goods-info">
                            <h1>{{ item.title }}</h1>
                            <p>
                                <span class="price">￥{{ item.sell_price }}</span>
                                <numberbox :count="$store.getters.getGoodsCount[item.id]" :id="item.id"></numberbox>
                                <a href="#" @click="remove(item.id,i)">删除</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
<!--        商品购买区-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    这是一个最简单的卡片视图控件；卡片视图常用来显示完整独立的一段信息，比如一篇文章的预览图、作者信息、点赞数量等
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import numberbox from '../subcomponents/shopcar_numberbox.vue'
    export default {
        data() {
            return {
                goodslist: []//购物车中所有商品的数据
            }
        },
        created() {
            this.getGoodsList()
        },
        methods: {
            getGoodsList(){
                //获取到store中所有商品的id，然后拼接出一个用逗号分隔的字符串
                var idArr = []
                this.$store.state.goods.forEach(item => idArr.push(item.id))
                if (idArr.length<=0){
                    return
                }
                this.$http.get('api/goods/getshopcarlist/'+idArr.join(',')).then(result=>{
                    if (result.body.status === 0){
                        this.goodslist = result.body.message
                    }
                })
            },
            //从页面中删除商品
            remove(id,i){
                this.goodslist.splice(i,1)
                //删除store中存储的数据
                this.$store.commit('removeComment',id)
            }
        },
        components: {
            numberbox
        }
    }
</script>

<style lang="scss" scoped>
   .shopcar-container{
       overflow: hidden;
       .goods-list{
           img{
               width: 60px;
               height: 60px;
           }
          .mui-card-content-inner{
              display: flex;
              align-items: center;
              .goods-info{
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;
                  h1{
                      font-size: 13px;
                  }
                  p{
                      margin-top: 8px;
                      .price{
                          color: red;
                          font-size: 14px;
                          font-weight: bold;
                      }
                  }
              }
          }
       }
   }
</style>