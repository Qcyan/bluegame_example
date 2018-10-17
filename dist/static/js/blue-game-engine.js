/*!
 * 
 * blue-game-engine.js 1.0.0
 * (c) 2016-2017 Blue
 * Released under the MIT License.
 * https://github.com/azhanging/blue-game-engine
 * time:Sun, 15 Jul 2018 10:38:11 GMT
 * 		
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["BlueGame"] = factory();
	else
		root["BlueGame"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./static";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dom__ = __webpack_require__(8);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var Util = function (_Dom) {
  _inherits(Util, _Dom);

  function Util() {
    _classCallCheck(this, Util);

    return _possibleConstructorReturn(this, (Util.__proto__ || Object.getPrototypeOf(Util)).call(this));
  }

  _createClass(Util, [{
    key: 'nullPlainObject',
    value: function nullPlainObject(val) {
      return JSON.stringify(val) === "{}";
    }
  }, {
    key: 'isStr',
    value: function isStr(val) {
      return typeof val === 'string';
    }
  }, {
    key: 'isPlainObject',
    value: function isPlainObject(val) {
      return val && val !== null && val.toString() === '[object Object]';
    }
  }, {
    key: 'isArray',
    value: function isArray(val) {
      return val instanceof Array;
    }
  }, {
    key: 'isObjcet',
    value: function isObjcet(val) {
      return this.isPlainObject(val) || this.isArray(val);
    }
  }, {
    key: 'isDef',
    value: function isDef(val) {
      return val !== undefined && val !== null;
    }
  }, {
    key: 'isUndef',
    value: function isUndef(val) {
      return val === undefined || val === null;
    }
  }, {
    key: 'isBlankSpace',
    value: function isBlankSpace(val) {
      return val.trim().length === 0;
    }
  }, {
    key: 'isTrue',
    value: function isTrue(bool) {
      return bool === true;
    }
  }, {
    key: 'isFalse',
    value: function isFalse(bool) {
      return bool === false;
    }
  }, {
    key: 'run',
    value: function run(context) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
      var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

      callback.apply(context, args);
    }
  }, {
    key: 'each',
    value: function each(obj, cb) {
      var isReturn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (this.isUndef(obj)) return;
      var i = 0,
          index = 0,
          newVal = [];

      var len = obj.length;

      if (this.isArray(obj)) {
        for (; i < len; i++) {
          if (isReturn) {
            newVal.push(cb(obj[i], i));
          } else {
            cb(obj[i], i);
          }
        }
      } else {
        for (i in obj) {
          if (!obj.hasOwnProperty(i)) continue;
          if (isReturn) {
            newVal.push(cb(obj[i], i, index++));
          } else {
            cb(obj[i], i, index++);
          }
        }
      }

      if (isReturn) return newVal;
    }
  }, {
    key: 'definePropertyVal',
    value: function definePropertyVal(obj, key, val) {
      Object.defineProperty(obj, key, {
        configurable: false,
        enumerable: false,
        value: val
      });
    }
  }, {
    key: 'deepCopy',
    value: function deepCopy(obj) {
      if (!obj || !(obj instanceof Array) && !(obj.toString() === "[object Object]")) return obj;
      var _obj = obj instanceof Array ? [] : {};
      for (var key in obj) {
        if (!obj.hasOwnProperty(key)) continue;
        if (obj instanceof Array || obj instanceof Object) {
          _obj[key] = this.deepCopy(obj[key]);
        } else {
          _obj[key] = obj[key];
        }
      }
      return _obj;
    }
  }, {
    key: 'extend',
    value: function extend(object, _object) {
      var _this2 = this;

      object = this.deepCopy(object);

      var oldObjKeys = this.each(object, function (obj, key) {
        return key;
      }, true);

      this.each(_object, function (obj, key) {

        var findIndexInOld = oldObjKeys.indexOf(key);
        if (findIndexInOld != -1) {
          oldObjKeys.splice(findIndexInOld, 1);
        }

        if (_this2.isPlainObject(obj)) {
          if (!object[key]) {
            object[key] = {};
          }
          _this2.extend(object[key], obj);
        }
        object[key] = obj;
      });

      this.each(oldObjKeys, function (key) {
        _object[key] = object[key];
      });

      return object;
    }

    //把当前key-value复制到对应对象的key-value上

  }, {
    key: 'copy',
    value: function copy(object, _object) {
      util.each(_object, function (obj, key) {
        object[key] = obj;
      });
    }

    //获取表达式

  }, {
    key: 'getRegExp',
    value: function getRegExp(expr) {
      var tm = '\\/*.?+$^[](){}|\'\"';
      this.each(tm, function (tmItem, index) {
        expr = expr.replace(new RegExp('\\' + tmItem, 'g'), '\\' + tmItem);
      });
      return expr;
    }
  }, {
    key: 'getObjLen',
    value: function getObjLen(obj) {
      var index = 0;
      this.each(obj, function () {
        ++index;
      });
      return index;
    }
  }]);

  return Util;
}(__WEBPACK_IMPORTED_MODULE_0__dom__["a" /* default */]);

var util = new Util();

/* harmony default export */ __webpack_exports__["a"] = (util);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(3);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var Engine = function (_Base) {
  _inherits(Engine, _Base);

  function Engine() {
    _classCallCheck(this, Engine);

    return _possibleConstructorReturn(this, (Engine.__proto__ || Object.getPrototypeOf(Engine)).call(this));
  }

  return Engine;
}(__WEBPACK_IMPORTED_MODULE_0__base__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (Engine);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__methods__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index__ = __webpack_require__(1);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
* 物资类
* */




var uid = 1;

var Res = function (_Engine) {
  _inherits(Res, _Engine);

  function Res() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Res);

    var _this = _possibleConstructorReturn(this, (Res.__proto__ || Object.getPrototypeOf(Res)).call(this));

    _this.$options = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].extend(Object(__WEBPACK_IMPORTED_MODULE_0__methods__["a" /* getConfig */])(), opts);
    init.call(_this);
    return _this;
  }

  return Res;
}(__WEBPACK_IMPORTED_MODULE_2__index__["a" /* default */]);

function init() {
  this.$map(this, this.$options);
  this.id = this.id || uid++;
  delete this.$options;
}

/* harmony default export */ __webpack_exports__["a"] = (Res);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Base = function () {
  function Base() {
    _classCallCheck(this, Base);
  }

  _createClass(Base, [{
    key: "$property",
    value: function $property(constructor, name, property) {
      constructor[name] = property;
    }
  }, {
    key: "$map",
    value: function $map(object, _object) {
      for (var key in _object) {
        if (!_object.hasOwnProperty(key)) continue;
        object[key] = _object[key];
      }
    }
  }]);

  return Base;
}();

;

/* harmony default export */ __webpack_exports__["a"] = (Base);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__methods__ = __webpack_require__(17);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
* npc类
* */





