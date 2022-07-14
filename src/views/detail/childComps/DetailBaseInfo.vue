<template>
  <div v-if="Object.keys(goods).length !=0" class="base-info">
  <div class="info-title">{{goods.title}}</div>
  <div class="info-price">
    <span class="n-price">{{goods.newPrice}}</span>
    <span class="o-price">{{goods.oldPrice}}</span>
    <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
  </div>
  <div class="info-other">
    <span>{{goods.columns[0]}}</span>
    <span>{{goods.columns[1]}}</span>
    <span>{{goods.services[goods.services.length-1].name}}</span>
  </div>
  <div class="info-service">
    <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
      <img :src="goods.services[index-1].icon" alt="">
      <span>{{goods.services[index-1].name}}</span>
    </span>
  </div>
  </div>
</template>
goods.discount
<script>
  export default {
    name:"DetailBaseInfo",
    props:{
      goods:{
        type:Object,
        default(){
          return {}
        }
      }
    }
  }
</script>

<style  scoped>
.base-info{
  margin-top: 15px;
  padding: 0 8px;
  color: #999;
  border-bottom: 5px solid #f2f5f8;
}
.info-title{
  font-size: 18px;
  color:#222;
}
.info-price{
  position: relative;
  margin: 20px 0;
}
.info-price .n-price{
  color:var(--color-high-text);
  font-size: 18px;
}
.info-price .o-price{
  font-size: 13px;
  text-decoration: line-through;
  margin-left: 5px;
}
.info-price .discount{
  position: absolute;
  top:0;
  color: #fff;
  font-size: 13px;
  padding: 2px 5px;
  border-radius: 100px;
  background-color: var(--color-high-text);
}
.info-other{
  display: flex;
  justify-content: space-between;
  padding-bottom: 8px;
  font-size: 13px;
  border-bottom:1px solid rgba(0, 0, 0, .1);
}
.info-service{
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #222;
  margin: 20px 0 ;

}
.info-service img{
  width: 15px;
  height: 15px;
  vertical-align: middle;
}
</style>
