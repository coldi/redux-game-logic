import styles from "./AppLayout.scss";

import React from "react";


export default function AppLayout (props) {
    return (
        <div className={styles.AppLayout}>
            {props.children}
        </div>
    )
}