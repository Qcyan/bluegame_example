/*
* 物资方法
* 物品类型 type {Number} 1:普通/材料类 2:装备 3:药品
*
* */

export function getConfig() {
  return {
    name: '',           //物品名字
    description: '',    //物品描述
    // isTrade: true,      //是否支持交易,暂时不做
    type: 1,
    price: 0,            //售价
    capacity: 99,           //针对的背包中一个容量最大的限制数量
    isBinding: false      //是否绑定
  }
}