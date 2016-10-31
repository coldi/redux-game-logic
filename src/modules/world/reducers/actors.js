import { WORLD_ACTOR_MOVE } from '../constants';
import { isEqual } from 'lodash';
import Immutable from 'seamless-immutable';

// TODO: later: rename actors to characters
// TODO: remember: characters are part of a group!
const actors = (

    state = Immutable({
        'player': {
            id: 'player',
            color: 0xff9900,
            coord: [1, 1]
        },
        'npc': {
            id: 'npc',
            coord: [0, 0]
        }
    }),
    action = {}

) => {

    // TODO: later: always use action.payload to store action params
    switch (action.type) {

        case WORLD_ACTOR_MOVE:
            const { id, offset } = action.payload;

            return state.updateIn([id, 'coord'], (coord) => (
                [ coord[0] + offset[0], coord[1] + offset[1] ]
            ));

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