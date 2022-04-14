import { utils, prototypes, constants } from "/game";

const roles = {
  HARVESTER: "harvester",
  BUILDER: "builder",
};
const targetCount = {
  [roles.HARVESTER]: 3,
  [roles.BUILDER]: 2,
};
const body = {
  [roles.HARVESTER]: [constants.MOVE, constants.WORK, constants.CARRY],
  [roles.BUILDER]: [constants.MOVE, constants.WORK, constants.CARRY],
};
const behavior = {
  [roles.HARVESTER]: (creep) => {
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
  },
  [roles.BUILDER]: (creep) => {
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
  },
};

var spawnQueue = [];
export function loop() {
  const spawn = getSpawn();
  if (
    utils.getObjectsByPrototype(prototypes.ConstructionSite).length == 0 &&
    getTowers().length == 0
  ) {
    utils.createConstructionSite(
      { x: spawn.x - 2, y: spawn.y + 2 },
      prototypes.StructureTower
    );
  }

  spawnQueue = addOrdersToSpawnQueue(spawnQueue);
  spawnQueue = spawnNextCreep(spawn, spawnQueue);

  const myCreeps = getMyCreeps();
  myCreeps.forEach((creep) => {
    behavior[creep.role](creep);
  });
  getTowers().forEach((tower) => {
    const enemyCreep = getEnemyCreeps().find((creep) => !creep.my);
    tower.attack(enemyCreep);
  });
}

function getSpawn() {
  return utils.getObjectsByPrototype(prototypes.StructureSpawn)[0];
}

function getTowers() {
  return utils.getObjectsByPrototype(prototypes.StructureTower);
}

function getConstructionSites() {
  return utils.getObjectsByPrototype(prototypes.ConstructionSite);
}

function getSources() {
  return utils.getObjectsByPrototype(prototypes.Source);
}

function getContainer() {
  return utils.getObjectsByPrototype(prototypes.StructureContainer)[0];
}

function getMyCreeps() {
  return utils
    .getObjectsByPrototype(prototypes.Creep)
    .filter((creep) => creep.my);
}

function getEnemyCreeps() {
  return utils
    .getObjectsByPrototype(prototypes.Creep)
    .filter((creep) => !creep.my);
}

function spawnNextCreep(spawn, spawnQueue) {
  if (spawnQueue.length > 0) {
    const creepToSpawn = spawnQueue.pop();
    const spawnCreepResult = spawn.spawnCreep(creepToSpawn.body);
    if (!!spawnCreepResult.object) {
      console.log(`Spawned a new creep with role ${creepToSpawn.role}`);
      spawnCreepResult.object.role = creepToSpawn.role;
    } else {
      console.log(`Failed to spawn creep: ${spawnCreepResult.error}`);
      spawnQueue.push(creepToSpawn);
    }
  }
  return spawnQueue;
}

function addOrdersToSpawnQueue(spawnQueue) {
  var newSpawnQueue = [...spawnQueue];
  Object.values(roles).forEach((role) => {
    console.log(`Adding ${role}s to spawn queue.`);
    const roleCountInQueue = (role, newSpawnQueue) =>
      newSpawnQueue.filter((creepToSpawn) => creepToSpawn.role == role).length;
    const isMoreNeeded = (role, newSpawnQueue) => {
      console.log(
        `There are ${
          creepsWithRole(role).length
        } ${role} creeps alive and ${roleCountInQueue(
          role,
          newSpawnQueue
        )} in the queue`
      );
      const isMoreNeededValue =
        creepsWithRole(role).length + roleCountInQueue(role, newSpawnQueue) <
        targetCount[role];
      console.log(
        `More ${role}s`,
        isMoreNeededValue ? "are" : "are not",
        "needed."
      );
      return isMoreNeededValue;
    };

    while (isMoreNeeded(role, newSpawnQueue)) {
      console.log(`Inserting a ${role} to spawn queue.`);
      newSpawnQueue.unshift({ role, body: body[role] });
      console.log("New spawn queue: ", newSpawnQueue);
    }
  });
  console.log("Final spawn queue: ", newSpawnQueue);
  return newSpawnQueue;
}

function creepsWithRole(role) {
  return getMyCreeps().filter((creep) => creep.role == role);
}