var Role = function (_Engine) {
  _inherits(Role, _Engine);

  function Role() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Role);

    var _this = _possibleConstructorReturn(this, (Role.__proto__ || Object.getPrototypeOf(Role)).call(this));

    _this.$options = __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].extend(Object(__WEBPACK_IMPORTED_MODULE_2__methods__["c" /* getConfig */])(), opts);
    init.call(_this);
    return _this;
  }

  //获取资源


  _createClass(Role, [{
    key: 'getRes',
    value: function getRes(id) {
      var _this2 = this;

      var game = this.$game,
          allRes = game.getRes(),
          roleRes = this.res.lists;

      /* 根据具体的id查询自身的资源 */
      if (id) {
        for (var i = 0; i < roleRes.length; i++) {

          var res = roleRes[i],
              _res = allRes[id];

          //是需要查询的资源
          if (!(res.id === id)) continue;

          //装备直接返回背包的属性
          if (res.type === 2) {
            return {
              res: res,
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

      return __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].each(roleRes, function (_res, i) {

        var id = _res.id.toString().split('-')[0];

        var res = allRes[id];

        if (res.type === 2) {
          return _this2.getRes(_res.id);
        } else {
          return {
            res: res,
            roleRes: _res //用户具体的数据 {id:1,count:1}
          };
        }
      }, true);
    }
  }, {
    key: 'findSameRes',
    value: function findSameRes(res, isGetCount, cheakcBinding) {
      return __WEBPACK_IMPORTED_MODULE_2__methods__["b" /* findSameRes */].apply(this, [res, isGetCount, cheakcBinding]);
    }

    //获取玩家的技能

  }, {
    key: 'getSkills',
    value: function getSkills(skillId) {
      var _this3 = this;

      var allSkills = this.$game.getSkills();
      if (skillId) {
        var skill = allSkills[skillId];
        if (skill && skill.level <= this.property.level) {
          return skill;
        }
        return {};
      }
      var skills = [];
      __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].each(this.skills, function (skillUid) {
        var skill = allSkills[skillUid];
        if (!skill || skill.level > _this3.property.level) return;
        skills.push(skill);
      });
      return skills;
    }

    //获取任务当前的任务

  }, {
    key: 'getTasks',
    value: function getTasks() {
      var allTasks = this.$game.getTasks();
      return __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].each(this.tasks.lists, function (task, taskId) {
        return allTasks[taskId];
      }, true);
    }

    //获取指定任务中怪物的数量

  }, {
    key: 'getTaskMonstersCount',
    value: function getTaskMonstersCount(id, monsterId) {
      var task = this.tasks.lists[id];
      if (!task) return 0;
      var monsters = task.monsters;
      for (var i = 0; i < monsters.length; i++) {
        var monster = monsters[i];
        if (monsterId == monster.id) {
          return monster.count;
        }
      }
    }

    //更新角色当前的任务状态，击杀怪物后（获得物品），获取资源调用更新

  }, {
    key: 'updateTaskStatus',
    value: function updateTaskStatus() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { monsterId: 0 };

      __WEBPACK_IMPORTED_MODULE_2__methods__["l" /* updateTaskStatus */].call(this, opts);
    }

    //接受任务

  }, {
    key: 'receiveTask',
    value: function receiveTask(task) {
      var game = this.$game;
      __WEBPACK_IMPORTED_MODULE_2__methods__["f" /* receiveTask */].call(this, task);
      //@hooks submitTask
      game.gameResources.tasks.hooks.receiveTask.call(game, { task: task });
      return this;
    }

    //取消任务

  }, {
    key: 'cancelTask',
    value: function cancelTask(task) {
      var roleTasks = this.tasks.lists,
          game = this.$game;
      if (!roleTasks[task.id]) return false;
      delete roleTasks[task.id];
      task.status = 0;
      this.updateTaskStatus();
      //@hooks submitTask
      game.gameResources.tasks.hooks.cancelTask.call(game, { task: task });
    }

    //提交任务

  }, {
    key: 'submitTask',
    value: function submitTask(task) {
      if (!(task.status === 2)) return false;
      var reward = task.reward,
          game = this.$game;
      task.status = 3;
      __WEBPACK_IMPORTED_MODULE_2__methods__["g" /* removeRoleTaskRes */].call(this, task);
      this.tasks.result.push(task.id);
      delete this.tasks.lists[task.id];
      __WEBPACK_IMPORTED_MODULE_2__methods__["j" /* updateReward */].apply(this, [reward.exp, reward.currency, reward.res]);
      this.updateTaskStatus();

      //@hooks submitTask
      game.gameResources.tasks.hooks.submitTask.call(game, { task: task });
    }

    //更新玩家的属性特性

  }, {
    key: 'updateRoleProperty',
    value: function updateRoleProperty() {
      __WEBPACK_IMPORTED_MODULE_2__methods__["k" /* updateRoleProperty */].call(this);
    }

    //穿上装备

  }, {
    key: 'equip',
    value: function equip(equipment) {

      /* 没有背包空间 */
      if (!__WEBPACK_IMPORTED_MODULE_2__methods__["d" /* hasResSpace */].call(this)) {
        return false;
      }

      var roleRes = this.res.lists,
          game = this.$game,
          roleEquipments = this.equipments,
          inBodyEquipment = roleEquipments[equipment.classify];

      //假的装备吧?
      if (!equipment.classify && equipment.type !== 2) return false;

      //身上是否穿了衣服，脱下
      if (!__WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].nullPlainObject(inBodyEquipment)) {
        this.disboard(inBodyEquipment);
      }

      //穿到指定的位置上
      roleEquipments[equipment.classify] = equipment;

      //获取到装备在背包上具体的位置
      var index = roleRes.indexOf(equipment);

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

  }, {
    key: 'disboard',
    value: function disboard(equipment) {
      var game = this.$game;

      /* 没有背包空间 */
      if (!__WEBPACK_IMPORTED_MODULE_2__methods__["d" /* hasResSpace */].call(this)) {
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

  }, {
    key: 'skill',
    value: function skill(_skill) {
      var isCounterattack = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var game = _skill.$game;
      //检测是否够hp和mp的扣除
      if (__WEBPACK_IMPORTED_MODULE_2__methods__["e" /* isAdequateSkillConsume */].call(this, _skill)) {
        __WEBPACK_IMPORTED_MODULE_2__methods__["n" /* useSkill */].apply(this, [_skill, isCounterattack]);

        this.updateRoleProperty();

        //@hook skill
        game.gameResources.skills.hooks.use.call(game, { skill: _skill });

        return true;
      } else {
        return false;
      }
    }

    //使用消耗品

  }, {
    key: 'consumable',
    value: function consumable(roleRes) {
      var game = this.$game;

      var status = __WEBPACK_IMPORTED_MODULE_2__methods__["m" /* useConsumable */].call(this, roleRes);

      this.updateRoleProperty();

      this.updateTaskStatus();

      this.updateResSpace();

      //@hooks use res
      game.gameResources.res.hooks.consumable.call(game, { res: roleRes });

      return status;
    }

    //更新背包空间

  }, {
    key: 'updateResSpace',
    value: function updateResSpace() {
      __WEBPACK_IMPORTED_MODULE_2__methods__["i" /* updateResSpace */].call(this);
    }

    //购买物品

  }, {
    key: 'buy',
    value: function buy(res, amount) {
      if (!__WEBPACK_IMPORTED_MODULE_2__methods__["d" /* hasResSpace */].call(this)) return false;

      __WEBPACK_IMPORTED_MODULE_2__methods__["a" /* buy */].apply(this, [res, amount]);

      this.updateTaskStatus();

      this.updateResSpace();

      return true;
    }

    //丢弃物品

  }, {
    key: 'discard',
    value: function discard(res, amount) {
      var roleRes = this.res.lists,
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

  }, {
    key: 'strengthen',
    value: function strengthen(equipment) {
      return __WEBPACK_IMPORTED_MODULE_2__methods__["h" /* strengthen */].call(this, equipment);
    }

    //进入战斗场景

  }, {
    key: 'fight',
    value: function fight(enemy) {

      //如果角色已经死亡了，不能再进行战斗了
      if (this.isDie) return false;

      var Engine = this.$game.constructor.Engine;

      var Monster = Engine.Monster,
          current = this.current,
          fight = current.fight;

      //攻击对象为怪物
      if (enemy && enemy.isMonster) {

        //设置自己击杀的对象
        fight.enemy = new Monster(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].deepCopy(enemy));

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

  }, {
    key: 'clearFight',
    value: function clearFight() {
      var fight = this.current.fight;
      fight.enemy = null;
      fight.enemyHarm = 0;
    }

    //恢复体力
    //@proportion {Number} 0-1 恢复的比例

  }, {
    key: 'dieRecover',
    value: function dieRecover(proportion) {
      var attributes = this.property.attributes;
      attributes.hp.wasting = -(attributes.hp.total * (1 - proportion));
      this.updateRoleProperty();
    }
  }]);

  return Role;
}(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);

function init() {

  this.$map(this, this.$options);

  delete this.$options;

  this.updateRoleProperty();

  this.updateResSpace();

  this.clearFight();
}

/* harmony default export */ __webpack_exports__["a"] = (Role);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__webpack_hot__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__instance__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__engine__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__engine_map__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__engine_res__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__engine_skill__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__engine_role__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__engine_role_monster__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__engine_npc__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__engine_task__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__engine_res_equipment__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__engine_res_consumable__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__engine_res_strengthen__ = __webpack_require__(28);


/*Game and ENGINE*/



/*game constructor*/











/*GAME Static -> ENGINE*/
__WEBPACK_IMPORTED_MODULE_1__instance__["a" /* default */].Engine = __WEBPACK_IMPORTED_MODULE_2__engine__["a" /* default */];

/*ENGINE static methods class -> Map,Npc,Res,Skill,Role,Monster,Equipment,Consumable,Task*/
__WEBPACK_IMPORTED_MODULE_2__engine__["a" /* default */].Map = __WEBPACK_IMPORTED_MODULE_3__engine_map__["a" /* default */];
__WEBPACK_IMPORTED_MODULE_2__engine__["a" /* default */].Npc = __WEBPACK_IMPORTED_MODULE_8__engine_npc__["a" /* default */];
__WEBPACK_IMPORTED_MODULE_2__engine__["a" /* default */].Res = __WEBPACK_IMPORTED_MODULE_4__engine_res__["a" /* default */];
__WEBPACK_IMPORTED_MODULE_2__engine__["a" /* default */].Skill = __WEBPACK_IMPORTED_MODULE_5__engine_skill__["a" /* default */];
__WEBPACK_IMPORTED_MODULE_2__engine__["a" /* default */].Role = __WEBPACK_IMPORTED_MODULE_6__engine_role__["a" /* default */];
__WEBPACK_IMPORTED_MODULE_2__engine__["a" /* default */].Monster = __WEBPACK_IMPORTED_MODULE_7__engine_role_monster__["a" /* default */];
__WEBPACK_IMPORTED_MODULE_2__engine__["a" /* default */].Equipment = __WEBPACK_IMPORTED_MODULE_10__engine_res_equipment__["a" /* default */];
__WEBPACK_IMPORTED_MODULE_2__engine__["a" /* default */].Consumable = __WEBPACK_IMPORTED_MODULE_11__engine_res_consumable__["a" /* default */];
__WEBPACK_IMPORTED_MODULE_2__engine__["a" /* default */].Strengthen = __WEBPACK_IMPORTED_MODULE_12__engine_res_strengthen__["a" /* default */];
__WEBPACK_IMPORTED_MODULE_2__engine__["a" /* default */].Task = __WEBPACK_IMPORTED_MODULE_9__engine_task__["a" /* default */];

/*webpack hot*/
Object(__WEBPACK_IMPORTED_MODULE_0__webpack_hot__["a" /* default */])();

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_1__instance__["a" /* default */]);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = hot;
function hot() {
  if (false) {
    if (module.hot) {
      module.hot.accept();
    }
  }
}

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__storage__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__methods__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__init__ = __webpack_require__(11);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//main







var isInstance = false;

var gameInstance = null;

var BlueGame = function (_Base) {
  _inherits(BlueGame, _Base);

  function BlueGame() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, BlueGame);

    var _this = _possibleConstructorReturn(this, (BlueGame.__proto__ || Object.getPrototypeOf(BlueGame)).call(this));

    if (_this.constructor !== BlueGame) {
      var _ret;

      return _ret = new BlueGame(opts), _possibleConstructorReturn(_this, _ret);
    } else if (isInstance) {
      var _ret2;

      return _ret2 = gameInstance, _possibleConstructorReturn(_this, _ret2);
    }
    isInstance = true;
    gameInstance = _this;
    init.call(_this, opts);
    return _this;
  }

  //go map


  _createClass(BlueGame, [{
    key: 'goMap',
    value: function goMap(mapId) {

      //update current map
      __WEBPACK_IMPORTED_MODULE_3__methods__["b" /* updateCurrentMap */].call(this, mapId);

      //update current map has npcs
      __WEBPACK_IMPORTED_MODULE_3__methods__["c" /* updateCurrentNpcs */].call(this);

      //update all tasks status
      if (this.my.role) this.my.role.updateTaskStatus();

      //@hooks go map
      this.gameResources.maps.hooks.goMap.call(this, { map: this.getMaps()[mapId] });
    }

    //get id in map or all map

  }, {
    key: 'getMaps',
    value: function getMaps(mapId) {
      var allMaps = this.gameResources.maps.lists;
      if (mapId) {
        return allMaps[mapId] || null;
      }
      return allMaps;
    }

    //get id in npc or all npcs

  }, {
    key: 'getNpcs',
    value: function getNpcs(npcId) {
      var allNpcs = this.gameResources.npcs.lists;
      if (npcId) {
        return allNpcs[allNpcs] || null;
      }
      return allNpcs;
    }

    //get id in res or all res

  }, {
    key: 'getRes',
    value: function getRes(resId) {
      var allRes = this.gameResources.res.lists;
      if (resId) {
        return allRes[resId] || null;
      }
      return allRes;
    }

    //get id in tasks or all tasks

  }, {
    key: 'getTasks',
    value: function getTasks(taskId) {
      var allTasks = this.gameResources.tasks.lists;
      if (taskId) {
        return allTasks[taskId] || null;
      }
      return allTasks;
    }

    //get id in tasks or all tasks

  }, {
    key: 'getSkills',
    value: function getSkills(skillId) {
      var allSkills = this.gameResources.skills.lists;
      if (skillId) {
        return allSkills[skillId] || null;
      }
      return allSkills;
    }

    //get game monster in id

  }, {
    key: 'getMonsters',
    value: function getMonsters(monsterId) {
      var allMonsters = this.gameResources.monsters.lists;
      if (monsterId) {
        return allMonsters[monsterId] || null;
      }
      return allMonsters;
    }

    //set vm in game

  }, {
    key: 'setVueInstance',
    value: function setVueInstance(vueInstance) {
      this.$vm = vueInstance;
    }

    // add role in game.my.allRoles

  }, {
    key: 'addMyRole',
    value: function addMyRole(role) {
      this.my.allRoles.push(role);
    }

    //set current role

  }, {
    key: 'setCurrentRole',
    value: function setCurrentRole(role) {
      this.my.role = role;
    }

    //find equipment strengthen the res

  }, {
    key: 'findStrengthenRes',
    value: function findStrengthenRes(equipment) {
      var strengthen = equipment.strengthen;
      var gameRes = this.gameResources.res,
          rules = gameRes.upgrade.strengthen.rules,
          ruleRes = [];

      for (var i = 0; i < rules.length; i++) {
        var rule = rules[i];
        if (rule.strengthen > strengthen) {
          ruleRes.push(rule.res);
        }
      }
      return ruleRes[ruleRes.length - 1] || [];
    }
  }]);

  return BlueGame;
}(__WEBPACK_IMPORTED_MODULE_1__base__["a" /* default */]);

