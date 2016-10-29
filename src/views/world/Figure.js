import React, {PropTypes} from "react";
import THREE from 'three';

export default function Figure (props) {

    const color = props.color || 0xcccccc;
    const position = new THREE.Vector3(0, .5, 0);

    return (
        <mesh position={position}>
            <boxGeometry
                width={.5}
                height={1}
                depth={.5}
            />
            <meshLambertMaterial color={color} />
        </mesh>
    )
};