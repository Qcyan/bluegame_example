/*
* 装备方法
* */

import util from '@util';

//get equipment config
export function getConfig() {
  return {
    classify: null,     //装备分类 head,hand,body,foot,weapon
    type: 2,            //武器类型
    quality: 1,         //品质
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
    strengthen: 0,         //强化
    count: 1,            //默认数量1(不建议修改)
    isEquip: false        //是否装备了
  }
}

//update equipment property
export function updateEquipment(equipment) {
  const property = equipment.property;
  util.each(property, (_property) => {
    _property._intrinsic = (_property.intrinsic + _property.intrinsic * (equipment.strengthen * 0.01));
  });
  return equipment;
}