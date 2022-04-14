import { utils, prototypes, constants } from "/game";
import { getConstructionSites, getSpawn, getTowers } from "../util.mjs";

export const builderBehavior = (creep) => {
  const constructionSites = getConstructionSites();
  if (constructionSites.length > 0) {
    if (creep.store[constants.RESOURCE_ENERGY] > 0) {
      const constructionSite = creep.findClosestByPath(constructionSites);
      const buildResult = creep.build(constructionSite);
      if (buildResult == constants.ERR_NOT_IN_RANGE) {
        creep.moveTo(constructionSite);
      }
    } else {
      const spawn = getSpawn();
      const withdrawResult = creep.withdraw(spawn, constants.RESOURCE_ENERGY);
      if (withdrawResult == constants.ERR_NOT_IN_RANGE) {
        creep.moveTo(spawn);
      }
    }
  } else {
    const towers = getTowers();
    if (creep.store[constants.RESOURCE_ENERGY] > 0) {
      const tower = creep.findClosestByPath(towers);
      const transferResult = creep.transfer(tower, constants.RESOURCE_ENERGY);
      if (transferResult == constants.ERR_NOT_IN_RANGE) {
        creep.moveTo(tower);
      }
    } else {
      const spawn = getSpawn();
      const withdrawResult = creep.withdraw(spawn, constants.RESOURCE_ENERGY);
      if (withdrawResult == constants.ERR_NOT_IN_RANGE) {
        creep.moveTo(spawn);
      }
    }
  }
};
