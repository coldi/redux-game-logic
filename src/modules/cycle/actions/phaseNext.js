import phaseStart from './phaseStart'
import turnNext from './turnNext'
import { getPhaseIndex } from '../'
import { CYCLE_PHASE_NEXT } from '../constants';


const phaseNext = () => (dispatch, getState) => {

    dispatch({ type: CYCLE_PHASE_NEXT });

    const state = getState();
    const phaseIndex = getPhaseIndex(state);

    if (phaseIndex > 1) {
        dispatch(turnNext());
        dispatch(phaseStart(0));
    } else {
        dispatch(phaseStart(phaseIndex));
    }

};

export default phaseNext;