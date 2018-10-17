/*
* 装备类
* */
import { getConfig, updateEquipment } from './methods';
import util from '@util';
import Res from '../index';

//Equipment extends Res
class Equipment extends Res {
  constructor(opts = {}) {
    super(util.extend(getConfig(), opts));
    init.call(this);
  }

  updateEquipment(){
    return updateEquipment(this);
  }
}

function init() {
  this.$map(this, this.$options);
  this.updateEquipment();
  delete this.$options;
}

Equipment.updateEquipment = updateEquipment;

export default Equipment;