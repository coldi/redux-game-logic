import {
    WORLD_ACTOR_ACTIONPOINTS
} from '../constants';


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