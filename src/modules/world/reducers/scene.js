import { WINDOW_RESIZE } from '../constants';
import Immutable from 'seamless-immutable';

const scene = (

    state = Immutable({
        cameraPosition: [2.5, 2, 5],
        cameraTarget: [2.5, 0, 0],
        lightPosition: [5, 5, 5],
        fov: 100,
        viewWidth: 1280,
        viewHeight: 720
    }),
    action = {}

) => {

    switch (action.type) {

        case WINDOW_RESIZE:
            const { width, height } = action.payload;
            return { ...state,
                viewWidth: width,
                viewHeight: height
            };

        default:
            return state;

    }

};

export default scene;