import { isMemberInCurrentPhase } from 'modules/cycle'
import { hasActorEnoughAP } from '../'

import { WORLD_PLAYER_LOW_AP } from '../constants';

/**
 * This action creator is used to handle other actor related actions.
 * It checks if the actor is allowed to perform an action and if he has enough action points.
 *
 * @param id An actor id
 * @param action Another actor related action creator
 * @param actionArgs Arguments for the passed action creator
 */
const actorAction = (
    id = '',
    action,
    ...actionArgs
) => (dispatch, getState) => {

    if (action instanceof Function) {

        const state = getState();

        if (isMemberInCurrentPhase(state, id)) {

            const cost =  action.COST || 0;

            if (hasActorEnoughAP(state, id, cost)) {

                dispatch(action(id, ...actionArgs));

            } else {

                if (id === 'player') {
                    dispatch({ type: WORLD_PLAYER_LOW_AP });
                }

            }

        }

    }

};

export default actorAction;