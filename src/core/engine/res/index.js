/*
* 物资类
* */
import { getConfig } from './methods';
import util from '@util';
import Engine from '../index';

let uid = 1;

class Res extends Engine {
  constructor(opts = {}) {
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

export default Res;