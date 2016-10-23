import React, {PropTypes} from "react";
import THREE from 'three';
import React3 from 'react-three-renderer';
import TWEEN from 'tween.js';

import Grid from './Grid';

export default class World extends React.Component {

    static propTypes = {};

    static defaultProps = {};

    state = {
        cameraPosition: [2, 2, 5],
        cameraTarget: [2, 0, 0],
        lightPosition: [5, 5, 5],
        actors: [
            [1, 1]
        ],
        map: [
            [1, 1, 0, 1],
            [0, 1, 1, 1],
            [1, 1, 1, 1],
        ]
    };

    renderer;
    scene;
    camera;
    animationFrame;

    componentDidMount () {

        this.handleAnimate();

    }

    componentWillUnmount () {

        cancelAnimationFrame(this.animationFrame);

    }
    
    handleRendererUpdated (renderer) {
        // note: this gets called before component did mount
        this.renderer = renderer;
    }

    handleAnimate (time) {

        this.animationFrame = requestAnimationFrame((t) => this.handleAnimate(t));

        /*
        this.setState((prevState) => ({
            cubeRotation: new THREE.Euler(
                prevState.cubeRotation.x + 0.05,
                prevState.cubeRotation.y + 0.05,
                0
            )
        }));
        */

        TWEEN.update(time);

        const { renderer, scene, camera } = this;

        if (renderer && scene && camera) {
            // possibly swap with effectcomposer
            renderer.render(scene, camera);
        }
    }

    render () {

        const { state } = this;
        const width = window.innerWidth; // canvas width
        const height = window.innerHeight; // canvas height
        const aspect = width / height;

        return (
            <React3
                mainCamera="camera" // this points to the perspectiveCamera named "camera" below
                width={width}
                height={height}
                antialias={true}
                //onAnimate={() => this.handleAnimate()}
                onRendererUpdated={(renderer) => this.handleRendererUpdated(renderer)}
                onManualRenderTriggerCreated={() => null}
                forceManualRender={true}
            >
                <scene ref={(ref) => this.scene = ref}>

                    <ambientLight
                        color={0xffffff}
                        intensity={.5}
                    />

                    <perspectiveCamera
                        name="camera"
                        fov={75}
                        aspect={aspect}
                        near={0.1}
                        far={1000}
                        position={vectorFromArray(state.cameraPosition)}
                        lookAt={vectorFromArray(state.cameraTarget)}
                        ref={(ref) => this.camera = ref}
                    >
                        <pointLight
                            color={0xffffff}
                            intensity={.5}
                            position={vectorFromArray(state.lightPosition)}
                        />
                    </perspectiveCamera>

                    <Grid map={state.map} actors={state.actors} />

                </scene>
            </React3>
        )
    }
}


const vectorFromArray = (arr) =>
    new THREE.Vector3().fromArray(arr);
