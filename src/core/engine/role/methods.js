/*
* role methods
* */

import util from '@util';

//任务配置信息
export function getConfig() {
  return {
    id: 0,
    name: '',                 //玩家名字
    type: 0,                 //角色的类型
    occupation: '',           //职业名，和角色类型挂钩的
    /*---- 当前的场景 ----*/
    current: {
      /*---- 战斗场景 -----*/
      fight: {
        enemy: null,      //敌人
        enemyHarm: 0     //敌人受到的伤害
      },
      map: null
    },

    /*---- 角色属性 -----*/
    property: {

      /*---- 经验 ----*/
      exp: {
        levelUp: 150,
        current: 0
      },

      /*---- 玩家固有的 物理 法术 || 攻击 防御 ----*/
      attributes: {

        /*---- 血量 ----*/
        hp: {
          intrinsic: 120,       //原有的值
          _intrinsic: 0,        //计算后的值
          total: 0,              //总共
          wasting: 0,            //消耗的
          gains: []                //临时的效果
        },

        /*---- 魔法 ----*/
        mp: {
          intrinsic: 72,
          _intrinsic: 0,
          total: 0,
          wasting: 0,
          gains: []
        },

        physicalAttack: {
          intrinsic: 30,
          _intrinsic: 0,
          gains: [],
        },

        physicalDefense: {
          intrinsic: 15,
          _intrinsic: 0,
          gains: [],
        },

        magicAttack: {
          intrinsic: 20,
          _intrinsic: 0,
          gains: [],
        },

        magicDefense: {
          intrinsic: 20,
          _intrinsic: 0,
          gains: []
        }
      },

      /*---- 资产 ----*/
      currency: 0,

      /*---- 等级 ----*/
      level: 1
    },

    /*---- 玩家描述 ----*/
    description: '',

    /*---- 玩家装备 ----*/
    equipments: {
      head: {},
      body: {},
      hand: {},
      foot: {},
      weapon: {}
    },

    /*---- 技能 ----*/
    skills: [],

    /*---- 资源 ----*/
    res: {
      space: {
        max: 30,
        current: 0
      },
      lists: [
        /*{
         id:0,
         count:12
       }*/
      ]
    },

    //对应任务的类型，是否需要收集物品，是否需要击杀指定数量的monster，
    tasks: {
      lists: {
        /*0: {
          type: 1,
          monsters: [{id:1,count:1},{id:2,count:1}],
          res: [{id:1,count:10}]
        }*/
      },
      //已完成的任务列表
      result: []
    },

    //是否死亡了
    isDie: false
  }
}

//----- Role -----//

//重设玩家的初始值
function resetRoleProperty(attributes) {
  util.each(attributes, (attr) => {
    attr._intrinsic = 0;
    attr._intrinsic += attr.intrinsic;
    //技能药物 增益
    util.each(attr.gains, (gainItem) => {
      attr._intrinsic += Math.round(attr._intrinsic * gainItem.gain);
    });
  });
}

//重新计算玩家所有的属性值
export function updateRoleProperty() {

  const attributes = this.property.attributes;

  //重设玩家的初始值
  resetRoleProperty(attributes);

  /*依赖装备属性计算*/
  util.each(this.equipments, (equipment) => {
    if (util.nullPlainObject(equipment)) return;
    const property = equipment.property;
    util.each(attributes, (attr, key) => {
      attr._intrinsic += property[key]._intrinsic || 0;
    });
  });

  //扣除伤害
  util.each(attributes, (attr, key) => {
    if (key === 'hp' || key === 'mp') {
      attr.total = attr._intrinsic;
      if (attr.total + attr.wasting < 0) {
        attr.wasting = -attr.total;
      }
      attr._intrinsic += attr.wasting;
    }
  });

  updateDieStatus.call(this);

}

//更新isDie状态
function updateDieStatus() {
  const hp = this.property.attributes.hp;
  this.isDie = (hp.total + hp.wasting === 0);
}

//----- Role End -----//

//----- Task -----//

//更新任务monster累计
function updateTaskMonster(opts) {
  if (opts.monster) {
    ++opts.monster.count;
  }
}

//更新任务res累计
function updateTaskRes(opts) {
  if (opts.res) {
    opts.res.count = opts.count;
  }
}

