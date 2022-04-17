import { getObjectsByPrototype } from "/game/utils";
import { Creep, StructureContainer, StructureTower } from "/game/prototypes";
import { RESOURCE_ENERGY, ERR_NOT_IN_RANGE } from "/game/constants";
import {} from "/arena";

export function loop() {
  var creepWithEnergy = getObjectsByPrototype(Creep).find(
    (creep) => creep.my && creep.store.getUsedCapacity() > 0
  );
  var creepWithoutEnergy = getObjectsByPrototype(Creep).find(
    (creep) => creep.my && creep.store.getUsedCapacity() == 0
  );
  var container = getObjectsByPrototype(StructureContainer)[0];
  if (
    !!creepWithoutEnergy &&
    creepWithoutEnergy.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE
  ) {
    creepWithoutEnergy.moveTo(container);
  }

  var tower = getObjectsByPrototype(StructureTower).find((tower) => tower.my);
  if (
    !!creepWithEnergy &&
    creepWithEnergy.transfer(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE
  ) {
    creepWithEnergy.moveTo(tower);
  }var enemyCreep = getObjectsByPrototype(Creep).find((creep) => !creep.my);
  tower.attack(enemyCreep);
  var enemyCreep = getObjectsByPrototype(Creep).find((creep) => !creep.my);
  tower.attack(enemyCreep);
}
