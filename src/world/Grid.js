import React, {PropTypes} from "react";
import THREE from 'three';

import Tile from './Tile';
import Field from './Field';
import Moveable from './Moveable';
import Figure from './Figure';

const TILE_SIZE = 1;

export default function Grid ({ map = [[]], actors = [] }) {

    const tiles = map.map((col, y) =>
        col.map((type, x) => (
            <Tile key={`${x}_${y}`} gridX={x} gridY={y} tileSize={TILE_SIZE}>
                {(type > 0)
                    ? <Field />
                    : null}
            </Tile>
        ))
    );

    const moveables = actors.map(([x, y]) => {
        return (
            <Moveable key={`${x}_${y}`} gridX={x} gridY={y} tileSize={TILE_SIZE}>
                <Figure />
            </Moveable>
        )
    });

    return (
        <object3D name="grid">

            <object3D name="tiles">
                {tiles}
            </object3D>

            <object3D name="moveables">
                {moveables}
            </object3D>

        </object3D>
    )
}