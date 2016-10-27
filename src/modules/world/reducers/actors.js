import { WORLD_ACTOR_MOVE } from '../constants';
import { isEqual } from 'lodash';

// TODO: later: rename actors to characters
// TODO: remember: characters are part of a group!
const actors = (

    state = { // assoc array
        'player': {
            id: 'player',
            coord: [1, 1]
        }
    },
    action = {}

) => {

    // TODO: later: always use action.payload to store action params
    switch (action.type) {

        case WORLD_ACTOR_MOVE:
            const { id, offset } = action.payload;
            // better use some immutable tools here
            const actor = { ...state[id] };
            const updatedCoord = [ actor.coord[0] + offset[0], actor.coord[1] + offset[1] ];
            const updatedActor = { ...actor, coord: updatedCoord };
            
            return { ...state, [id]: updatedActor };

        default:
            return state;

    }

};

export default actors;

export const getActorById = (state, id = '') => state[id];

export const getActorByCoord = (state, coord = []) => {
    for (let actor of state) {
        if (isEqual(actor.coord, coord)) return actor;
    }
};