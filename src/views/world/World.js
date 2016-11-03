import React, {PropTypes} from "react";
import { connect } from "react-redux";
import THREE from 'three';
import React3 from 'react-three-renderer';
import TWEEN from 'tween.js';
import { debounce } from 'lodash';

import Grid from './Grid';
import { getWorldState } from '../../modules/world';
import windowResize from '../../modules/world/actions/windowResize';
import actorMove from '../../modules/world/actions/actorMove';

export class World extends React.Component {

    static propTypes = {};

    static defaultProps = {
        map: [],
        actors: {},
        scene: {},
        onMove: () => null,
        onResize: () => null,
    };

    renderer;
    scene;
    camera;
    animationFrame;
    windowResizeProxy;

    componentDidMount () {

        this.handleAnimate();

        this.windowResizeProxy = debounce((e) => this.props.onResize(e), 100);
        window.addEventListener('resize', this.windowResizeProxy);

        this.resize();

    }

    componentDidUpdate (nextProps) {

        const { props } = this;

        if (nextProps.scene.viewWidth !== props.scene.viewWidth ||
            nextProps.scene.viewHeight !== props.scene.viewHeight) {
            this.resize();
        }
    }

    componentWillUnmount () {

        cancelAnimationFrame(this.animationFrame);

        window.removeEventListener('resize', this.windowResizeProxy);

    }
    
    handleRendererUpdated (renderer) {
        // note: this gets called before component did mount
        this.renderer = renderer;
    }

    handleAnimate (time) {

        this.animationFrame = requestAnimationFrame((t) => this.handleAnimate(t));

        // TODO: later: move TWEEN.update() to a really global rAF loop
        TWEEN.update(time);

        const { renderer, scene, camera } = this;

        if (renderer && scene && camera) {
            // possibly swap with effectcomposer
            renderer.render(scene, camera);
        }
    }

    resize () {

        const { scene } = this.props;

        this.camera.aspect = scene.viewWidth / scene.viewHeight;

        //let fov = scene.fov / this.camera.aspect;
        //this.camera.fov = Math.min(fov, scene.fov);
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(scene.viewWidth, scene.viewHeight);

    }

    render () {

        const { props } = this;
        const width = props.scene.viewWidth; // canvas width
        const height = props.scene.viewHeight; // canvas height
        const aspect = width / height;

        return (
            <React3
                mainCamera="camera" // this points to the perspectiveCamera named "camera" below
                width={props.scene.viewWidth}
                height={props.scene.viewHeight}
                clearColor={0x444444}
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

                    <Grid map={props.map} actors={props.actors} />

                </scene>
            </React3>
        )
    }
}

const mapStateToProps = (state) => {
    const { map, actors, scene } = getWorldState(state);
    return { map, actors, scene }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onMove: (offset) => dispatch(
            actorMove('player', offset)
        ),
        onResize: (e) => dispatch(
            windowResize(e.target.innerWidth, e.target.innerHeight)
        )
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(World);


const vectorFromArray = (arr) =>
    new THREE.Vector3().fromArray(arr);
