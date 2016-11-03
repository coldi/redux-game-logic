import { combineReducers } from 'redux';
import actors, * as fromActors from './reducers/actors';
import map, * as fromMap from './reducers/map';
import scene from './reducers/scene';

export default combineReducers({ actors, map, scene });

// why this overhead is actually a good idea:
// https://egghead.io/lessons/javascript-redux-colocating-selectors-with-reducers

// world selectors

export const getWorldState = (state) => state.world;
export const getSceneState = (state) => getWorldState(state).scene;
export const getActorsState = (state) => getWorldState(state).actors;
export const getMapState = (state) => getWorldState(state).map;

// actors selectors

export const getActorById = (state, id) =>
    fromActors.getActorById(getActorsState(state), id);

export const getActorByCoord = (state, coord) =>
    fromActors.getActorByCoord(getActorsState(state), coord);

export const hasActorEnoughAP = (state, actorOrId, cost = 0) => {
    const actor = (actorOrId instanceof Object)
        ? actorOrId
        : getActorById(state, actorOrId);
    return actor.actionPoints - cost >= 0;
};

// map selectors

export const isCoordWalkable = (state, coord) =>
    fromMap.isCoordWalkable(getMapState(state), coord);


