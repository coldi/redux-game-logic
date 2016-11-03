import { getPhaseDoneState } from '../'
import phaseNext from './phaseNext'
import { CYCLE_PHASE_PROCEED } from '../constants';

// ACTOR_DONE ?
const phaseProceed = (
    actorId = ''
) => (dispatch, getState) => {

    dispatch({
        type: CYCLE_PHASE_PROCEED,
        payload: { actorId }
    });

    const state = getState();

    if (getPhaseDoneState(state)) {
        // PHASE_NEXT
        dispatch(phaseNext());
    }

};

export default phaseProceed;