import React from "react";

import AppLayout from "./AppLayout";
import World from "../world/World";

export default function App (props) {
    return (
        <AppLayout>
            <World />
        </AppLayout>
    )
}