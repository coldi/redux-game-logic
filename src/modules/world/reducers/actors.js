import { isEqual } from 'lodash';
import Immutable from 'seamless-immutable';

import {
    CYCLE_PHASE_PROCEED,
    CYCLE_TURN_NEXT
} from '../../cycle/constants';

import {
    WORLD_ACTOR_CREATE,
    WORLD_ACTOR_MOVE,
    WORLD_ACTOR_ACTIONPOINTS
} from '../constants';


// TODO: later: rename actors to characters?
// TODO: remember: characters are part of a group!
const actors = (

    state = Immutable({}),
    action = {}

) => {

    switch (action.type) {

        case WORLD_ACTOR_CREATE: {

            const { actor } = action.payload;

            return state.set(actor.id, actor);

        }


        case WORLD_ACTOR_MOVE: {

            const { id, offset } = action.payload;

            return state.updateIn([id, 'coord'], (coord) => (
                [coord[0] + offset[0], coord[1] + offset[1]]
            ));

        }


        case WORLD_ACTOR_ACTIONPOINTS: {

            const { id, cost } = action.payload;

            return state.updateIn([id, 'actionPoints'], (ap) => (
                Math.max(0, ap - cost)
            ));

        }


        // TODO: decouple world module from cycle module
        case CYCLE_PHASE_PROCEED: {

            const { actorId } = action.payload;

            return state.setIn([actorId, 'isDone'], true);

        }


        // TODO: decouple world module from cycle module
        case CYCLE_TURN_NEXT: {

            let stateUpdate = {};
            Object.keys(state).forEach((id) => {
                let actor = state[id];
                stateUpdate[id] = {
                    actionPoints: actor.actionPointsMax,
                    isDone: false
                };
            });

            return state.merge(stateUpdate, {deep: true});

        }


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