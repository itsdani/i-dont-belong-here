import { getObjectsByPrototype } from '/game/utils';
import { Creep, Flag } from '/game/prototypes';
import { } from '/game/constants';
import { } from '/arena';

export function loop() {
    var creeps = getObjectsByPrototype(Creep);
    creeps.forEach(creep =>
        creep.moveTo(getObjectsByPrototype(Flag)[0])
    );
}
