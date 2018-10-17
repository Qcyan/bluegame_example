/*
* npc方法
* */

/*
* @property 技能的特性
* */
export function getConfig() {
  return {
    name: '',
    description: '',
    level: 1,     //等级限制
    hasGain: false,   //是否存在增益效果
    property: {
      hp: {
        gain: 0,      //增益
        effect: 0,    //效果
        time: null,   //增益的有限时间
        timer: null   //增益的定时器
      },
      mp: {
        gain: 0,
        effect: 0,
        time: null,
        timer: null
      },
      physicalAttack: {
        gain: 0,
        effect: 0,
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
        effect: 0,
        time: null,
        timer: null
      },
      magicDefense: {
        gain: 0,
        time: null,
        timer: null
      }
    },
    consume: {    //消耗
      hp: 0,
      mp: 0
    }
  }
}