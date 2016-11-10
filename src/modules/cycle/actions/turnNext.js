import { getCurrentTurn } from '../';

import { CYCLE_TURN_NEXT } from '../constants';

/**
 * Simply increases the turn count and dispatches next turn action.
 */
const turnNext = () => (dispatch, getState) => {

    const state = getState();
    const turn = getCurrentTurn(state) + 1;

    dispatch({
        type: CYCLE_TURN_NEXT,
        payload: { turn }
    });

};

export default turnNext;