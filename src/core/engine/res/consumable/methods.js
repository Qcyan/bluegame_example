/*
* 消耗品方法
* */

export function getConfig() {
  return {
    name: '',           //消耗品
    description: '',    //消耗描述
    type: 3,            //类型
    hasUse:false,      //是否存在增益效果
    property: {
      hp: {
        gain: 0,      //增益
        effect: 0,     //效果
        time: null,   //增益的有限时间
        timer: null   //增益的定时器
      },
      mp: {
        gain: 0,
        effect: 0,
        time: null,
        timer: null
      },
      exp: {
        gain: 0,
        effect: 0,
        time: null,
        timer: null
      },
      physicalAttack: {
        gain: 0,
        time: null,
        timer: null
      },
      physicalDefense: {
        gain: 0,
        time: null,
        timer: null
      },
      magicAttack: {
        gain: 0,
        time: null,
        timer: null
      },
      magicDefense: {
        gain: 0,
        time: null,
        timer: null
      }
    }
  }
}