/*storage methods in Game*/


BlueGame.local = BlueGame.prototype.local = new __WEBPACK_IMPORTED_MODULE_2__storage__["a" /* default */]({ type: 'local' });

BlueGame.session = BlueGame.prototype.session = new __WEBPACK_IMPORTED_MODULE_2__storage__["a" /* default */]({ type: 'session' });

function init(opts) {

  //mount $game attribute in base prototype
  Object.defineProperty(__WEBPACK_IMPORTED_MODULE_1__base__["a" /* default */].prototype, '$game', {
    enumerable: false,
    value: this
  });

  this.$options = __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].extend(Object(__WEBPACK_IMPORTED_MODULE_3__methods__["a" /* getConfig */])(), opts);

  //init engine res
  __WEBPACK_IMPORTED_MODULE_4__init__["c" /* initRes */].call(this);

  //filter task has equipment
  __WEBPACK_IMPORTED_MODULE_4__init__["a" /* filterTaskHasEquipment */].call(this);

  //init all skills has gain status
  __WEBPACK_IMPORTED_MODULE_4__init__["d" /* initSkillsGain */].call(this);

  //init strengthen res in game
  __WEBPACK_IMPORTED_MODULE_4__init__["e" /* initStrengthen */].call(this);

  //init role state
  __WEBPACK_IMPORTED_MODULE_4__init__["b" /* initMy */].call(this);

  delete this.$options;
}

