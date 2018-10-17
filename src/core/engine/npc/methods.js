/*
* npc方法
* */

export function getConfig() {
  return {
    name: '',             //名字
    description: '',      //npc描述
    res: [],              //资源
    tasks: [],            //任务
    taskStatus: {          //任务状态
      hasTask: false,           //存在未领取的任务
      hasUnfinishedTask: false, //存在未完成的任务
      hasResultTask: false      //存在完成的任务
    },
  }
}