import React, {PropTypes} from "react";

export default class Field extends React.PureComponent {

    render () {

        let color = 0x008800 * Math.random() + 0x008800;

        return (
            <mesh>
                <boxGeometry
                    width={1}
                    height={.25}
                    depth={1}
                />
                <meshLambertMaterial color={color} />
            </mesh>
        )

    }
};