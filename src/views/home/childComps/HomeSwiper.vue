<template>
  <swiper>
    <swiper-item v-for="item in banners" :key="item.image">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from 'components/common/swiper'
  export default {
    name:'HomeSwiper',
    data(){
      return{
        isLoad:false
      }
    },
    props:{
      banners:{
        type:Array,
        default(){
            return []
        }
      }
    },
    components:{
      Swiper,
      SwiperItem
    },
    methods:{
      imageLoad(){
       if(!this.isLoad){ //只需要发送一次
         this.$emit('swiperImageLoad')
         this.isLoad = true
       }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
