import { WORLD_ACTOR_CREATE } from '../constants';

/**
 * Creates an actor.
 *
 * @param id An unique id
 * @param props Specific actor props
 */
const actorCreate = (
    id = '',
    props = {}
) => (dispatch, getState) => {

    const actor = {
        id,
        color: 0xcccccc,
        coord: [0, 0],
        actionPoints: 3,
        actionPointsMax: 3,
        isDone: false,
        ...props
    };

    dispatch({
        type: WORLD_ACTOR_CREATE,
        payload: { actor }
    });

};

export default actorCreate;