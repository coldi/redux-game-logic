import React, {PropTypes} from "react";
import THREE from 'three';

import Tile from './Tile';
import Field from './Field';
import Moveable from './Moveable';
import Figure from './Figure';

const TILE_SIZE = 1;

export default function Grid ({ map = [[]], actors = {} }) {

    const tiles = map.map((col, y) =>
        col.map((type, x) => (
            <Tile key={`tl_${x}_${y}`} gridX={x} gridY={y} tileSize={TILE_SIZE}>
                {(type > 0)
                    ? <Field />
                    : null}
            </Tile>
        ))
    );

    const moveables = Object.keys(actors).map((id) => {
        const actor = actors[id];
        const [ x, y ] = actor.coord;
        return (
            <Moveable key={`mv_${id}`} gridX={x} gridY={y} tileSize={TILE_SIZE}>
                <Figure color={actor.color} />
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