/* harmony default export */ __webpack_exports__["a"] = (BlueGame);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dom = function () {
  function Dom() {
    _classCallCheck(this, Dom);
  }

  _createClass(Dom, [{
    key: "outerHTML",
    value: function outerHTML(el) {
      return el.outerHTML;
    }
  }, {
    key: "getElm",
    value: function getElm(el) {
      return document.querySelector(el);
    }
  }, {
    key: "createElement",
    value: function createElement(tag) {
      return document.createElement(tag);
    }
  }, {
    key: "createTextNode",
    value: function createTextNode(text) {
      return document.createTextNode(text);
    }
  }, {
    key: "createComment",
    value: function createComment(comment) {
      return document.createComment(comment);
    }
  }, {
    key: "textContent",
    value: function textContent(el, _textContent) {
      el.textContent = _textContent;
    }
  }, {
    key: "insertBefore",
    value: function insertBefore(parent, el, exEl) {
      parent.insertBefore(el, exEl);
    }
  }, {
    key: "nextSibling",
    value: function nextSibling(el) {
      return el.nextSibling;
    }
  }, {
    key: "parent",
    value: function parent(el) {
      return el && el.parentNode || null;
    }
  }, {
    key: "remove",
    value: function remove(el) {
      el.remove();
    }
  }, {
    key: "setAttribute",
    value: function setAttribute(el, name, value) {
      el.setAttribute(name, value);
    }
  }, {
    key: "removeAttribute",
    value: function removeAttribute(el, name) {
      el.removeAttribute(name);
    }
  }]);

  return Dom;
}();

/* harmony default export */ __webpack_exports__["a"] = (Dom);

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
* storage数据存储
* */

var Storage = function () {
  function Storage(opts) {
    _classCallCheck(this, Storage);

    this.$options = opts;
    init.call(this);
  }

  _createClass(Storage, [{
    key: "getItem",
    value: function getItem(key) {
      return this.storage.getItem(key);
    }
  }, {
    key: "setItem",
    value: function setItem(key, val) {
      this.storage.setItem(key, val);
      return this;
    }
  }, {
    key: "removeItem",
    value: function removeItem(key) {
      this.storage.removeItem(key);
      return this;
    }
  }, {
    key: "key",
    value: function key(_key) {
      return this.storage.key(_key);
    }
  }, {
    key: "clear",
    value: function clear() {
      this.storage.clear();
    }
  }]);

  return Storage;
}();

function init() {
  var type = this.$options.type;

  this.storage = window[type + "Storage"] || localStorage;
}

/* harmony default export */ __webpack_exports__["a"] = (Storage);

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getConfig;
/* harmony export (immutable) */ __webpack_exports__["b"] = updateCurrentMap;
/* harmony export (immutable) */ __webpack_exports__["c"] = updateCurrentNpcs;
/*
* main methods
* */

//get game config
function getConfig() {
  return {
    config: {},
    current: {
      map: null,
      npcs: []
    },
    my: { //当前选择的角色
      role: null,
      allRoles: [],
      hooks: {}
    },
    gameResources: {
      roles: { //多个角色
        lists: [],
        hooks: {
          //role is die
          die: function die(opts) {},

          //level up hooks
          levelUp: function levelUp() {}
        }
      },
      monsters: {
        lists: {},
        hooks: {
          //野怪被击杀
          die: function die(opts) {}
        }
      },
      maps: {
        lists: {},
        hooks: {
          goMap: function goMap(opts) {
            //go map hooks
          }
        }
      },
      skills: {
        lists: {},
        hooks: {
          //fight hurt
          hurt: function hurt(attackIntrinsic, effect, defenseIntrinsic) {
            return Math.floor(attackIntrinsic + attackIntrinsic * effect - (Math.random() * 1 * defenseIntrinsic + defenseIntrinsic));
          },
          use: function use(opts) {}
        }
      },
      npcs: {
        lists: {},
        hooks: {}
      },
      res: {
        lists: {},
        upgrade: { //提升
          strengthen: { //强化装备
            rules: []
          },
          inlay: {} //镶嵌宝石
        },
        hooks: {
          equip: function equip(opts) {},
          disboard: function disboard(opts) {},
          consumable: function consumable(opts) {},
          notResSpace: function notResSpace(opts) {}
        }
      },
      tasks: {
        lists: {},
        hooks: {
          receiveTask: function receiveTask(opts) {},
          cancelTask: function cancelTask(opts) {},
          submitTask: function submitTask(opts) {}
        }
      }
    },
    Vue: null, //Vue构造
    $vm: null //vue实例
  };
}

//update role in map
function updateCurrentMap(mapId) {
  this.current.map = this.gameResources.maps.lists[mapId || 1];
  if (this.my.role) {
    this.my.role.current.map = mapId || 1;
  }
}

//update map has npcs
function updateCurrentNpcs() {
  var current = this.current,
      currentMap = current.map;
  current.npcs = currentMap ? current.map.getNpcs() : [];
}

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = initRes;
/* harmony export (immutable) */ __webpack_exports__["a"] = filterTaskHasEquipment;
/* harmony export (immutable) */ __webpack_exports__["b"] = initMy;
/* harmony export (immutable) */ __webpack_exports__["d"] = initSkillsGain;
/* harmony export (immutable) */ __webpack_exports__["e"] = initStrengthen;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);


//init game res
function initRes() {
  //base.prototype.$map
  this.$map(this, this.$options);
}

//init task has res in task detail,del res type === 2 data
function filterTaskHasEquipment() {
  var _this = this;

  var opts = this.$options;
  __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].each(opts.gameResources.tasks.lists, function (task) {
    var newTaskRes = [];
    for (var i = 0; i < task.details.res.length; i++) {
      var res = task.details.res[i];
      var gotRes = _this.getRes(res.id);
      if (gotRes.type !== 2) {
        newTaskRes.push(res);
      }
    }
    task.details.res = newTaskRes;
  });
}

//init my role data
function initMy() {
  var Role = this.constructor.Engine.Role,
      opts = this.$options;
  this.my.role = opts.my.role ? new Role(opts.my.role) : null;
}

//init skills has gain status
function initSkillsGain() {
  __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].each(this.gameResources.skills.lists, function (skill) {
    __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].each(skill.property, function (property) {
      if (skill.hasGain) return;
      if (property.gain !== 0) {
        skill.hasGain = true;
      }
    });
  });
}

//init strengthen res in game
function initStrengthen() {
  var allRes = this.getRes(),
      findLevelInStrengthen = {},
      rules = [],
      strengthen = this.gameResources.res.upgrade.strengthen;

  __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].each(allRes, function (res) {
    if (!res.isStrengthen) return;
    var strengthen = res.strengthen;
    if (!findLevelInStrengthen[strengthen]) {
      findLevelInStrengthen[strengthen] = [];
    }
    findLevelInStrengthen[strengthen].push(res);
  });

  var strengthenSort = Object.keys(findLevelInStrengthen).sort(function (i, j) {
    return i > j;
  });

  __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].each(strengthenSort, function (strengthen) {
    var res = findLevelInStrengthen[strengthen];
    rules.push({
      strengthen: parseInt(strengthen),
      res: res
    });
  });

  strengthen.rules = rules;
}

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__methods__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index__ = __webpack_require__(1);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
* 地图类
* */





var uid = 1;

