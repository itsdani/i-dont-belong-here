import { utils, prototypes, constants } from "/game";
import { getConstructionSites, getSpawn, getTowers } from "../util.mjs";

export const harvesterBehavior = (creep) => {
  if (creep.store.getFreeCapacity(constants.RESOURCE_ENERGY) > 0) {
    const closestSource = creep.findClosestByPath(getSources());
    const harvestResult = creep.harvest(closestSource);
    if (harvestResult == constants.ERR_NOT_IN_RANGE) {
      creep.moveTo(closestSource);
    }
  } else {
    const spawn = getSpawn();
    const transferResult = creep.transfer(spawn, constants.RESOURCE_ENERGY);
    if (transferResult == constants.ERR_NOT_IN_RANGE) {
      creep.moveTo(spawn);
    }
  }
};