//更新任务状态
export function updateTaskStatus(opts) {

  //all tasks
  const allTasks = this.$game.getTasks(),
    //role tasks
    roleTasks = this.tasks.lists;

  //遍历用户任务
  util.each(roleTasks, (roleTask, taskId) => {

    const roleTaskRes = roleTask.res,         //查看当前任务res所需
      roleTaskMonsters = roleTask.monsters,   //查看当前任务monster所需
      currentTask = allTasks[taskId];         //当前任务列表中的任务

    switch (currentTask.type) {
      case 1:
        //跑腿任务直接跳下一个任务状态
        currentTask.status = 2;
        break;
      case 2:
        //击杀 &| 收集任务
        let resStatus = true,
          monsterStatus = true;

        //检查res是否符合任务要求
        util.each(roleTaskRes, (res) => {

          //这里的任务所需的资源id
          const resId = res.id,
            //从角色查找对应的id的物品详情
            findRoleRes = findSameRes.apply(this, [res, true, false]);

          /* 用户没有这个资源，直接跳出 */
          if (findRoleRes.res.length === 0) {
            resStatus = false;
            return;
          }

          //更新任务中的资源数量
          updateTaskRes.call(this, {
            res,
            count: findRoleRes.count
          });

          //用户资源 <= 任务资源
          if (findRoleRes.count < currentTask.getTaskResCount(resId)) {
            resStatus = false;
          }

        });

        //检查monster是否符合任务要求
        util.each(roleTaskMonsters, (monster) => {

          const monsterId = monster.id;

          //如果存在monster id 更新monster击杀数，往下将更新任务状态
          if (opts.monsterId == monsterId &&
            monster.count < currentTask.getTaskMonstersCount(monsterId)) {
            updateTaskMonster.call(this, { monster });
          }
          //用户击杀 < 任务怪物击杀总数
          if (monster.count < currentTask.getTaskMonstersCount(monsterId)) {
            monsterStatus = false;
          }
        });

        //改变当前任务状态
        currentTask.status = (resStatus && monsterStatus) ? 2 : 1;
        break;
      default:
        ;
    }
  });

  //更新npc状态
  updateNpcsTasksStatus.call(this);
}

//更新npc的任务状态
function updateNpcsTasksStatus() {
  const allNpcs = this.$game.getNpcs();

  util.each(allNpcs, (npc) => {

    const npcTasks = npc.getTasks();

    //重新设置npc的r任务状态
    npc.resetTaskStatus();

    const taskStatus = npc.taskStatus;

    util.each(npcTasks, (task) => {
      //"?"存在未领取的任务，橙色
      if (!taskStatus.hasTask
        && task.status === 0) {
        taskStatus.hasTask = true;
      } else if (!taskStatus.hasUnfinishedTask
        && task.status === 1) {
        //"?"存在未完成的任务，灰色
        taskStatus.hasUnfinishedTask = true;
      } else if (!taskStatus.hasResultTask
        && task.status === 2) {
        //"!"存在完成未提交的任务任务，橙色
        taskStatus.hasResultTask = true;
      }
    });
  });
}

//接受任务
export function receiveTask(task) {
  const roleTasks = this.tasks.lists;
  const Vue = this.$game.Vue;
  if (roleTasks[task.id]) return false;
  if (task.type === 1) {
    roleTasks[task.id] = {};
  } else if (task.type === 2) {

    const taskDetails = task.details,
      monsters = [],
      res = [];

    //初始化玩家任务怪物数据
    util.each(taskDetails.monsters, (details) => {
      monsters.push({
        id: details.id,
        count: 0,
        taskCount: details.count
      });
    });

    //初始化玩家任务资源数据
    util.each(taskDetails.res, (details) => {
      res.push({
        id: details.id,
        count: 0,
        taskCount: details.count
      });
    });

    const roleTask = {
      monsters,
      res
    };

    if (Vue) {
      Vue.set(this.tasks.lists, task.id, roleTask);
    } else {
      roleTasks[task.id] = roleTask;
    }
  }

  //更新任务状态
  this.updateTaskStatus();
}

//任务依赖资源移除
export function removeRoleTaskRes(task) {
  const taskRes = task.details.res;
  util.each(taskRes, (res) => {
    resRemove.apply(this, [res, res.count]);
  });
  this.updateResSpace();
}

//----- Task End -----//


//----- Res -----//

// role buy res
export function buy(res, amount) {

  const game = this.$game,
    allRes = game.getRes(),
    property = this.property,
    currency = property.currency,
    goodsPrice = parseFloat((res.price * amount).toFixed());

  if (currency < goodsPrice) return false;

  //够钱买东西
  property.currency -= goodsPrice;

  resCapacity.apply(this, [res, amount, allRes[res.id].capacity]);

}

