/*
* npc类
* */

import util from '@util';
import Engine from '../index';
import {
  getConfig,
  updateRoleProperty,
  updateTaskStatus,
  receiveTask,
  updateReward,
  updateResSpace,
  removeRoleTaskRes,
  isAdequateSkillConsume,
  findSameRes,
  buy,
  useSkill,
  hasResSpace,
  useConsumable,
  strengthen
} from './methods';

class Role extends Engine {
  constructor(opts = {}) {
    super();
    this.$options = util.extend(getConfig(), opts);
    init.call(this);
  }

  //获取资源
  getRes(id) {

    const game = this.$game,
      allRes = game.getRes(),
      roleRes = this.res.lists;

    /* 根据具体的id查询自身的资源 */
    if (id) {
      for (let i = 0; i < roleRes.length; i++) {

        const res = roleRes[i],
          _res = allRes[id];

        //是需要查询的资源
        if (!(res.id === id)) continue;

        //装备直接返回背包的属性
        if (res.type === 2) {
          return {
            res,
            roleRes: res
          };
        } else {
          //资源则返回物品类
          return {
            res: _res,
            roleRes: this.findSameRes(res)
          };
        }
      }

      return {
        res: null,
        roleRes: {}
      };
    }

    return util.each(roleRes, (_res, i) => {

      let id = _res.id.toString().split('-')[0];

      const res = allRes[id];

      if (res.type === 2) {
        return this.getRes(_res.id);
      } else {
        return {
          res,
          roleRes: _res     //用户具体的数据 {id:1,count:1}
        };
      }
    }, true);
  }

  findSameRes(res, isGetCount, cheakcBinding) {
    return findSameRes.apply(this, [res, isGetCount, cheakcBinding]);
  }

  //获取玩家的技能
  getSkills(skillId) {
    const allSkills = this.$game.getSkills();
    if (skillId) {
      const skill = allSkills[skillId];
      if (skill && skill.level <= this.property.level) {
        return skill;
      }
      return {};
    }
    const skills = [];
    util.each(this.skills, (skillUid) => {
      const skill = allSkills[skillUid];
      if (!skill || skill.level > this.property.level) return;
      skills.push(skill);
    });
    return skills;
  }

  //获取任务当前的任务
  getTasks() {
    const allTasks = this.$game.getTasks();
    return util.each(this.tasks.lists, (task, taskId) => {
      return allTasks[taskId];
    }, true);
  }

  //获取指定任务中怪物的数量
  getTaskMonstersCount(id, monsterId) {
    const task = this.tasks.lists[id];
    if (!task) return 0;
    const monsters = task.monsters;
    for (let i = 0; i < monsters.length; i++) {
      const monster = monsters[i];
      if (monsterId == monster.id) {
        return monster.count;
      }
    }
  }

  //更新角色当前的任务状态，击杀怪物后（获得物品），获取资源调用更新
  updateTaskStatus(opts = { monsterId: 0 }) {
    updateTaskStatus.call(this, opts);
  }

  //接受任务
  receiveTask(task) {
    const game = this.$game;
    receiveTask.call(this, task);
    //@hooks submitTask
    game.gameResources.tasks.hooks.receiveTask.call(game, { task });
    return this;
  }

  //取消任务
  cancelTask(task) {
    const roleTasks = this.tasks.lists,
      game = this.$game;
    if (!roleTasks[task.id]) return false;
    delete roleTasks[task.id];
    task.status = 0;
    this.updateTaskStatus();
    //@hooks submitTask
    game.gameResources.tasks.hooks.cancelTask.call(game, { task });
  }

  //提交任务
  submitTask(task) {
    if (!(task.status === 2)) return false;
    const reward = task.reward,
      game = this.$game;
    task.status = 3;
    removeRoleTaskRes.call(this, task);
    this.tasks.result.push(task.id);
    delete this.tasks.lists[task.id];
    updateReward.apply(this, [reward.exp, reward.currency, reward.res]);
    this.updateTaskStatus();

    //@hooks submitTask
    game.gameResources.tasks.hooks.submitTask.call(game, { task });
  }

  //更新玩家的属性特性
  updateRoleProperty() {
    updateRoleProperty.call(this);
  }

