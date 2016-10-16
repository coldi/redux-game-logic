import React from "react";
import ReactDOM from "react-dom";

import { App } from "./app";

let root = document.getElementById('root');
if (root) {
    ReactDOM.render(<App />, root);
}