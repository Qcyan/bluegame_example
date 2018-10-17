import webpackHot from './webpack-hot';

/*Game and ENGINE*/
import BlueGame from './instance';
import Engine from "./engine";

/*game constructor*/
import Map from './engine/map';
import Res from './engine/res';
import Skill from './engine/skill';
import Role from './engine/role';
import Monster from './engine/role/monster';
import Npc from './engine/npc';
import Task from './engine/task';
import Equipment from './engine/res/equipment';
import Consumable from "./engine/res/consumable";
import Strengthen from "./engine/res/strengthen";

/*GAME Static -> ENGINE*/
BlueGame.Engine = Engine;

/*ENGINE static methods class -> Map,Npc,Res,Skill,Role,Monster,Equipment,Consumable,Task*/
Engine.Map = Map;
Engine.Npc = Npc;
Engine.Res = Res;
Engine.Skill = Skill;
Engine.Role = Role;
Engine.Monster = Monster;
Engine.Equipment = Equipment;
Engine.Consumable = Consumable;
Engine.Strengthen = Strengthen;
Engine.Task = Task;

/*webpack hot*/
webpackHot();

export default BlueGame;