var Map = function (_Engine) {
  _inherits(Map, _Engine);

  function Map() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Map);

    var _this = _possibleConstructorReturn(this, (Map.__proto__ || Object.getPrototypeOf(Map)).call(this));

    _this.$options = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].extend(Object(__WEBPACK_IMPORTED_MODULE_0__methods__["a" /* getConfig */])(), opts);
    init.call(_this);
    return _this;
  }

  //获取当前所有的地图


  _createClass(Map, [{
    key: 'getMaps',
    value: function getMaps() {
      var allMaps = this.$game.getMaps();
      return __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].each(this.maps, function (mapUid) {
        return allMaps[mapUid];
      }, true);
    }

    //获取当前的npc

  }, {
    key: 'getNpcs',
    value: function getNpcs() {
      var allNpcs = this.$game.getNpcs();
      return __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].each(this.npcs, function (npcUid) {
        return allNpcs[npcUid];
      }, true);
    }
  }, {
    key: 'getMonsters',
    value: function getMonsters() {
      var allMonsters = this.$game.getMonsters();
      return __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].each(this.monsters, function (monsterUid) {
        return allMonsters[monsterUid];
      }, true);
    }
  }]);

  return Map;
}(__WEBPACK_IMPORTED_MODULE_2__index__["a" /* default */]);

function init() {
  this.$map(this, this.$options);
  this.id = this.id || uid++;
  delete this.$options;
}

/* harmony default export */ __webpack_exports__["a"] = (Map);

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getConfig;
function getConfig() {
  return {
    name: '', //地图名称
    description: '', //地图描述
    players: [], //玩家,
    npcs: [], //地图npc
    maps: [], //分支地点
    monsters: [] //分配的怪物
  };
}

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getConfig;
/*
* 物资方法
* 物品类型 type {Number} 1:普通/材料类 2:装备 3:药品
*
* */

function getConfig() {
  return {
    name: '', //物品名字
    description: '', //物品描述
    // isTrade: true,      //是否支持交易,暂时不做
    type: 1,
    price: 0, //售价
    capacity: 99, //针对的背包中一个容量最大的限制数量
    isBinding: false //是否绑定
  };
}

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__methods__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index__ = __webpack_require__(1);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
* 技能 类
* */





var uid = 1;

var Skill = function (_Engine) {
  _inherits(Skill, _Engine);

  function Skill(opts) {
    _classCallCheck(this, Skill);

    var _this = _possibleConstructorReturn(this, (Skill.__proto__ || Object.getPrototypeOf(Skill)).call(this));

    _this.$options = __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].extend(Object(__WEBPACK_IMPORTED_MODULE_1__methods__["a" /* getConfig */])(), opts);
    init.call(_this);
    return _this;
  }

  return Skill;
}(__WEBPACK_IMPORTED_MODULE_2__index__["a" /* default */]);

function init() {
  this.$map(this, this.$options);
  this.id = this.id || uid++;
  delete this.$options;
}

/* harmony default export */ __webpack_exports__["a"] = (Skill);

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getConfig;
/*
* npc方法
* */

/*
* @property 技能的特性
* */
function getConfig() {
  return {
    name: '',
    description: '',
    level: 1, //等级限制
    hasGain: false, //是否存在增益效果
    property: {
      hp: {
        gain: 0, //增益
        effect: 0, //效果
        time: null, //增益的有限时间
        timer: null //增益的定时器
      },
      mp: {
        gain: 0,
        effect: 0,
        time: null,
        timer: null
      },
      physicalAttack: {
        gain: 0,
        effect: 0,
        time: null,
        timer: null
      },
      physicalDefense: {
        gain: 0,
        time: null,
        timer: null
      },
      magicAttack: {
        gain: 0,
        effect: 0,
        time: null,
        timer: null
      },
      magicDefense: {
        gain: 0,
        time: null,
        timer: null
      }
    },
    consume: { //消耗
      hp: 0,
      mp: 0
    }
  };
}

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = getConfig;
/* harmony export (immutable) */ __webpack_exports__["k"] = updateRoleProperty;
/* harmony export (immutable) */ __webpack_exports__["l"] = updateTaskStatus;
/* harmony export (immutable) */ __webpack_exports__["f"] = receiveTask;
/* harmony export (immutable) */ __webpack_exports__["g"] = removeRoleTaskRes;
/* harmony export (immutable) */ __webpack_exports__["a"] = buy;
/* harmony export (immutable) */ __webpack_exports__["d"] = hasResSpace;
/* harmony export (immutable) */ __webpack_exports__["i"] = updateResSpace;
/* unused harmony export resCapacity */
/* harmony export (immutable) */ __webpack_exports__["b"] = findSameRes;
/* unused harmony export resRemove */
/* harmony export (immutable) */ __webpack_exports__["e"] = isAdequateSkillConsume;
/* harmony export (immutable) */ __webpack_exports__["n"] = useSkill;
/* harmony export (immutable) */ __webpack_exports__["j"] = updateReward;
/* harmony export (immutable) */ __webpack_exports__["m"] = useConsumable;
/* harmony export (immutable) */ __webpack_exports__["h"] = strengthen;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);
/*
* role methods
* */



//任务配置信息
function getConfig() {
  return {
    id: 0,
    name: '', //玩家名字
    type: 0, //角色的类型
    occupation: '', //职业名，和角色类型挂钩的
    /*---- 当前的场景 ----*/
    current: {
      /*---- 战斗场景 -----*/
      fight: {
        enemy: null, //敌人
        enemyHarm: 0 //敌人受到的伤害
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
          intrinsic: 120, //原有的值
          _intrinsic: 0, //计算后的值
          total: 0, //总共
          wasting: 0, //消耗的
          gains: [] //临时的效果
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
          gains: []
        },

        physicalDefense: {
          intrinsic: 15,
          _intrinsic: 0,
          gains: []
        },

        magicAttack: {
          intrinsic: 20,
          _intrinsic: 0,
          gains: []
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
  };
}

//----- Role -----//

//重设玩家的初始值
function resetRoleProperty(attributes) {
  __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].each(attributes, function (attr) {
    attr._intrinsic = 0;
    attr._intrinsic += attr.intrinsic;
    //技能药物 增益
    __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].each(attr.gains, function (gainItem) {
      attr._intrinsic += Math.round(attr._intrinsic * gainItem.gain);
    });
  });
}

//重新计算玩家所有的属性值
function updateRoleProperty() {

  var attributes = this.property.attributes;

  //重设玩家的初始值
  resetRoleProperty(attributes);

  /*依赖装备属性计算*/
  __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].each(this.equipments, function (equipment) {
    if (__WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].nullPlainObject(equipment)) return;
    var property = equipment.property;
    __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].each(attributes, function (attr, key) {
      attr._intrinsic += property[key]._intrinsic || 0;
    });
  });

  //扣除伤害
  __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].each(attributes, function (attr, key) {
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
  var hp = this.property.attributes.hp;
  this.isDie = hp.total + hp.wasting === 0;
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
function updateTaskStatus(opts) {
  var _this = this;

  //all tasks
  var allTasks = this.$game.getTasks(),

  //role tasks
  roleTasks = this.tasks.lists;

  //遍历用户任务
  __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].each(roleTasks, function (roleTask, taskId) {

    var roleTaskRes = roleTask.res,
        //查看当前任务res所需
    roleTaskMonsters = roleTask.monsters,
        //查看当前任务monster所需
    currentTask = allTasks[taskId]; //当前任务列表中的任务

    switch (currentTask.type) {
      case 1:
        //跑腿任务直接跳下一个任务状态
        currentTask.status = 2;
        break;
      case 2:
        //击杀 &| 收集任务
        var resStatus = true,
            monsterStatus = true;

        //检查res是否符合任务要求
        __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].each(roleTaskRes, function (res) {

          //这里的任务所需的资源id
          var resId = res.id,

          //从角色查找对应的id的物品详情
          findRoleRes = findSameRes.apply(_this, [res, true, false]);

          /* 用户没有这个资源，直接跳出 */
          if (findRoleRes.res.length === 0) {
            resStatus = false;
            return;
          }

          //更新任务中的资源数量
          updateTaskRes.call(_this, {
            res: res,
            count: findRoleRes.count
          });

          //用户资源 <= 任务资源
          if (findRoleRes.count < currentTask.getTaskResCount(resId)) {
            resStatus = false;
          }
        });

        //检查monster是否符合任务要求
        __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].each(roleTaskMonsters, function (monster) {

          var monsterId = monster.id;

          //如果存在monster id 更新monster击杀数，往下将更新任务状态
          if (opts.monsterId == monsterId && monster.count < currentTask.getTaskMonstersCount(monsterId)) {
            updateTaskMonster.call(_this, { monster: monster });
          }
          //用户击杀 < 任务怪物击杀总数
          if (monster.count < currentTask.getTaskMonstersCount(monsterId)) {
            monsterStatus = false;
          }
        });

        //改变当前任务状态
        currentTask.status = resStatus && monsterStatus ? 2 : 1;
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
  var allNpcs = this.$game.getNpcs();

  __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].each(allNpcs, function (npc) {

    var npcTasks = npc.getTasks();

    //重新设置npc的r任务状态
    npc.resetTaskStatus();

    var taskStatus = npc.taskStatus;

    __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].each(npcTasks, function (task) {
      //"?"存在未领取的任务，橙色
      if (!taskStatus.hasTask && task.status === 0) {
        taskStatus.hasTask = true;
      } else if (!taskStatus.hasUnfinishedTask && task.status === 1) {
        //"?"存在未完成的任务，灰色
        taskStatus.hasUnfinishedTask = true;
      } else if (!taskStatus.hasResultTask && task.status === 2) {
        //"!"存在完成未提交的任务任务，橙色
        taskStatus.hasResultTask = true;
      }
    });
  });
}

