import { Promise } from 'core-js'
import { ADD_COUNTER, ADD_TO_CART } from './mutation-types'


export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // 1.查找数组中是否有该商品
      // let oldProduct = null;
      //1.1 for循环的方法
      // for (let item of context.state.cartList) {
      //   if (item.iid === payload.iid) {
      //     oldProduct = item
      //   }
      // }
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      //2.判断
      if (oldProduct) {
        //商品数量+1
        // oldProduct.count += 1
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前数量+1')
      } else {
        //添加新商品
        payload.count = 1
        // context.state.cartList.push(payload)
        context.commit(ADD_TO_CART, payload)
        resolve('添加新商品')
      }
    })
  }
}
