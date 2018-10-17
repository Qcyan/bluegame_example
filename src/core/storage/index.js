/*
* storage数据存储
* */

class Storage {
  constructor(opts) {
    this.$options = opts;
    init.call(this);
  }

  getItem(key) {
    return this.storage.getItem(key);
  }

  setItem(key, val) {
    this.storage.setItem(key, val);
    return this;
  }

  removeItem(key) {
    this.storage.removeItem(key);
    return this;
  }

  key(key) {
    return this.storage.key(key);
  }

  clear() {
    this.storage.clear();
  }

}

function init() {
  const { type } = this.$options;
  this.storage = window[`${type}Storage`] || localStorage;
}

export default Storage;