//接受任务
function receiveTask(task) {
  var roleTasks = this.tasks.lists;
  var Vue = this.$game.Vue;
  if (roleTasks[task.id]) return false;
  if (task.type === 1) {
    roleTasks[task.id] = {};
  } else if (task.type === 2) {

    var taskDetails = task.details,
        monsters = [],
        res = [];

    //初始化玩家任务怪物数据
    __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].each(taskDetails.monsters, function (details) {
      monsters.push({
        id: details.id,
        count: 0,
        taskCount: details.count
      });
    });

    //初始化玩家任务资源数据
    __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].each(taskDetails.res, function (details) {
      res.push({
        id: details.id,
        count: 0,
        taskCount: details.count
      });
    });

    var roleTask = {
      monsters: monsters,
      res: res
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
function removeRoleTaskRes(task) {
  var _this2 = this;

  var taskRes = task.details.res;
  __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].each(taskRes, function (res) {
    resRemove.apply(_this2, [res, res.count]);
  });
  this.updateResSpace();
}

//----- Task End -----//


//----- Res -----//

// role buy res
function buy(res, amount) {

  var game = this.$game,
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
function hasResSpace() {
  var roleRes = this.res,
      game = this.$game,
      len = updateResSpace.call(this); //顺便更新一下背包数量
  if (len < roleRes.space.max) {
    return true;
  }
  game.gameResources.res.hooks.notResSpace.call(game);
  return false;
}

//更新用户的背包可用数
function updateResSpace() {
  var len = this.res.lists.length;
  this.res.space.current = len;
  return len;
}

//更新分配资源
function updateRewardRes(res) {
  var _this3 = this;

  /* 没有背包空间 */
  if (!hasResSpace.call(this)) return false;

  //游戏加载的资源
  var game = this.$game,
      allRes = game.getRes();

  __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].each(res, function (_res) {

    //从自身去找对应的物品
    var currentRes = allRes[_res.id];

    //没有配置的资源直接跳出
    if (!currentRes) return;

    resCapacity.apply(_this3, [__WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].extend(currentRes, _res), _res.count, currentRes.capacity]);
  });
  this.updateResSpace();
}

