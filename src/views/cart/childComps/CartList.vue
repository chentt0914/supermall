<template>
  <div class="cart-list">
    <scroll class="content" :pullUpLoad="true" ref="scroll">
      <cart-list-item v-for="(item,index) in cartList" :key="index" :item-info="item" />
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import cartListItem from './CartListItem.vue'
import Scroll from '@/components/common/scroll/Scroll.vue'
  export default {
    name:'CartList',
    components:{
      Scroll,
      cartListItem
    },
    computed:{
      ...mapGetters(['cartList'])
    },
    activated(){
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
.cart-list{
  height: calc(100% - 44px - 49px - 40px);
}
.content{
  height: 100%;
  overflow: hidden;
}
</style>
