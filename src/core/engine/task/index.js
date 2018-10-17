/*
* 装备类
* */
import { getConfig } from './methods';
import util from '@util';
import Engine from '../index';

let uid = 1;

//任务
class Task extends Engine {
  constructor(opts = {}) {
    super();
    this.$options = util.extend(getConfig(), opts);
    init.call(this);
  }

  //获取任务id中资源count
  getTaskResCount(id) {
    const taskRes = this.details.res;
    for (var i = 0; i < taskRes.length; i++) {
      const res = taskRes[i];
      if (res.id == id) {
        return res.count;
      }
    }
    return 0;
  }

  //获取任务id中击杀count
  getTaskMonstersCount(id) {
    const taskMonsters = this.details.monsters;
    for (var i = 0; i < taskMonsters.length; i++) {
      const monster = taskMonsters[i];
      if (monster.id == id) {
        return monster.count;
      }
    }
    return 0;
  }

  //获取任务资源
  getRewardRes() {
    const game = this.$game,
      allRes = game.getRes();
    return util.each(this.reward.res, (taskRes) => {
      const id = taskRes.id,
        res = allRes[id],
        currentRes = util.deepCopy(res);

      let _res = {};

      //针对装备类直接扩展到原来的装备
      if (res.type === 2) {
        _res = {
          res: util.extend(currentRes, taskRes),
          count: 1
        };
      } else {
        _res = {
          res,
          count: taskRes.count
        };
      }
      return _res;
    }, true);
  }

}

function init() {
  this.$map(this, this.$options);
  this.id = (this.id || uid++);
  delete this.$options;
}

export default Task;