//资源容量分配
function resCapacity(res, count, capacity) {
  var Equipment = game.constructor.Engine.Equipment;


  res = __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].deepCopy(res);

  if (res.type === 2) {
    while (count--) {
      res.id += '-' + getRandomId();
      this.res.lists.push(Equipment.updateEquipment(res));
    }
  } else {

    var getRes = findSameRes.call(this, res);

    var _count = count;

    for (var i = 0; i < getRes.length; i++) {
      var _res = getRes[i];
      if (_res.count === capacity) {
        continue;
      } else if (_res.count + _count > capacity) {
        _count -= capacity - _res.count;
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
function findSameRes(res) {
  var isGetCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var checkBinding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  var findRes = [];
  var count = 0;
  if (res.type === 2) return findRes;
  this.res.lists.forEach(function (_res) {
    //检查id的同时，检查看是否为绑定的
    if (_res.id == res.id && (checkBinding ? !!_res.isBinding == res.isBinding : true)) {
      findRes.push(_res);
      count += _res.count;
    }
  });
  if (isGetCount) {
    return {
      res: findRes,
      count: count
    };
  }
  return findRes;
}

//获取随机的id,为了区分装备类查找的相同性
function getRandomId() {
  var time = new Date(),
      randomNumber = (Math.random() * 1000).toFixed(0);
  return time.getTime() + ':' + randomNumber;
}

//资源的移除
function resRemove(res, count) {
  var roleAllRes = this.res.lists;
  var roleRes = this.findSameRes(res, false, false);
  for (var i = 0; i < roleRes.length; i++) {
    var _res = roleRes[i],
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
function isAdequateSkillConsume(skill) {
  var attributes = this.property.attributes,
      _skill$consume = skill.consume,
      skillHp = _skill$consume.hp,
      skillMp = _skill$consume.mp,
      hp = attributes.hp,
      mp = attributes.mp;

  if (hp._intrinsic - skillHp > 0 && mp._intrinsic - skillMp >= 0) {
    return true;
  }
  return false;
}

//升级->提升特性
function advanceProperty() {
  var property = this.property,
      attributes = property.attributes;

  /* 特性的属性 */
  __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].each(attributes, function (attr) {
    var intrinsic = attr.intrinsic;
    attr.intrinsic = Math.round(intrinsic + intrinsic * 0.2);
  });
}

//查找增益效果
function findGain(gains, type, id) {
  var i = 0;
  for (; i < gains.length; i++) {
    var gain = gains[i];
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
function useSkill(skill, isCounterattack) {
  var _this4 = this;

  //扣除技能的消耗
  deductSkillConsume.call(this, skill);

  var roleAttributes = this.property.attributes,
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
  var skillStatus = true;

  //check attack name
  var attackName = function () {
    var PHYSICAL_ATTACK_NAME = 'physicalAttack',
        MAGIC_ATTACK_NAME = 'magicAttack';
    var magicAttack = skill.property[MAGIC_ATTACK_NAME];
    if (magicAttack.effect !== 0) {
      return MAGIC_ATTACK_NAME;
    } else {
      return PHYSICAL_ATTACK_NAME;
    }
  }();

  //use skill
  __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].each(skill.property, function (skillAttributes, name) {

    if (skillAttributes.gain !== 0) {
      setGain(_this4, skillAttributes, roleAttributes, 'skill', name, id);
    }

    if ((name === 'hp' || name === 'mp') && skillAttributes.effect !== 0) {
      recover.call(_this4, roleAttributes[name], skillAttributes.effect, name);
    } else if (name === attackName && skillStatus) {
      isCounterattack = attack(_this4, fight.enemy, skillAttributes.effect, name, isCounterattack);
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
  var attributes = this.property.attributes,
      _skill$consume2 = skill.consume,
      skillHp = _skill$consume2.hp,
      skillMp = _skill$consume2.mp,
      hp = attributes.hp,
      mp = attributes.mp;

  hp.wasting += -skillHp;
  mp.wasting += -skillMp;
}

//攻击
function attack(role, enemy, effect, name, isCounterattack) {
  var roleAttributes = role.property.attributes,
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
  var game = role.$game,
      enemyAttributes = enemy.property.attributes,
      enemyHp = enemyAttributes.hp,
      attackIntrinsic = attack._intrinsic,
      defenseIntrinsic = defense._intrinsic;

  //@hooks fight hurt
  //return hurt
  var enemyHarm = game.gameResources.skills.hooks.hurt.apply(game, [attackIntrinsic, effect, defenseIntrinsic]);

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
  var game = enemy.$game,
      my = game.my,
      monstersHook = game.gameResources.monsters.hooks,
      roleHook = game.gameResources.roles.hooks,
      currentRole = my.role; //当前的玩家

  //玩家被击杀了
  if (currentRole === enemy) {
    //角色被击杀钩子，（被杀，杀）
    roleHook.die.call(game, {
      role: currentRole,
      enemy: role
    });
  } else if (enemy.isMonster) {
    //野怪被击杀了,添加野怪奖励
    updateReward.apply(currentRole, [enemy.reward.exp, enemy.reward.currency, enemy.reward.res]);
    currentRole.updateTaskStatus({
      monsterId: enemy.id
    });
    //怪物被击杀钩子
    monstersHook.die.call(game, {
      enemy: enemy,
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
    var property = this.property,
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
  var game = this.$game,
      property = this.property,
      _property$attributes = property.attributes,
      hp = _property$attributes.hp,
      mp = _property$attributes.mp,
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
function updateReward(exp, currency, res) {
  updateLevel.call(this, exp);
  updateCurrency.call(this, currency);
  updateRewardRes.call(this, res);
}

//更新分配金币
function updateCurrency(currency) {
  this.property.currency += currency;
}

//使用消耗品
function useConsumable(roleRes) {
  var _this5 = this;

  var game = this.$game,
      roleAttributes = this.property.attributes,
      id = roleRes.id,
      index = this.res.lists.indexOf(roleRes),
      consumable = game.getRes(id);

  if (!roleRes) return false;
  if (roleRes.count > 0) --roleRes.count;
  if (roleRes.count === 0) this.res.lists.splice(index, 1);

  //消耗品的增益 && 消耗品恢复值
  __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].each(consumable.property, function (consumableAttributes, name) {
    if (consumableAttributes.gain !== 0 && consumableAttributes.time !== 0) {
      setGain(_this5, consumableAttributes, roleAttributes, 'consumable', name, id);
    }
    if (consumableAttributes.effect != null) {
      if ((name === 'hp' || name === 'mp' || name === 'exp') && consumableAttributes.effect !== 0) {
        recover.call(_this5, roleAttributes[name], consumableAttributes.effect, name);
      }
    }
  });
  return true;
}

//增益处理
function setGain(my, gainAttributes, roleAttributes, type, name, id) {
  //增益列表
  var gains = roleAttributes[name].gains;
  var findIndex = void 0;
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

  var newGain = {
    id: id,
    name: name,
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
function strengthen(equipment) {
  var _this6 = this;

  var game = this.$game,
      Equipment = game.constructor.Engine.Equipment,
      strengthenRes = game.findStrengthenRes(equipment); //找到所需的强化物品

  for (var i = 0; i < strengthenRes.length; i++) {
    var _strengthenRes = strengthenRes[i],
        quantity = _strengthenRes.quantity,
        findRes = this.findSameRes(_strengthenRes, true, false);
    if (findRes.count < quantity) {
      return false;
    }
  }

  //移除强化所需物资
  strengthenRes.forEach(function (res) {
    resRemove.call(_this6, res, res.quantity);
  });

  ++equipment.strengthen;

  Equipment.updateEquipment(equipment);

  return true;
}

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__methods__ = __webpack_require__(19);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
* 怪物 类
* */




var uid = 1;

var Monster = function (_Role) {
  _inherits(Monster, _Role);

  function Monster() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Monster);

    var _this = _possibleConstructorReturn(this, (Monster.__proto__ || Object.getPrototypeOf(Monster)).call(this, __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].extend(Object(__WEBPACK_IMPORTED_MODULE_2__methods__["a" /* getConfig */])(), opts)));

    init.call(_this);
    return _this;
  }

  return Monster;
}(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);

function init() {

  this.$map(this, this.$options);

  this.id = this.id || uid++;

  delete this.$options;
}

/* harmony default export */ __webpack_exports__["a"] = (Monster);

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getConfig;
function getConfig() {
  return {
    isMonster: true,
    property: {
      exp: false,
      currency: false
    },
    reward: { //奖励
      exp: 0, //完成后的经验
      currency: 0, //完成后的货币
      res: []
      /*{
        id:1,
        count:1
      }*/
      //完成后的资源 uid{count:0} uid + 数量
    }
  };
}

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__methods__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index__ = __webpack_require__(1);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
* npc类
* */




var uid = 1;

var Npc = function (_Engine) {
  _inherits(Npc, _Engine);

  function Npc() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Npc);

    var _this = _possibleConstructorReturn(this, (Npc.__proto__ || Object.getPrototypeOf(Npc)).call(this));

    _this.$options = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].extend(Object(__WEBPACK_IMPORTED_MODULE_0__methods__["a" /* getConfig */])(), opts);
    init.call(_this);
    return _this;
  }

  //获取当前任务（可领取 && 在进行）


  _createClass(Npc, [{
    key: 'getTasks',
    value: function getTasks() {
      var game = this.$game,
          //game 实例
      tasks = game.getTasks(),
          //所有的任务
      my = game.my.role,
          level = my.level,
          //用户等级
      tasked = my.tasks.result; //获取当前用户

      var _tasks = [];

      __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].each(this.tasks, function (taskId) {

        var task = tasks[taskId],
            //当前任务
        prevTask = task.prevTasks; //上一级关联任务

        //做过的任务 && level不够
        if (tasked.indexOf(taskId) !== -1 || task.level > level) return;

        //从已完成的任务列表中查找任务依赖
        //任务依赖中存在
        if (prevTask) {
          if (tasked.indexOf(prevTask) !== -1) {
            _tasks.push(task);
          }
        } else {
          _tasks.push(task);
        }
      });

      return _tasks;
    }

    //获取资源

  }, {
    key: 'getRes',
    value: function getRes() {
      var allRes = this.$game.getRes();
      return __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].each(this.res, function (resUid) {
        return allRes[resUid];
      }, true);
    }

    //清除npc状态

  }, {
    key: 'resetTaskStatus',
    value: function resetTaskStatus() {
      this.taskStatus = {
        hasTask: false, //存在未领取的任务
        hasUnfinishedTask: false, //存在未完成的任务
        hasResultTask: false //存在完成的任务
      };
    }
  }]);

  return Npc;
}(__WEBPACK_IMPORTED_MODULE_2__index__["a" /* default */]);

function init() {
  this.$map(this, this.$options);
  this.id = this.id || uid++;
  delete this.$options;
}

/* harmony default export */ __webpack_exports__["a"] = (Npc);

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getConfig;
/*
* npc方法
* */

function getConfig() {
  return {
    name: '', //名字
    description: '', //npc描述
    res: [], //资源
    tasks: [], //任务
    taskStatus: { //任务状态
      hasTask: false, //存在未领取的任务
      hasUnfinishedTask: false, //存在未完成的任务
      hasResultTask: false //存在完成的任务
    }
  };
}

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__methods__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index__ = __webpack_require__(1);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
* 装备类
* */




var uid = 1;

//任务

var Task = function (_Engine) {
  _inherits(Task, _Engine);

  function Task() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Task);

    var _this = _possibleConstructorReturn(this, (Task.__proto__ || Object.getPrototypeOf(Task)).call(this));

    _this.$options = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].extend(Object(__WEBPACK_IMPORTED_MODULE_0__methods__["a" /* getConfig */])(), opts);
    init.call(_this);
    return _this;
  }

  //获取任务id中资源count


  _createClass(Task, [{
    key: 'getTaskResCount',
    value: function getTaskResCount(id) {
      var taskRes = this.details.res;
      for (var i = 0; i < taskRes.length; i++) {
        var res = taskRes[i];
        if (res.id == id) {
          return res.count;
        }
      }
      return 0;
    }

    //获取任务id中击杀count

  }, {
    key: 'getTaskMonstersCount',
    value: function getTaskMonstersCount(id) {
      var taskMonsters = this.details.monsters;
      for (var i = 0; i < taskMonsters.length; i++) {
        var monster = taskMonsters[i];
        if (monster.id == id) {
          return monster.count;
        }
      }
      return 0;
    }

    //获取任务资源

  }, {
    key: 'getRewardRes',
    value: function getRewardRes() {
      var game = this.$game,
          allRes = game.getRes();
      return __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].each(this.reward.res, function (taskRes) {
        var id = taskRes.id,
            res = allRes[id],
            currentRes = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].deepCopy(res);

        var _res = {};

        //针对装备类直接扩展到原来的装备
        if (res.type === 2) {
          _res = {
            res: __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].extend(currentRes, taskRes),
            count: 1
          };
        } else {
          _res = {
            res: res,
            count: taskRes.count
          };
        }
        return _res;
      }, true);
    }
  }]);

  return Task;
}(__WEBPACK_IMPORTED_MODULE_2__index__["a" /* default */]);

