/*
* 消耗类
* */
import { getConfig } from './methods';
import util from '@util';
import Res from '../index';

//消耗 继承 资源
class Consumable extends Res {
  constructor(opts = {}) {
    super(util.extend(getConfig(), opts));
    init.call(this);
  }
}

function init() {
  this.$map(this, this.$options);
  delete this.$options;
}

export default Consumable;