//是否有多余背包的空间
export function hasResSpace() {
  const roleRes = this.res,
    game = this.$game,
    len = updateResSpace.call(this);  //顺便更新一下背包数量
  if (len < roleRes.space.max) {
    return true;
  }
  game.gameResources.res.hooks.notResSpace.call(game);
  return false;
}

//更新用户的背包可用数
export function updateResSpace() {
  const len = this.res.lists.length;
  this.res.space.current = len;
  return len;
}

//更新分配资源
function updateRewardRes(res) {

  /* 没有背包空间 */
  if (!hasResSpace.call(this)) return false;

  //游戏加载的资源
  const game = this.$game,
    allRes = game.getRes();

  util.each(res, (_res) => {

    //从自身去找对应的物品
    const currentRes = allRes[_res.id];

    //没有配置的资源直接跳出
    if (!currentRes) return;

    resCapacity.apply(this, [util.extend(currentRes, _res), _res.count, currentRes.capacity]);

  });
  this.updateResSpace();
}

//资源容量分配
export function resCapacity(res, count, capacity) {

  const { Equipment } = game.constructor.Engine;

  res = util.deepCopy(res);

  if (res.type === 2) {
    while (count--) {
      res.id += `-${getRandomId()}`;
      this.res.lists.push(Equipment.updateEquipment(res));
    }
  } else {

    const getRes = findSameRes.call(this, res);

    let _count = count;

    for (let i = 0; i < getRes.length; i++) {
      const _res = getRes[i];
      if (_res.count === capacity) {
        continue;
      } else if (_res.count + _count > capacity) {
        _count -= (capacity - _res.count);
        _res.count = capacity;
      } else {
        _res.count += _count;
        _count = 0;
      }
    }

    if (_count > 0) {
      this.res.lists.push({
        id: res.id,
        count: 0,
        isBinding: res.isBinding
      });
      resCapacity.apply(this, [res, _count, capacity]);
    }
  }
}

//查找同一个物品在自身背包
export function findSameRes(res, isGetCount = false, checkBinding = true) {
  const findRes = [];
  let count = 0;
  if (res.type === 2) return findRes;
  this.res.lists.forEach((_res) => {
    //检查id的同时，检查看是否为绑定的
    if ((_res.id == res.id) && (checkBinding ? !!(_res.isBinding) == res.isBinding : true)) {
      findRes.push(_res);
      count += _res.count;
    }
  });
  if (isGetCount) {
    return {
      res: findRes,
      count
    };
  }
  return findRes;
}

//获取随机的id,为了区分装备类查找的相同性
function getRandomId() {
  const time = new Date(),
    randomNumber = (Math.random() * 1000).toFixed(0);
  return `${time.getTime()}:${randomNumber}`;
}

//资源的移除
export function resRemove(res, count) {
  const roleAllRes = this.res.lists;
  const roleRes = this.findSameRes(res, false, false);
  for (let i = 0; i < roleRes.length; i++) {
    const _res = roleRes[i],
      index = roleAllRes.indexOf(_res);
    //如果当前的资源不够相抵，下一个资源抵扣
    if (count - _res.count >= 0) {
      roleAllRes.splice(index, 1);
      count -= _res.count;
    } else if (count - _res.count < 0) {
      _res.count -= count;
    }
  }
}

//----- Res End -----//

//----- Skill -----//

//足够的技能消耗
//@return {Boolean}
export function isAdequateSkillConsume(skill) {
  const attributes = this.property.attributes,
    { hp: skillHp, mp: skillMp } = skill.consume,
    { hp, mp } = attributes;
  if (hp._intrinsic - skillHp > 0 && mp._intrinsic - skillMp >= 0) {
    return true;
  }
  return false;
}

//升级->提升特性
function advanceProperty() {
  const property = this.property,
    attributes = property.attributes;

  /* 特性的属性 */
  util.each(attributes, (attr) => {
    const intrinsic = attr.intrinsic;
    attr.intrinsic = Math.round(intrinsic + (intrinsic * 0.2));
  });
}

//查找增益效果
function findGain(gains, type, id) {
  let i = 0;
  for (; i < gains.length; i++) {
    const gain = gains[i];
    if (gain.type === type && gain.id === id) {
      return i;
    }
  }
  return -1;
}

//hp || mp || exp 效果处理
function recover(recover, effect, name) {
  if (name === 'hp' || name === 'mp') {
    if (recover.wasting === 0) return;
    if ((effect += recover.wasting) > 0) {
      recover.wasting = 0;
    } else {
      recover.wasting = effect;
    }
  } else if (name === 'exp') {
    updateLevel.call(this, effect);
  }
  this.updateRoleProperty();
}

