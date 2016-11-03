import world from './world';
import cycle from './cycle';

const reducers = {
    world,
    ...cycle
};

export default reducers;