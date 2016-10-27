const map = (

    state = [
        [1, 1, 0, 1, 1, 1],
        [0, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 0, 1],
        [1, 1, 1, 1, 1, 1],
    ],
    action = {}

) => {

    return state

};

export default map;

export const isCoordWalkable = (state, coord = []) => {
    const mapValue = getMapValueByCoord(state, coord);
    return testIfMap(mapValue, isWalkable)
};

const getMapValueByCoord = (state, coord = []) => {
    const [ x, y ] = coord;
    try {
        return state[y][x];
    } catch (err) {}
};

const testIfMap = (coord, isFn) => isFn(coord);

const isWalkable = (mapValue) => (
    mapValue !== 0 &&
    mapValue !== void(0)
);