//使用技能
export function useSkill(skill, isCounterattack) {

  //扣除技能的消耗
  deductSkillConsume.call(this, skill);

  const roleAttributes = this.property.attributes,
    current = this.current,
    fight = current.fight,
    enemy = fight.enemy,
    id = skill.id;

  //敌方是否已经阵亡
  if (enemy.isDie) return;

  // 攻击的状态，只能攻击一次，
  // 针对的是物理攻击还是魔法攻击的，
  // 设定用户的技能的时候只能设置一个，
  // 不然攻击可能是物理的，可能是魔法的
  let skillStatus = true;

  //check attack name
  const attackName = (function () {
    const PHYSICAL_ATTACK_NAME = 'physicalAttack',
      MAGIC_ATTACK_NAME = 'magicAttack';
    const magicAttack = skill.property[MAGIC_ATTACK_NAME];
    if (magicAttack.effect !== 0) {
      return MAGIC_ATTACK_NAME;
    } else {
      return PHYSICAL_ATTACK_NAME;
    }
  })();

  //use skill
  util.each(skill.property, (skillAttributes, name) => {

    if (skillAttributes.gain !== 0) {
      setGain(this, skillAttributes, roleAttributes, 'skill', name, id);
    }

    if ((name === 'hp' || name === 'mp') &&
      skillAttributes.effect !== 0) {
      recover.call(this, roleAttributes[name], skillAttributes.effect, name);
    } else if ((name === attackName) && skillStatus) {
      isCounterattack = attack(this, fight.enemy, skillAttributes.effect, name, isCounterattack);
      skillStatus = false;
    }

  });

  //enemy attack role
  if (isCounterattack) {
    enemy.skill(enemy.getSkills()[0], false);
  }
}

//扣除技能的消耗
function deductSkillConsume(skill) {
  const attributes = this.property.attributes,
    { hp: skillHp, mp: skillMp } = skill.consume,
    { hp, mp } = attributes;
  hp.wasting += -skillHp;
  mp.wasting += -skillMp;
}

//攻击
function attack(role, enemy, effect, name, isCounterattack) {
  const roleAttributes = role.property.attributes,
    enemyAttributes = enemy.property.attributes,
    rolePhysicalAttack = roleAttributes.physicalAttack,
    roleSpellAttack = roleAttributes.magicAttack,
    enemyPhysicalDefense = enemyAttributes.physicalDefense,
    enemySpellDefense = enemyAttributes.magicDefense;
  if (name === 'physicalAttack') {
    return hurt(role, enemy, effect, rolePhysicalAttack, enemyPhysicalDefense, isCounterattack);
  } else if (name === 'magicAttack') {
    return hurt(role, enemy, effect, roleSpellAttack, enemySpellDefense, isCounterattack);
  }
}

//攻击伤害
function hurt(role, enemy, effect, attack, defense, isCounterattack) {
  const game = role.$game,
    enemyAttributes = enemy.property.attributes,
    enemyHp = enemyAttributes.hp,
    attackIntrinsic = attack._intrinsic,
    defenseIntrinsic = defense._intrinsic;

  //@hooks fight hurt
  //return hurt
  let enemyHarm = game.gameResources.skills.hooks.hurt.apply(game, [attackIntrinsic, effect, defenseIntrinsic]);

  //没有伤害，直接扣1血
  if (enemyHarm < 0) {
    enemyHarm = 1;
  }

  if (enemyHarm >= enemyHp._intrinsic) {
    role.current.fight.enemyHarm = -(enemyHp.total + enemyHp.wasting);
    enemyHp.wasting = -enemyHp.total;
    die(role, enemy);
    isCounterattack = false;
  } else {
    role.current.fight.enemyHarm = -enemyHarm;
    enemyHp.wasting += -enemyHarm;
  }

  enemy.updateRoleProperty();

  return isCounterattack;
}

//战斗阵亡
//role 战斗中的攻击角色
//enemy 敌对
function die(role, enemy) {
  const game = enemy.$game,
    my = game.my,
    monstersHook = game.gameResources.monsters.hooks,
    roleHook = game.gameResources.roles.hooks,
    currentRole = my.role;  //当前的玩家

  //玩家被击杀了
  if (currentRole === enemy) {
    //角色被击杀钩子，（被杀，杀）
    roleHook.die.call(game, {
      role: currentRole,
      enemy: role
    });
  } else if (enemy.isMonster) {
    //野怪被击杀了,添加野怪奖励
    updateReward.apply(currentRole, [
      enemy.reward.exp,
      enemy.reward.currency,
      enemy.reward.res
    ]);
    currentRole.updateTaskStatus({
      monsterId: enemy.id
    });
    //怪物被击杀钩子
    monstersHook.die.call(game, {
      enemy,
      role: currentRole
    });
  } else {
    /*这里是其他玩家被击杀*/
  }
}

