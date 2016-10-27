import actors, * as fromActors from './reducers/actors';
import map, * as fromMap from './reducers/map';
import scene from './reducers/scene';

export default { actors, map, scene }

// why this overhead is actually a good idea:
// https://egghead.io/lessons/javascript-redux-colocating-selectors-with-reducers

export const getActorById = (state, id) =>
    fromActors.getActorById(state.actors, id);

export const getActorByCoord = (state, coord) =>
    fromActors.getActorByCoord(state.actors, coord);

export const isCoordWalkable = (state, coord) =>
    fromMap.isCoordWalkable(state.map, coord);