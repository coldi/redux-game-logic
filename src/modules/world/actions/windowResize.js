import { WINDOW_RESIZE } from '../constants';

const windowResize = (

    width = window.innerWidth,
    height = window.innerHeight,

) => ({

    type: WINDOW_RESIZE,
    payload: { width, height }

});

export default windowResize;