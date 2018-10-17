//main
import util from '@util';
import Base from '../base';
import Storage from '../storage';
import {
  getConfig,
  updateCurrentMap,
  updateCurrentNpcs
} from './methods';

import {
  initRes,
  initMy,
  initSkillsGain,
  initStrengthen,
  filterTaskHasEquipment
} from './init';

let isInstance = false;

let gameInstance = null;

class BlueGame extends Base {
  constructor(opts = {}) {
    super();
    if (this.constructor !== BlueGame) {
      return new BlueGame(opts);
    } else if (isInstance) {
      return gameInstance;
    }
    isInstance = true;
    gameInstance = this;
    init.call(this, opts);
  }

  //go map
  goMap(mapId) {

    //update current map
    updateCurrentMap.call(this, mapId);

    //update current map has npcs
    updateCurrentNpcs.call(this);

    //update all tasks status
    if (this.my.role) this.my.role.updateTaskStatus();

    //@hooks go map
    this.gameResources.maps.hooks.goMap.call(this, { map: this.getMaps()[mapId] });
  }

  //get id in map or all map
  getMaps(mapId) {
    const allMaps = this.gameResources.maps.lists;
    if (mapId) {
      return allMaps[mapId] || null;
    }
    return allMaps;
  }

  //get id in npc or all npcs
  getNpcs(npcId) {
    const allNpcs = this.gameResources.npcs.lists;
    if (npcId) {
      return allNpcs[allNpcs] || null;
    }
    return allNpcs;
  }

  //get id in res or all res
  getRes(resId) {
    const allRes = this.gameResources.res.lists;
    if (resId) {
      return allRes[resId] || null;
    }
    return allRes;
  }

  //get id in tasks or all tasks
  getTasks(taskId) {
    const allTasks = this.gameResources.tasks.lists;
    if (taskId) {
      return allTasks[taskId] || null;
    }
    return allTasks;
  }

  //get id in tasks or all tasks
  getSkills(skillId) {
    const allSkills = this.gameResources.skills.lists;
    if (skillId) {
      return allSkills[skillId] || null;
    }
    return allSkills;
  }

  //get game monster in id
  getMonsters(monsterId) {
    const allMonsters = this.gameResources.monsters.lists;
    if (monsterId) {
      return allMonsters[monsterId] || null;
    }
    return allMonsters;
  }

  //set vm in game
  setVueInstance(vueInstance) {
    this.$vm = vueInstance;
  }

  // add role in game.my.allRoles
  addMyRole(role) {
    this.my.allRoles.push(role);
  }

  //set current role
  setCurrentRole(role) {
    this.my.role = role;
  }

  //find equipment strengthen the res
  findStrengthenRes(equipment) {
    const strengthen = equipment.strengthen;
    const gameRes = this.gameResources.res,
      rules = gameRes.upgrade.strengthen.rules,
      ruleRes = [];

    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i];
      if (rule.strengthen > strengthen) {
        ruleRes.push(rule.res);
      }
    }
    return ruleRes[ruleRes.length - 1] || [];
  }
}

/*storage methods in Game*/
BlueGame.local = BlueGame.prototype.local = new Storage({ type: 'local' });

BlueGame.session = BlueGame.prototype.session = new Storage({ type: 'session' });

function init(opts) {

  //mount $game attribute in base prototype
  Object.defineProperty(Base.prototype, '$game', {
    enumerable: false,
    value: this
  });

  this.$options = util.extend(getConfig(), opts);

  //init engine res
  initRes.call(this);

  //filter task has equipment
  filterTaskHasEquipment.call(this);

  //init all skills has gain status
  initSkillsGain.call(this);

  //init strengthen res in game
  initStrengthen.call(this);

  //init role state
  initMy.call(this);

  delete this.$options;
}

export default BlueGame;