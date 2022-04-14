import { utils, prototypes, constants } from "/game";

export function getSpawn() {
  return utils.getObjectsByPrototype(prototypes.StructureSpawn)[0];
}

export function getTowers() {
  return utils.getObjectsByPrototype(prototypes.StructureTower);
}

export function getConstructionSites() {
  return utils.getObjectsByPrototype(prototypes.ConstructionSite);
}

export function getSources() {
  return utils.getObjectsByPrototype(prototypes.Source);
}

export function getContainer() {
  return utils.getObjectsByPrototype(prototypes.StructureContainer)[0];
}

export function getMyCreeps() {
  return utils
    .getObjectsByPrototype(prototypes.Creep)
    .filter((creep) => creep.my);
}

export function getEnemyCreeps() {
  return utils
    .getObjectsByPrototype(prototypes.Creep)
    .filter((creep) => !creep.my);
}
