import styles from "./UI.scss";

import React, { PropTypes } from "react";
import { connect } from "react-redux";

import actorMove from '../../modules/world/actions/actorMove';

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
            </div>
        )
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        onMove: (offset) => dispatch(
            actorMove('player', offset)
        )
    }
};

export default connect(
    null, mapDispatchToProps
)(UI);