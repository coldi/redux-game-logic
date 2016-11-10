import {
    WORLD_ACTOR_ACTIONPOINTS
} from '../constants';

/**
 * Subtract a specific amount (cost) of an actor's action points.
 *
 * @param id An actor id
 * @param cost Action point cost
 */
const actorActionPoints = (
    id = '',
    cost = 0
) => (dispatch, getState) => {

    dispatch({
        type: WORLD_ACTOR_ACTIONPOINTS,
        payload: { id, cost }
    });

};

export default actorActionPoints;