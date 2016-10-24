import { WORLD_ACTOR_MOVE } from '../constants';

const actorMove = (
    id = '',
    offset = [0, 0]
) => ({
    type: WORLD_ACTOR_MOVE,
    id,
    offset
});

export default actorMove;