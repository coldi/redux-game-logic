import React, {PropTypes} from "react";
import THREE from 'three';

export default function Tile ({

    children,
    gridX = 0,
    gridY = 0,
    tileSize = 1

}) {

    const position = new THREE.Vector3().fromArray([
        gridX * tileSize,
        0,
        gridY * tileSize
    ]);

    return (
        <object3D position={position}>
            {children}
        </object3D>
    )

}