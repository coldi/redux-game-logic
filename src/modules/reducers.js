import world from './world';
import cycle from './cycle';
import eventlog from './eventlog';

const reducers = {
    world,
    ...cycle,
    ...eventlog
};

export default reducers;