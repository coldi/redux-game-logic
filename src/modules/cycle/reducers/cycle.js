import Immutable from 'seamless-immutable';
import { find } from 'lodash';

import {
    CYCLE_PHASE_START,
    CYCLE_PHASE_PROCEED,
    CYCLE_PHASE_NEXT,
    CYCLE_TURN_NEXT
} from '../constants';

import {
    WORLD_ACTOR_CREATE
} from '../../world/constants';


const cycle = (

    state = Immutable({
        turn: 0,
        phaseIndex: 0,
        phases: [[], []]
    }),
    action = {}

) => {

    const { type } = action;



    if (type === WORLD_ACTOR_CREATE) {

        const { actor } = action.payload;

        const phaseIndex =
            (actor.id === 'player') ? 0 : 1;

        const phase = state.phases[phaseIndex].concat([{
            actorId: actor.id
        }]);

        return state.setIn(['phases', phaseIndex], phase);
    }



    if (type === CYCLE_PHASE_PROCEED) {

        return state;

    }



    if (type === CYCLE_PHASE_NEXT) {

        return state.set('phaseIndex', state.phaseIndex + 1);

    }



    if (type === CYCLE_PHASE_START) {

        return state;

    }



    if (type === CYCLE_TURN_NEXT) {


        // increase turn counter
        // reset phase index
        return state.merge({
            turn: state.turn + 1,
            phaseIndex: 0,
        });

    }



    return state;

};

export default cycle;


export const getCurrentTurn = (state) => {
    return state.turn;
};

export const getPhaseIndex = (state) => {
    return state.phaseIndex;
};

export const getCurrentPhase = (state) => {
    return state.phases[state.phaseIndex];
};

export const isMemberInCurrentPhase = (state, actorId) => {
    return !!find(getCurrentPhase(state), { actorId });
};