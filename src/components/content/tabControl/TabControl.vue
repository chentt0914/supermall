<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles"
        :key="item" class="tab-control-item"
        :class="{active:index === currentIndex}"
        @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name:'TabControl',
    data(){
      return{
        currentIndex:0
      }
    },
    methods:{
      itemClick(index){
        this.currentIndex = index;
        this.$emit('tabClick',index)
      }
    },
    props:{
      titles:{
        type:Array,
        default(){ //默认值是一个对象或者数组时，default加函数
          return []
        }
      }
    }
  }
</script>

<style  scoped>
.tab-control{
  display: flex;
  text-align: center;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
}
  .tab-control-item {
    flex: 1;
  }
    .tab-control-item span{
      padding: 5px;
    }
  .active{
    color: var(--color-high-text);
  }
  .active span{
    border-bottom: 3px solid var(--color-tint);
  }
</style>
