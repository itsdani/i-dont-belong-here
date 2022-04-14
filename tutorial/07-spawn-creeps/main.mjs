import { utils, prototypes, constants } from "/game";

export function loop() {
  const spawn = utils.getObjectsByPrototype(prototypes.StructureSpawn)[0];
  const flags = utils.getObjectsByPrototype(prototypes.Flag);
  var creeps = utils.getObjectsByPrototype(prototypes.Creep);

  if (creeps.length < 2) {
    const newCreep = spawn.spawnCreep([constants.MOVE, constants.TOUGH]).object;
    newCreep.targetFlag = flags.find((flag) =>
      creeps.every((creep) => creep.targetFlag != flag)
    );
  }

  creeps = utils.getObjectsByPrototype(prototypes.Creep);
  creeps.forEach((creep) => {
    creep.moveTo(creep.targetFlag);
  });
}
