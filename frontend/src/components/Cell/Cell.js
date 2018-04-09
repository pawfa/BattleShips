import React, { Component } from 'react';
import {Col} from 'react-materialize';
import './Cell.css';
import PropTypes from 'prop-types';
import {ItemTypes} from "../../Constants";
import { DropTarget } from 'react-dnd';
import { moveShip } from '../../Game';

const cellTarget = {
    drop(props, monitor) {
        moveShip(props.x, props.y);
    }
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
}

class Cell extends Component {

    render() {
        const { x, y, connectDropTarget, isOver } = this.props;
        // const { value } = this.props;
        // let btnClass = 'cell';
        // if (value === 3) btnClass += ' hit';
        // else if (value === 2) btnClass += ' miss';
        // return <div>{this.props.children}<Col className={btnClass} onClick={this.props.cellClick}>{value}</Col></div>;
        return connectDropTarget(<div><Col className='cell'>
            {this.props.children}
            </Col></div>);
    }

}
Cell.propTypes = {
    // value: PropTypes.number,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired
};
export default DropTarget(ItemTypes.SHIP, cellTarget, collect)(Cell);