//----- Skill End -----//

//----- Level -----//

//更新等级
function updateLevel(exp) {
  while (exp) {
    const property = this.property,
      roleExp = property.exp,
      diffExp = roleExp.levelUp - roleExp.current;
    if (exp === diffExp || diffExp === 0) {
      roleExp.current = exp = 0;
      ++property.level;
      updateLevelUpExp.call(this);
    } else if (exp > diffExp) {
      roleExp.current = 0;
      exp -= diffExp;
      ++property.level;
      updateLevelUpExp.call(this);
    } else if (exp < diffExp) {
      roleExp.current += exp;
      exp = 0;
    }
  }

  //初始化玩家属性
  this.updateRoleProperty();
}

//更新升级后所需的经验
function updateLevelUpExp() {
  const game = this.$game,
    property = this.property,
    { hp, mp } = property.attributes,
    level = property.level;

  //更新等级升级所需
  property.exp.levelUp = level * level * 150;

  //hp和mp消耗初始化
  hp.wasting = mp.wasting = 0;

  //@hooks level up
  game.gameResources.roles.hooks.levelUp.apply(game);

  //提升属性
  advanceProperty.call(this);
}

//----- Level End -----//

//更新奖励
export function updateReward(exp, currency, res) {
  updateLevel.call(this, exp);
  updateCurrency.call(this, currency);
  updateRewardRes.call(this, res);
}

//更新分配金币
function updateCurrency(currency) {
  this.property.currency += currency;
}

//使用消耗品
export function useConsumable(roleRes) {
  const game = this.$game,
    roleAttributes = this.property.attributes,
    id = roleRes.id,
    index = this.res.lists.indexOf(roleRes),
    consumable = game.getRes(id);

  if (!roleRes) return false;
  if (roleRes.count > 0) --roleRes.count;
  if (roleRes.count === 0) this.res.lists.splice(index, 1);

  //消耗品的增益 && 消耗品恢复值
  util.each(consumable.property, (consumableAttributes, name) => {
    if (consumableAttributes.gain !== 0 &&
      consumableAttributes.time !== 0) {
      setGain(this, consumableAttributes, roleAttributes, 'consumable', name, id);
    }
    if (consumableAttributes.effect != null) {
      if ((name === 'hp' ||
          name === 'mp' ||
          name === 'exp')
        && consumableAttributes.effect !== 0) {
        recover.call(this, roleAttributes[name], consumableAttributes.effect, name);
      }
    }
  });
  return true;
}

//增益处理
function setGain(my, gainAttributes, roleAttributes, type, name, id) {
  //增益列表
  const gains = roleAttributes[name].gains;
  let findIndex;
  if ((findIndex = findGain(gains, type, id)) !== -1) {

    //药物增益延长时间
    if (type === 'consumable') {
      gains[findIndex].time += gainAttributes.time;
      return;
    }

    //原来增益的定时器清除
    clearTimeout(gains[findIndex].timer);

    //移除增益
    gains.splice(findIndex, 1);
  }

  let newGain = {
    id,
    name,
    type: type,
    gain: gainAttributes.gain,
    time: gainAttributes.time,
    timer: setTimeout(timer.bind(my), 1000)
  };

  function timer() {
    if (--newGain.time > 0) {
      newGain.timer = setTimeout(timer.bind(my), 1000);
    } else {
      clearTimeout(newGain.timer);
      newGain = null;
      //移除增益
      gains.splice(findGain(gains, type, id), 1);
      my.updateRoleProperty();
    }
  }

  gains.push(newGain);
  my.updateRoleProperty();
}

//强化装备
export function strengthen(equipment) {
  const game = this.$game,
    { Equipment } = game.constructor.Engine,
    strengthenRes = game.findStrengthenRes(equipment); //找到所需的强化物品

  for (let i = 0; i < strengthenRes.length; i++) {
    const _strengthenRes = strengthenRes[i],
      quantity = _strengthenRes.quantity,
      findRes = this.findSameRes(_strengthenRes, true, false);
    if (findRes.count < quantity) {
      return false;
    }
  }

  //移除强化所需物资
  strengthenRes.forEach((res) => {
    resRemove.call(this, res, res.quantity);
  });

  ++equipment.strengthen;

  Equipment.updateEquipment(equipment);

  return true;
}


























