<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
          class="check-button"
          :is-checked="isSelectAll"
          @click.native="checkAll" />
      <span>全选</span>
    </div>
    <div class="total-price">
      合计:{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      去结算{{length}}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CheckButton from '@/components/content/checkButton/CheckButton.vue'
  export default {
    name:"CartBottomBar",
    components:{
      CheckButton
    },
    computed:{
      ...mapGetters(['cartList']),
      totalPrice(){
        return '¥' + this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue,item) =>{
          return preValue + item.price*item.count
        },0).toFixed(2)
      },
      length(){
        return this.cartList.filter(item => item.checked).length
      },
      isSelectAll(){
        if(this.cartList.length === 0) return false

        // 使用filter
        // return !this.cartList.filter(item => !item.checked).length

        // 使用find
        // return !this.cartList.find(item => !item.checked)

        // 普通遍历
        for (let item of this.cartList) {
          if(!item.checked){
            return false
          }
        }
        return true
      }
    },
    methods:{
      checkAll(){
        // 全选状态下
        if (this.isSelectAll){
          this.cartList.forEach(item => item.checked = false);
        }else{
          this.cartList.forEach(item => item.checked = true) //非全选状态下
        }

      },
      calcClick(){
        if(!this.isSelectAll){
          this.$toast.show('请选择购买的商品',2000)
        }
      }
    }
  }
</script>

<style scoped>
.bottom-bar{
  display: flex;
  position: relative;
  bottom: 0;
  height: 40px;
  line-height: 40px;
  background-color: #eee;
}
.check-content{
  width: 80px;
  display: flex;
  align-items: center;
  margin-left: 10px;
}
.check-button{
  width: 22px;
  height: 22px;
  line-height: 22px;
  margin-right: 5px;
}
.total-price{
  margin-left: 30px;
  flex: 1;
}
.calculate{
  width: 100px;
  background-color: red;
  color: #fff;
  text-align: center;

}
</style>
