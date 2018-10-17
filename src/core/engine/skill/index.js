/*
* 技能 类
* */

import util from '@util';
import { getConfig } from './methods';
import Engine from '../index';

let uid = 1;

class Skill extends Engine {
  constructor(opts) {
    super();
    this.$options = util.extend(getConfig(), opts);
    init.call(this);
  }
}

function init() {
  this.$map(this, this.$options);
  this.id = (this.id || uid++);
  delete this.$options;
}

export default Skill;