import { isMemberInCurrentPhase } from 'modules/cycle'
import { hasActorEnoughAP } from '../'

import { WORLD_PLAYER_LOW_AP } from '../constants';


const actorAction = (
    id = '', // actor id
    action, // action creator
    ...actionArgs // arguments for action creator
) => (dispatch, getState) => {

    if (action instanceof Function) {

        const state = getState();

        if (isMemberInCurrentPhase(state, id)) {

            const cost =  action.COST || 0;

            if (cost) {

                if (hasActorEnoughAP(state, id, cost)) {

                    dispatch(action(id, ...actionArgs));

                } else {

                    if (id === 'player') {
                        dispatch({ type: WORLD_PLAYER_LOW_AP });
                    }

                }

            }

        }

    }

};

export default actorAction;