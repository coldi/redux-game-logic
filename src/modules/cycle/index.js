import { getActorById } from '../world';
import cycle, * as fromCycle from './reducers/cycle';

export default { cycle }


// cycle selectors
export const getCurrentTurn = (state) =>
    fromCycle.getCurrentTurn(state.cycle);

export const getPhaseIndex = (state) =>
    fromCycle.getPhaseIndex(state.cycle);

export const getCurrentPhase = (state) =>
    fromCycle.getCurrentPhase(state.cycle);

export const isMemberInCurrentPhase = (state, actorId) =>
    fromCycle.isMemberInCurrentPhase(state.cycle, actorId);

// combined cycle + actors selector
export const getPhaseDoneState = (state) => {
    const phase = getCurrentPhase(state);

    for (let member of phase) {
        // TODO: decouple cycle module from world module
        let actor = getActorById(state, member.actorId);
        if (actor.isDone == false) return false;
    }

    return true;
};