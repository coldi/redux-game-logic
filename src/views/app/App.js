import React from "react";

import AppLayout from "./AppLayout";
import World from "../world/World";
import UI from "../ui/UI";

export default function App (props) {
    return (
        <AppLayout>
            <World />
            <UI />
        </AppLayout>
    )
}