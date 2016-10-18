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

    handleAnimate () {

        this.animationFrame = requestAnimationFrame(() => this.handleAnimate());

        this.setState((prevState) => ({
            cubeRotation: new THREE.Euler(
                prevState.cubeRotation.x + 0.05,
                prevState.cubeRotation.y + 0.05,
                0
            )
        }));

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
                        ref={(ref) => this.camera = ref}
                    />
                    <mesh rotation={state.cubeRotation}>
                        <boxGeometry
                            width={1}
                            height={1}
                            depth={1}
                        />
                        <meshLambertMaterial color={0x00ff00} />
                    </mesh>
                </scene>
            </React3>
        )
    }

}