import { WORLD_ACTOR_MOVE } from '../constants';
import { isCoordWalkable, getActorById } from '../'

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
            payload: {
                id,
                offset
            }
        });
    }
};

export default actorMove;