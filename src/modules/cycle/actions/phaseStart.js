import autonomicActorAction from '../../world/actions/autonomicActorAction';
import { getCurrentPhase } from '../';
import { CYCLE_PHASE_START } from '../constants';


const phaseStart = (
    phaseIndex = -1
) => (dispatch, getState) => {

    dispatch({
        type: CYCLE_PHASE_START,
        payload: { phaseIndex }
    });

    const state = getState();

    if (phaseIndex === 1) {

        const phaseMembers = getCurrentPhase(state);

        phaseMembers.forEach((member) => {
            // TODO: decouple cycle module from world module
            dispatch(autonomicActorAction(member.actorId));
        });

    }

};

export default phaseStart;