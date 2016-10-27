import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';

import * as reducers from './modules/reducers';


export default function createCustomStore (preloadedState) {

    const { world } = reducers;
    const reducer = combineReducers({ ...world /*, ...other, ...reducers */ });

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    return createStore(reducer, preloadedState, composeEnhancers(
        applyMiddleware(ReduxThunk)
    ));

}


// TODO: improve unwrapping of objects?
// makes imported modules iterable with for..of
function* iterateObject(o) {
    const keys = Object.keys(o);
    for (var n = 0; n < keys.length; n++) {
        yield o[keys[n]];
    }
}

// unwraps objects like so:
// { outer: { inner1, inner2, innerN } } => { inner1, inner2, innerN }
function unwrapReducers(reducers, plainReducerMap = {}) {
    for (let wrap of iterateObject(reducers)) {
        for (let reducer of iterateObject(wrap)) {
            plainReducerMap = { ...plainReducerMap, reducer }
        }
    }
    return plainReducerMap;
}