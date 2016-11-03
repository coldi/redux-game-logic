import styles from "./UI.scss";

import React, { PropTypes } from "react";
import { connect } from "react-redux";

import phaseProceed from '../../modules/cycle/actions/phaseProceed';
import actorAction from '../../modules/world/actions/actorAction';
import actorMove from '../../modules/world/actions/actorMove';
import { getActorById } from '../../modules/world';


export class UI extends React.Component {

    static propTypes = {};

    static defaultProps = {};

    state = {};

    render () {

        const { props } = this;

        return (
            <div className={styles.UI}>
                <div className={styles.Controls}>
                    <p>Move</p>
                    <button onClick={() => props.onMove([0, -1])}>UP</button><br/>
                    <button onClick={() => props.onMove([-1, 0])}>LEFT</button>
                    <button onClick={() => props.onMove([1, 0])}>RIGHT</button><br/>
                    <button onClick={() => props.onMove([0, 1])}>DOWN</button>
                </div>
                <div className={styles.Stats}>
                    <p>Stats</p>
                    <ul>
                        <li>AP: {props.player.actionPoints}</li>
                    </ul>
                    <ul>
                        <li>Phase: {props.cycle.phaseIndex}</li>
                        <li>Turn: {props.cycle.turn}</li>
                    </ul>
                    <button onClick={props.onPhaseProceed}>Next turn</button>
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        cycle: state.cycle,
        player: getActorById(state, 'player')
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onMove: (offset) => dispatch(
            actorAction('player', actorMove, offset)
        ),
        onPhaseProceed: () => dispatch(
            phaseProceed('player')
        )
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UI);