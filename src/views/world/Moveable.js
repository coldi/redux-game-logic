import React, {PropTypes} from "react";
import THREE from 'three';
import TWEEN from 'tween.js';

import Figure from './Figure';

/*
 children,
 gridX = 0,
 gridY = 0,
 tileSize = 1
 */
export default class Moveable extends React.Component {

    state = {
        position: new THREE.Vector3()
    };

    componentWillMount () {
        this.setState({
            position: gridToWorld(this.props.gridX, this.props.gridY, this.props.tileSize)
        })
    }

    componentWillReceiveProps (nextProps) {
        if (
            this.props.gridX !== nextProps.gridX ||
            this.props.gridY !== nextProps.gridY
        ) {
            let from = this.state.position.clone();
            let to = gridToWorld(nextProps.gridX, nextProps.gridY, this.props.tileSize);

            new TWEEN.Tween(from)
                .to(to, 300)
                .onUpdate(() => this.setState({ position: from.clone() }))
                .start();
        }
    }

    shouldComponentUpdate (nextProps, nextState) {
        return !this.state.position.equals(nextState.position);
    }

    render () {

        const { position } = this.state;

        return (
            <object3D position={position}>
                {this.props.children}
            </object3D>
        )
    }

}

const gridToWorld = (gridX, gridY, tileSize) => {
    return new THREE.Vector3().fromArray([
        gridX * tileSize,
        0,
        gridY * tileSize
    ]);
};