import phaseStart from './phaseStart'
import turnNext from './turnNext'
import { getPhaseIndex } from '../'
import { CYCLE_PHASE_NEXT } from '../constants';

/**
 * Proceeds to the next cycle phase.
 * If the next phase index exceeds the amount of implemented phases (which is simply 2)
 * it dispatches action for the next turn and resets phase index to 0.
 */
const phaseNext = () => (dispatch, getState) => {

    dispatch({ type: CYCLE_PHASE_NEXT });

    const state = getState();
    const phaseIndex = getPhaseIndex(state);

    if (phaseIndex <= 1) {
        dispatch(phaseStart(phaseIndex));
    } else {
        dispatch(turnNext());
        dispatch(phaseStart(0));
    }

};

export default phaseNext;