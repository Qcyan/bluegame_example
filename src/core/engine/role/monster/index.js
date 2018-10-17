/*
* 怪物 类
* */
import util from '@util';
import Role from '../index';
import { getConfig } from './methods';

let uid = 1;

class Monster extends Role {
  constructor(opts = {}) {
    super(util.extend(getConfig(), opts));
    init.call(this);
  }
}

function init() {

  this.$map(this, this.$options);

  this.id = (this.id || uid++);

  delete this.$options;
}

export default Monster;