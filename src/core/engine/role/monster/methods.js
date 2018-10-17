export function getConfig() {
  return {
    isMonster: true,
    property: {
      exp: false,
      currency: false
    },
    reward: {           //奖励
      exp: 0,           //完成后的经验
      currency: 0,       //完成后的货币
      res: [
        /*{
          id:1,
          count:1
        }*/
      ]             //完成后的资源 uid{count:0} uid + 数量
    },
  }
}