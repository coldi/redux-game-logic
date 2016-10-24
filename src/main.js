import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import { App } from "./views/app";
import createStore from "./store";

const store = createStore();

let root = document.getElementById('root');
if (root) {
    render(
        <Provider store={store}>
            <App />
        </Provider>,
        root
    );
}