import { getObjectsByPrototype } from "/game/utils";
import { Creep } from "/game/prototypes";
import { ERR_NOT_IN_RANGE, ATTACK, RANGED_ATTACK, HEAL } from "/game/constants";
import {} from "/arena";

export function loop() {
  var meleeCreep = getObjectsByPrototype(Creep).find(
    (creep) =>
      creep.my && creep.body.some((bodyPart) => bodyPart.type == ATTACK)
  );
  var rangedCreep = getObjectsByPrototype(Creep).find(
    (creep) =>
      creep.my && creep.body.some((bodyPart) => bodyPart.type == RANGED_ATTACK)
  );
  var healerCreep = getObjectsByPrototype(Creep).find(
    (creep) => creep.my && creep.body.some((bodyPart) => bodyPart.type == HEAL)
  );
  var enemyCreep = getObjectsByPrototype(Creep).find((creep) => !creep.my);

  console.log("rangedCreep: ", rangedCreep);
  console.log("meleeCreep: ", meleeCreep);
  console.log("healerCreep: ", healerCreep);
  console.log("enemyCreep: ", enemyCreep);

  if (meleeCreep.attack(enemyCreep) == ERR_NOT_IN_RANGE) {
    console.log("attack creep moving closer");
    meleeCreep.moveTo(enemyCreep);
  }
  if (rangedCreep.rangedAttack(enemyCreep) == ERR_NOT_IN_RANGE) {
    rangedCreep.moveTo(enemyCreep);
  }
  var damagedCreep = getObjectsByPrototype(Creep).find(
    (creep) => creep.my && creep.hits < creep.hitsMax
  );
  console.log("damagedCreep: ", damagedCreep);
  const healResult = healerCreep.heal(damagedCreep);
  console.log("heal result: ", healResult);
  if (!!damagedCreep && healResult == ERR_NOT_IN_RANGE) {
    console.log("healer creep moving closer");
    healerCreep.moveTo(damagedCreep);
  }
}