function init() {
  this.$map(this, this.$options);
  this.id = this.id || uid++;
  delete this.$options;
}

/* harmony default export */ __webpack_exports__["a"] = (Task);

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getConfig;
/*
* 任务方法
* */

/*
* 任务名  @name {String}
* 任务描述  @description {String}
* 任务归类  @classify {Number}  1:主线 2.支线 3.每日任务
* 任务类型  @type {Number}  1:跑腿 2.击杀&|购买物品
* 任务状态  @status {Number}  0:未领取 1:已领取未完成 2:完成，未提交 3：完成，提交
* 任务状态  @level {Number}  等级限制
* 任务奖励  @reward {Object}
*    @exp {Number} 奖励经验
*    @currency {Number} 奖励货币
*    @res {Array}    奖励物资
* */

function getConfig() {
  return {
    name: '', //任务名
    classify: 1, //任务归类
    level: 1, //等级限制
    status: 0, //任务状态，完成将会添加到用户已完成的列表中，

    //任务状态描述内容
    description: {
      notReceivedTask: "", //未领取任务描述
      unfinishedTask: "", //未完成的任务描述
      resultTask: "" //完成任务后的描述
    },

    type: 1, //任务类型

    details: { //任务细节
      res: [
        /*{
          id:1,
          count:10
        }*/
      ], //所需任务资源
      monsters: []
      /*{
        id:1,
        count:1
      }*/
      //所需任务击杀怪物
    },
    reward: { //奖励
      exp: 0, //完成后的经验
      currency: 0, //完成后的货币
      res: []
      /*{
        id:1,
        count:1
      }*/
      //完成后的资源 uid{count:0} uid + 数量
    },
    prevTasks: null //上一个关联任务  currentTaskId : prevTaskId
  };
}

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__methods__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index__ = __webpack_require__(2);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
* 装备类
* */




//Equipment extends Res

var Equipment = function (_Res) {
  _inherits(Equipment, _Res);

  function Equipment() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Equipment);

    var _this = _possibleConstructorReturn(this, (Equipment.__proto__ || Object.getPrototypeOf(Equipment)).call(this, __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].extend(Object(__WEBPACK_IMPORTED_MODULE_0__methods__["a" /* getConfig */])(), opts)));

    init.call(_this);
    return _this;
  }

  _createClass(Equipment, [{
    key: 'updateEquipment',
    value: function updateEquipment() {
      return Object(__WEBPACK_IMPORTED_MODULE_0__methods__["b" /* updateEquipment */])(this);
    }
  }]);

  return Equipment;
}(__WEBPACK_IMPORTED_MODULE_2__index__["a" /* default */]);

function init() {
  this.$map(this, this.$options);
  this.updateEquipment();
  delete this.$options;
}

Equipment.updateEquipment = __WEBPACK_IMPORTED_MODULE_0__methods__["b" /* updateEquipment */];

/* harmony default export */ __webpack_exports__["a"] = (Equipment);

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getConfig;
/* harmony export (immutable) */ __webpack_exports__["b"] = updateEquipment;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);
/*
* 装备方法
* */



//get equipment config
function getConfig() {
  return {
    classify: null, //装备分类 head,hand,body,foot,weapon
    type: 2, //武器类型
    quality: 1, //品质
    property: {
      hp: {
        intrinsic: 0,
        _intrinsic: 0
      },
      mp: {
        intrinsic: 0,
        _intrinsic: 0
      },
      physicalAttack: {
        intrinsic: 0,
        _intrinsic: 0
      },
      physicalDefense: {
        intrinsic: 0,
        _intrinsic: 0
      },
      magicAttack: {
        intrinsic: 0,
        _intrinsic: 0
      },
      magicDefense: {
        intrinsic: 0,
        _intrinsic: 0
      }
    },
    strengthen: 0, //强化
    count: 1, //默认数量1(不建议修改)
    isEquip: false //是否装备了
  };
}

//update equipment property
function updateEquipment(equipment) {
  var property = equipment.property;
  __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].each(property, function (_property) {
    _property._intrinsic = _property.intrinsic + _property.intrinsic * (equipment.strengthen * 0.01);
  });
  return equipment;
}

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__methods__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index__ = __webpack_require__(2);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
* 消耗类
* */




//消耗 继承 资源

var Consumable = function (_Res) {
  _inherits(Consumable, _Res);

  function Consumable() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Consumable);

    var _this = _possibleConstructorReturn(this, (Consumable.__proto__ || Object.getPrototypeOf(Consumable)).call(this, __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].extend(Object(__WEBPACK_IMPORTED_MODULE_0__methods__["a" /* getConfig */])(), opts)));

    init.call(_this);
    return _this;
  }

  return Consumable;
}(__WEBPACK_IMPORTED_MODULE_2__index__["a" /* default */]);

function init() {
  this.$map(this, this.$options);
  delete this.$options;
}

/* harmony default export */ __webpack_exports__["a"] = (Consumable);

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getConfig;
/*
* 消耗品方法
* */

function getConfig() {
  return {
    name: '', //消耗品
    description: '', //消耗描述
    type: 3, //类型
    hasUse: false, //是否存在增益效果
    property: {
      hp: {
        gain: 0, //增益
        effect: 0, //效果
        time: null, //增益的有限时间
        timer: null //增益的定时器
      },
      mp: {
        gain: 0,
        effect: 0,
        time: null,
        timer: null
      },
      exp: {
        gain: 0,
        effect: 0,
        time: null,
        timer: null
      },
      physicalAttack: {
        gain: 0,
        time: null,
        timer: null
      },
      physicalDefense: {
        gain: 0,
        time: null,
        timer: null
      },
      magicAttack: {
        gain: 0,
        time: null,
        timer: null
      },
      magicDefense: {
        gain: 0,
        time: null,
        timer: null
      }
    }
  };
}

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__methods__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index__ = __webpack_require__(2);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
* 装备类
* */




//强化 继承 资源

var Strengthen = function (_Res) {
  _inherits(Strengthen, _Res);

  function Strengthen() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Strengthen);

    var _this = _possibleConstructorReturn(this, (Strengthen.__proto__ || Object.getPrototypeOf(Strengthen)).call(this, __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].extend(Object(__WEBPACK_IMPORTED_MODULE_0__methods__["a" /* getConfig */])(), opts)));

    init.call(_this);
    return _this;
  }

  return Strengthen;
}(__WEBPACK_IMPORTED_MODULE_2__index__["a" /* default */]);

function init() {
  this.$map(this, this.$options);
  delete this.$options;
}

/* harmony default export */ __webpack_exports__["a"] = (Strengthen);

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getConfig;
/*
* 消耗品方法
* */

function getConfig() {
  return {
    strengthen: 99, //强化要求提升等级
    type: 4, //类型
    quantity: 5, //强化所需数量
    isStrengthen: true //强化物品类型
  };
}

/***/ })
/******/ ])["default"];
});
//# sourceMappingURL=blue-game-engine.js.map