  //穿上装备
  equip(equipment) {

    /* 没有背包空间 */
    if (!hasResSpace.call(this)) {
      return false;
    }

    const roleRes = this.res.lists,
      game = this.$game,
      roleEquipments = this.equipments,
      inBodyEquipment = roleEquipments[equipment.classify];

    //假的装备吧?
    if (!equipment.classify && equipment.type !== 2) return false;

    //身上是否穿了衣服，脱下
    if (!util.nullPlainObject(inBodyEquipment)) {
      this.disboard(inBodyEquipment);
    }

    //穿到指定的位置上
    roleEquipments[equipment.classify] = equipment;

    //获取到装备在背包上具体的位置
    const index = roleRes.indexOf(equipment);

    //从背包中移除
    roleRes.splice(index, 1);

    //更新穿戴状态
    equipment.isEquip = true;

    this.updateRoleProperty();

    this.updateResSpace();

    //@hooks use res
    game.gameResources.res.hooks.equip.call(game, { res: equipment });

    return true;
  }

  //卸下装备
  disboard(equipment) {
    const game = this.$game;

    /* 没有背包空间 */
    if (!hasResSpace.call(this)) {
      return false;
    }

    //清空装备状态
    this.equipments[equipment.classify] = {};

    /* 放回到背包 */
    this.res.lists.push(equipment);

    equipment.isEquip = false;

    this.updateRoleProperty();

    this.updateResSpace();

    //@hooks use res
    game.gameResources.res.hooks.disboard.call(game, { res: equipment });

    return true;
  }

  //使用技能
  skill(skill, isCounterattack = true) {
    const game = skill.$game;
    //检测是否够hp和mp的扣除
    if (isAdequateSkillConsume.call(this, skill)) {
      useSkill.apply(this, [skill, isCounterattack]);

      this.updateRoleProperty();

      //@hook skill
      game.gameResources.skills.hooks.use.call(game, { skill })

      return true;
    } else {
      return false;
    }
  }

  //使用消耗品
  consumable(roleRes) {
    const game = this.$game;

    let status = useConsumable.call(this, roleRes);

    this.updateRoleProperty();

    this.updateTaskStatus();

    this.updateResSpace();

    //@hooks use res
    game.gameResources.res.hooks.consumable.call(game, { res: roleRes });

    return status;
  }

  //更新背包空间
  updateResSpace() {
    updateResSpace.call(this);
  }

  //购买物品
  buy(res, amount) {
    if (!hasResSpace.call(this)) return false;

    buy.apply(this, [res, amount]);

    this.updateTaskStatus();

    this.updateResSpace();

    return true;
  }

  //丢弃物品
  discard(res, amount) {
    const roleRes = this.res.lists,
      index = roleRes.indexOf(res);
    if (res.type === 2) {
      roleRes.splice(index, 1);
    } else {
      res.count -= amount;
      if (res.count < 1) {
        roleRes.splice(index, 1);
      }
    }
    this.updateResSpace();
  }

  //强化装备
  strengthen(equipment) {
    return strengthen.call(this, equipment);
  }

  //进入战斗场景
  fight(enemy) {

    //如果角色已经死亡了，不能再进行战斗了
    if (this.isDie) return false;

    const Engine = this.$game.constructor.Engine;

    const { Monster } = Engine,
      current = this.current,
      fight = current.fight;

    //攻击对象为怪物
    if (enemy && enemy.isMonster) {

      //设置自己击杀的对象
      fight.enemy = new Monster(util.deepCopy(enemy));

      fight.enemyHarm = 0;

      //怪物的对手是自己
      fight.enemy.current.fight.enemy = this;

      fight.enemy.current.fight.enemyHarm = 0;

      //更新一下怪物的属性
      fight.enemy.updateRoleProperty();

    } else if (enemy && !enemy.isMonster) {
      //攻击对象为玩家
      fight.enemy = enemy;
      enemy.updateRoleProperty();
    }
  }

  //清除战斗场景
  clearFight() {
    const fight = this.current.fight;
    fight.enemy = null;
    fight.enemyHarm = 0;
  }

  //恢复体力
  //@proportion {Number} 0-1 恢复的比例
  dieRecover(proportion) {
    const attributes = this.property.attributes;
    attributes.hp.wasting = -(attributes.hp.total * (1 - proportion));
    this.updateRoleProperty();
  }
}

function init() {

  this.$map(this, this.$options);

  delete this.$options;

  this.updateRoleProperty();

  this.updateResSpace();

  this.clearFight();

}

export default Role;
