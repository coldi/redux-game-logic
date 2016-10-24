import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import * as reducers from './modules/reducers';

export default function createCustomStore (preloadedState) {

    const reducer = combineReducers(reducers);

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    return createStore(reducer, preloadedState, composeEnhancers(
        applyMiddleware(/* add middleware here */)
    ));

}