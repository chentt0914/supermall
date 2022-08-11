<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @itemClick="itemClick" ref="nav" />
    <scroll class="content" :pull-up-load="true" :probe-type="3" ref="scroll" @scroll="contentScroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad" />
      <detail-param-info :param-info="paramInfo" ref="params" />
      <detail-comment-info :comment-info="commentInfo" ref="comment" />
      <good-list :goods="recommends" ref="recommends" />
    </scroll>
    <detail-bottom-bar @addToCart="addToCart" />
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import { getDetail, Goods, Shop, GoodsParam,getRecommend } from 'network/detail'
import { debounce } from 'common/utils'
import { itemListenerMixin, backTopMixin } from 'common/mixin'
import { mapActions } from 'vuex'

import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import DetailBottomBar from './childComps/DetailBottomBar.vue'

import Scroll from 'components/common/scroll/Scroll.vue'
import GoodList from 'components/content/goods/GoodList.vue'
  export default {
    name:'Detail',
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,

      Scroll,
      GoodList
    },
  mixins: [itemListenerMixin, backTopMixin],
    data(){
      return{
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommends:[],
        topYs:[],
        currentIndex:0
      }
    },
    created(){
      //1.保存传入的iid
      this.iid = this.$route.params.iid

      //2.根据id请求详情数据
      getDetail(this.iid).then(res =>{
        // 1.获取顶部的图片轮播数据
        const data = res.result
        // console.log(res);
        this.topImages = res.result.itemInfo.topImages

        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

        //3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)

        //4.获取商品详细信息
        this.detailInfo = data.detailInfo

        //5.获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        //6.获取评论的信息
        if(data.rate.cRate !==0){
          this.commentInfo = data.rate.list[0]
        }
      }),

      //3.请求推荐数据
      getRecommend().then(res => {
        // console.log(res);
        this.recommends = res.data.list
      })

      // 4.给getTopY赋值(对给赋值的操作进行防抖)
      this.getTopYs = debounce(() => {
        this.topYs = []
        this.topYs.push(0);
        this.topYs.push(this.$refs.params.$el.offsetTop);
        this.topYs.push(this.$refs.comment.$el.offsetTop)
        this.topYs.push(this.$refs.recommends.$el.offsetTop)
        this.topYs.push(Number.MAX_VALUE)
      },100)
    },
    mounted(){
    },
    updated(){

    },
    destroyed(){
      this.$bus.$off('itemImgLoad', this.itemImgListener)
    },
    methods:{
      ...mapActions(['addCart']),
      imgLoad(){
        this.$refs.scroll.refresh()
        this.getTopYs()
      },
      itemClick(index){
        // console.log(index);
        this.$refs.scroll.scrollTo(0,-this.topYs[index],100)
      },
      contentScroll(position){
        // 判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000


        const positionY = - position.y
        let length = this.topYs.length
        for(let i =0;i<length-1;i++){
          if(this.currentIndex !== i && (positionY >= this.topYs[i] && positionY < this.topYs[i+1])){
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
      },
      addToCart(){
        // 1.获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid

        //2.将商品添加到购物车

        // 写法1
        // this.$store.dispatch('addCart',product).then(res => {
        //   console.log(res);
        // })

        // 写法2
        // actions可以返回一个promise
        // mapActions的映射关系
        this.addCart(product).then(res =>{
          // console.log(res);
          this.$toast.show(res,2000)
        })
      }
    }
  }
</script>

<style scoped>
#detail{
position: relative;
z-index: 9;
background: #fff;
height: 100vh;
}
.detail-nav{
position: relative;
z-index: 9;
background-color: #fff;
}
.content{
  /* height: calc(100%-44px); */
  overflow: hidden;
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
}
</style>
