import { isCoordWalkable, getActorById } from '../';
import actorActionPoints from './actorActionPoints';

import {
    WORLD_ACTOR_MOVE,
    MOVEMENT_COST
} from '../constants';

/**
 * Moves an actor by a given offset.
 *
 * @param id An actor id
 * @param offset The offset the actor should move, e.g. [0, -1]
 */
const actorMove = (
    id = '',
    offset = [0, 0]
) => (dispatch, getState) => {

    const state = getState();

    const actor = getActorById(state, id);
    const coord = [ actor.coord[0] + offset[0], actor.coord[1] + offset[1] ];
    const isWalkable = isCoordWalkable(state, coord);

    if (isWalkable) {

        dispatch({
            type: WORLD_ACTOR_MOVE,
            payload: { id, offset }
        });

        dispatch(actorActionPoints(id, actorMove.COST));

    }
};

actorMove.COST = MOVEMENT_COST;

export default actorMove;