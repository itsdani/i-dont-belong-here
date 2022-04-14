import { utils, prototypes, constants } from "/game";

export function loop() {
  const container = utils.getObjectsByPrototype(prototypes.StructureContainer)[0];
  const creep = utils.getObjectsByPrototype(prototypes.Creep)[0];

  if (utils.getObjectsByPrototype(prototypes.ConstructionSite).length == 0) {
    utils.createConstructionSite({ x: 50, y: 55 }, prototypes.StructureTower);
  }
  if (
    creep.store[constants.RESOURCE_ENERGY] == 0 &&
    creep.withdraw(container, constants.RESOURCE_ENERGY) ==
      constants.ERR_NOT_IN_RANGE
  ) {
    creep.moveTo(container);
  }
  const constructionSite = utils.getObjectsByPrototype(
    prototypes.ConstructionSite
  )[0];
  if (
    creep.store[constants.RESOURCE_ENERGY] > 0 &&
    creep.build(constructionSite) == constants.ERR_NOT_IN_RANGE
  ) {
    creep.moveTo(constructionSite);
  }
}
