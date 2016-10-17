import React, {PropTypes} from "react";
import THREE from 'three';
import React3 from 'react-three-renderer';

export default class World extends React.Component {

    static propTypes = {};

    static defaultProps = {};

    state = {
        cameraPosition: new THREE.Vector3(0, 0, 5),
        lightPosition: new THREE.Vector3(5, 5, 5),
        cubeRotation: new THREE.Euler(0, 0, 0)
    };

    onAnimate () {
        const { state } = this;

        this.setState({
            cubeRotation: new THREE.Euler(
                state.cubeRotation.x + 0.05,
                state.cubeRotation.y + 0.05,
                0
            ),
        });
    }

    render () {
        const width = window.innerWidth; // canvas width
        const height = window.innerHeight; // canvas height
        const aspect = width / height;
        const { state } = this;

        return (
            <React3
                mainCamera="camera" // this points to the perspectiveCamera which has the name set to "camera" below
                width={width}
                height={height}
                antialias={true}
                onAnimate={() => this.onAnimate()}
            >
                <scene>
                    <ambientLight
                        color={0xffffff}
                        intensity={.5}
                    />
                    <pointLight
                        color={0xffffff}
                        intensity={.5}
                        position={state.lightPosition}
                    />
                    <perspectiveCamera
                        name="camera"
                        fov={75}
                        aspect={aspect}
                        near={0.1}
                        far={1000}
                        position={state.cameraPosition}
                    />
                    <mesh rotation={state.cubeRotation}>
                        <boxGeometry
                            width={1}
                            height={1}
                            depth={1}
                        />
                        <meshLambertMaterial
                            color={0x00ff00}
                        />
                    </mesh>
                </scene>
            </React3>
        )
    }

}