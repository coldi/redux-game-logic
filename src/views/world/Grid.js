import React, {PropTypes} from "react";
import THREE from 'three';

import Tile from './Tile';
import Field from './Field';
import Moveable from './Moveable';
import Figure from './Figure';

const TILE_SIZE = 1;

export default function Grid ({ map = [[]], player = {} }) {

    const tiles = map.map((col, y) =>
        col.map((type, x) => (
            <Tile key={`tl_${x}_${y}`} gridX={x} gridY={y} tileSize={TILE_SIZE}>
                {(type > 0)
                    ? <Field />
                    : null}
            </Tile>
        ))
    );

    /*
    const moveables = actors.map(([x, y]) => {
        return (
            <Moveable key={`${x}_${y}`} gridX={x} gridY={y} tileSize={TILE_SIZE}>
                <Figure />
            </Moveable>
        )
    });
    */

    console.log('grid render:', player);

    const moveable = ({ id, coord }) => (
        <Moveable key={`mv_${id}`} gridX={coord[0]} gridY={coord[1]} tileSize={TILE_SIZE}>
            <Figure />
        </Moveable>
    );

    return (
        <object3D name="grid">

            <object3D name="tiles">
                {tiles}
            </object3D>

            <object3D name="moveables">
                {moveable(player)}
            </object3D>

        </object3D>
    )
}