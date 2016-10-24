import { WORLD_ACTOR_MOVE } from '../constants';

const actors = (

    state = { // assoc array
        'player': {
            id: 'player',
            offset: [1, 1]
        }
    },
    action = {}

) => {

    switch (action.type) {

        case WORLD_ACTOR_MOVE:
            const { id, offset } = action;
            // better use some immutable tools here
            const actor = { ...state[id] };
            const updatedOffset = [ actor.offset[0] + offset[0], actor.offset[1] + offset[1] ];
            const updatedActor = { ...actor, offset: updatedOffset };
            
            return { ...state, [id]: updatedActor };

        default:
            return state;

    }

};

export default actors;