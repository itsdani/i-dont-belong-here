import { getObjectsByPrototype } from "/game/utils";
import { Creep } from "/game/prototypes";
import { ERR_NOT_IN_RANGE } from "/game/constants";
import {} from "/arena";

export function loop() {
  var myCreep = getObjectsByPrototype(Creep).find((creep) => creep.my);
  var enemyCreep = getObjectsByPrototype(Creep).find((creep) => !creep.my);

  const attackResult = myCreep.attack(enemyCreep);
  console.log(attackResult);
  if (attackResult == ERR_NOT_IN_RANGE) {
    myCreep.moveTo(enemyCreep);
  }
}
