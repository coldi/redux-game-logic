import { getPhaseDoneState } from '../'
import phaseNext from './phaseNext'
import { CYCLE_PHASE_PROCEED } from '../constants';

/**
 * This actions gets dispatched when an actor ends his turn phase.
 * If all participants of the current phase are done the next phase is dispatched.
 *
 * @param actorId An actor id
 */
const phaseProceed = (
    actorId = ''
) => (dispatch, getState) => {

    dispatch({
        type: CYCLE_PHASE_PROCEED,
        payload: { actorId }
    });

    const state = getState();

    if (getPhaseDoneState(state)) {
        // all done, start next phase
        dispatch(phaseNext());
    }

};

export default phaseProceed;