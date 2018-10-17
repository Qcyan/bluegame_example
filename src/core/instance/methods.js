/*
* main methods
* */

//get game config
export function getConfig() {
  return {
    config: {},
    current: {
      map: null,
      npcs: []
    },
    my: {     //当前选择的角色
      role: null,
      allRoles: [],
      hooks: {}
    },
    gameResources: {
      roles: {    //多个角色
        lists: [],
        hooks: {
          //role is die
          die(opts) {
          },
          //level up hooks
          levelUp() {
          }
        }
      },
      monsters: {
        lists: {},
        hooks: {
          //野怪被击杀
          die(opts) {
          }
        }
      },
      maps: {
        lists: {},
        hooks: {
          goMap(opts) {
            //go map hooks
          }
        }
      },
      skills: {
        lists: {},
        hooks: {
          //fight hurt
          hurt(attackIntrinsic, effect, defenseIntrinsic) {
            return Math.floor((attackIntrinsic + (attackIntrinsic * effect)) - ((Math.random() * 1) * defenseIntrinsic + defenseIntrinsic))
          },
          use(opts) {

          }
        }
      },
      npcs: {
        lists: {},
        hooks: {}
      },
      res: {
        lists: {},
        upgrade: {          //提升
          strengthen: {     //强化装备
            rules: []
          },
          inlay: {}         //镶嵌宝石
        },
        hooks: {
          equip(opts) {
          },
          disboard(opts) {
          },
          consumable(opts) {
          },
          notResSpace(opts) {
          }
        }
      },
      tasks: {
        lists: {},
        hooks: {
          receiveTask(opts) {
          },
          cancelTask(opts) {
          },
          submitTask(opts) {
          }
        }
      }
    },
    Vue: null,    //Vue构造
    $vm: null   //vue实例
  }
}

//update role in map
export function updateCurrentMap(mapId) {
  this.current.map = this.gameResources.maps.lists[mapId || 1];
  if (this.my.role) {
    this.my.role.current.map = mapId || 1;
  }
}

//update map has npcs
export function updateCurrentNpcs() {
  const current = this.current,
    currentMap = current.map;
  current.npcs = currentMap ? current.map.getNpcs() : [];
}
