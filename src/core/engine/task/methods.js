/*
* 任务方法
* */

/*
* 任务名  @name {String}
* 任务描述  @description {String}
* 任务归类  @classify {Number}  1:主线 2.支线 3.每日任务
* 任务类型  @type {Number}  1:跑腿 2.击杀&|购买物品
* 任务状态  @status {Number}  0:未领取 1:已领取未完成 2:完成，未提交 3：完成，提交
* 任务状态  @level {Number}  等级限制
* 任务奖励  @reward {Object}
*    @exp {Number} 奖励经验
*    @currency {Number} 奖励货币
*    @res {Array}    奖励物资
* */

export function getConfig() {
  return {
    name: '',           //任务名
    classify: 1,        //任务归类
    level: 1,           //等级限制
    status: 0,          //任务状态，完成将会添加到用户已完成的列表中，

    //任务状态描述内容
    description: {
      notReceivedTask: "",              //未领取任务描述
      unfinishedTask: "",               //未完成的任务描述
      resultTask: ""                    //完成任务后的描述
    },

    type: 1,                            //任务类型

    details: {                          //任务细节
      res: [
        /*{
          id:1,
          count:10
        }*/
      ],                       //所需任务资源
      monsters: [
        /*{
          id:1,
          count:1
        }*/
      ]//所需任务击杀怪物
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
    prevTasks: null        //上一个关联任务  currentTaskId : prevTaskId
  };
}