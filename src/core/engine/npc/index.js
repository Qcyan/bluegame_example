/*
* npc类
* */
import { getConfig } from './methods';
import util from '@util';
import Engine from '../index';

let uid = 1;

class Npc extends Engine {

  constructor(opts = {}) {
    super();
    this.$options = util.extend(getConfig(), opts);
    init.call(this);
  }

  //获取当前任务（可领取 && 在进行）
  getTasks() {
    const game = this.$game,     //game 实例
      tasks = game.getTasks(),         //所有的任务
      my = game.my.role,
      level = my.level,       //用户等级
      tasked = my.tasks.result;    //获取当前用户

    const _tasks = [];

    util.each(this.tasks, (taskId) => {

      const task = tasks[taskId],           //当前任务
        prevTask = task.prevTasks;  //上一级关联任务

      //做过的任务 && level不够
      if (tasked.indexOf(taskId) !== -1 || task.level > level) return;

      //从已完成的任务列表中查找任务依赖
      //任务依赖中存在
      if (prevTask) {
        if (tasked.indexOf(prevTask) !== -1) {
          _tasks.push(task);
        }
      } else {
        _tasks.push(task);
      }
    });

    return _tasks;
  }

  //获取资源
  getRes() {
    const allRes = this.$game.getRes();
    return util.each(this.res, (resUid) => {
      return allRes[resUid];
    }, true);
  }

  //清除npc状态
  resetTaskStatus() {
    this.taskStatus = {
      hasTask: false,           //存在未领取的任务
      hasUnfinishedTask: false, //存在未完成的任务
      hasResultTask: false      //存在完成的任务
    };
  }
}

function init() {
  this.$map(this, this.$options);
  this.id = (this.id || uid++);
  delete this.$options;
}

export default Npc;