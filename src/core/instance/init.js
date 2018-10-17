import util from '@util';

//init game res
export function initRes() {
  //base.prototype.$map
  this.$map(this, this.$options);
}

//init task has res in task detail,del res type === 2 data
export function filterTaskHasEquipment() {
  const opts = this.$options;
  util.each(opts.gameResources.tasks.lists, (task) => {
    const newTaskRes = [];
    for (let i = 0; i < task.details.res.length; i++) {
      const res = task.details.res[i];
      const gotRes = this.getRes(res.id);
      if (gotRes.type !== 2) {
        newTaskRes.push(res);
      }
    }
    task.details.res = newTaskRes;
  });
}

//init my role data
export function initMy() {
  const Role = this.constructor.Engine.Role,
    opts = this.$options;
  this.my.role = opts.my.role ? new Role(opts.my.role) : null;
}

//init skills has gain status
export function initSkillsGain() {
  util.each(this.gameResources.skills.lists, (skill) => {
    util.each(skill.property, (property) => {
      if (skill.hasGain) return;
      if (property.gain !== 0) {
        skill.hasGain = true;
      }
    });
  });
}

//init strengthen res in game
export function initStrengthen() {
  const allRes = this.getRes(),
    findLevelInStrengthen = {},
    rules = [],
    strengthen = this.gameResources.res.upgrade.strengthen;

  util.each(allRes, (res) => {
    if (!res.isStrengthen) return;
    const strengthen = res.strengthen;
    if (!findLevelInStrengthen[strengthen]) {
      findLevelInStrengthen[strengthen] = [];
    }
    findLevelInStrengthen[strengthen].push(res);
  });

  const strengthenSort = Object.keys(findLevelInStrengthen).sort((i, j) => {
    return i > j;
  });

  util.each(strengthenSort, (strengthen) => {
    const res = findLevelInStrengthen[strengthen];
    rules.push({
      strengthen: parseInt(strengthen),
      res
    });
  });

  strengthen.rules = rules;

}