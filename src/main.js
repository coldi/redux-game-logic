import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import { App } from "./views/app";
import createStore from "./store";

import windowResize from './modules/world/actions/windowResize';
import actorCreate from './modules/world/actions/actorCreate';

const store = createStore();

store.dispatch(windowResize());

store.dispatch(actorCreate('player', {
    color: 0xff9900,
    coord: [1, 2]
}));
store.dispatch(actorCreate('npc1', { coord: [1, 0] }));
store.dispatch(actorCreate('npc2', { coord: [3, 1] }));



let root = document.getElementById('root');
if (root) {
    render(
        <Provider store={store}>
            <App />
        </Provider>,
        root
    );
}