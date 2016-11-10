import Immutable from 'seamless-immutable';

import {
    CYCLE_PHASE_START,
    CYCLE_TURN_NEXT
} from 'modules/cycle/constants';

import {
    WORLD_ACTOR_MOVE,
    WORLD_PLAYER_LOW_AP
} from 'modules/world/constants';


const eventlog = (

    state = Immutable({
        logs: []
    }),
    action = {}

) => {

    switch (action.type) {

        case CYCLE_PHASE_START:

            const { phaseIndex } = action.payload;

            const phaseName = (phaseIndex === 0)
                ? 'Player Phase'
                : 'Compute Phase';

            return addLog(state,
                `The ${phaseName} begins ...`
            );


        case CYCLE_TURN_NEXT:

            const { turn } = action.payload;

            return addLog(state,
                `Next turn (${turn})`
            );


        case WORLD_PLAYER_LOW_AP:

            return addLog(state,
                `You are low on ActionPoints. Go for next turn!`
            );


        default:

            return state;

    }

};

export default eventlog;


export const addLog = (state, msg) => {
    const logs = state.logs.concat([ msg ]);

    return state.setIn(['logs'], logs);
};

export const getLogs = (state) => {
    return state.logs
};