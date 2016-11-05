import eventlog, * as fromEventlog from './reducers/eventlog';

export default { eventlog }

export const getLogs = (state) =>
    fromEventlog.getLogs(state.eventlog);