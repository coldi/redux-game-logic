import React, {PropTypes} from "react";
import { connect } from "react-redux";
import THREE from 'three';
import React3 from 'react-three-renderer';
import TWEEN from 'tween.js';

import Grid from './Grid';
import actorMove from '../../modules/world/actions/actorMove';

export class World extends React.Component {

    static propTypes = {};

    static defaultProps = {
        map: [],
        actors: {},
        scene: {},
        onMove: () => null
    };

    renderer;
    scene;
    camera;
    animationFrame;

    componentDidMount () {

        this.handleAnimate();

        setTimeout(() => {
            this.props.onMove([1, 1])
        }, 600)

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

        TWEEN.update(time);

        const { renderer, scene, camera } = this;

        if (renderer && scene && camera) {
            // possibly swap with effectcomposer
            renderer.render(scene, camera);
        }
    }

    render () {

        const { props } = this;
        const width = window.innerWidth; // canvas width
        const height = window.innerHeight; // canvas height
        const aspect = width / height;

        console.log('world render:', props.actors.player);

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
                        position={vectorFromArray(props.scene.cameraPosition)}
                        lookAt={vectorFromArray(props.scene.cameraTarget)}
                        ref={(ref) => this.camera = ref}
                    >
                        <pointLight
                            color={0xffffff}
                            intensity={.5}
                            position={vectorFromArray(props.scene.lightPosition)}
                        />
                    </perspectiveCamera>

                    <Grid map={props.map} player={props.actors.player} />

                </scene>
            </React3>
        )
    }
}

const mapStateToProps = (state) => {
    const { map, actors, scene } = state;
    return { map, actors, scene }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onMove: (offset) => dispatch(
            actorMove('player', offset)
        )
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(World);


const vectorFromArray = (arr) =>
    new THREE.Vector3().fromArray(arr);
