/*
* 地图类
* */

import { getConfig } from './methods';
import util from '@util';
import Engine from '../index';

let uid = 1;

class Map extends Engine {
  constructor(opts = {}) {
    super();
    this.$options = util.extend(getConfig(), opts);
    init.call(this);
  }

  //获取当前所有的地图
  getMaps() {
    const allMaps = this.$game.getMaps();
    return util.each(this.maps, (mapUid) => {
      return allMaps[mapUid];
    }, true);
  }

  //获取当前的npc
  getNpcs() {
    const allNpcs = this.$game.getNpcs();
    return util.each(this.npcs, (npcUid) => {
      return allNpcs[npcUid];
    }, true);
  }

  getMonsters() {
    const allMonsters = this.$game.getMonsters();
    return util.each(this.monsters, (monsterUid) => {
      return allMonsters[monsterUid];
    }, true);
  }

}

function init() {
  this.$map(this, this.$options);
  this.id = (this.id || uid++);
  delete this.$options;
}

export default Map;