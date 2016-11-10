import { hasActorEnoughAP } from '../'
import actorAction from './actorAction';
import actorMove from './actorMove';
import phaseProceed from '../../cycle/actions/phaseProceed';
import { WORLD_AUTONOMIC_ACTOR_ACTION } from '../constants';

/**
 * This is an action wrapper that is used by non-player actors.
 * It dispatches itself as long as the actor has enough action points.
 * Then it dispatches an action to end it's turn phase.
 *
 * @param id An actor id
 */
const autonomicActorAction = (
    id = '', // actor id
) => (dispatch, getState) => {

    dispatch({ type: WORLD_AUTONOMIC_ACTOR_ACTION });

    // in future: perform some smart algorithm to get these values:
    const actionToDispatch = actorMove;
    const actionArgs = [getRandomOffset()];
    // then continue...

    const state = getState();

    const cost = actionToDispatch.COST || 0;

    if (hasActorEnoughAP(state, id, cost)) {

        dispatch(actorAction(id, actionToDispatch, ...actionArgs));

        setTimeout(() => {
            dispatch(autonomicActorAction(id));
        }, 500);

    } else {

        // TODO: decouple world module from cycle module
        dispatch(phaseProceed(id));

    }
};

export default autonomicActorAction;


const getRandomOffset = () => {
    const n = (Math.random() > .5) ? 1 : -1;

    return (Math.random() > .5)
        ? [ n, 0 ]
        : [ 0, n ]
};
