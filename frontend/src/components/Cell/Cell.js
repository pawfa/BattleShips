import React, { Component } from 'react';
import './Cell.css';
import PropTypes from 'prop-types';
import {ItemTypes} from "../../Constants";
import { DropTarget } from 'react-dnd';
import { moveShip } from '../../Game';

const cellTarget = {
    drop(props, monitor) {
        const item = monitor.getItem();
        moveShip([props.x, props.y],item.shipLength, item.shipPart);
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
        return connectDropTarget(<div className='cell'>
            {this.props.children}
            </div>);
    }

}
Cell.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired
};
export default DropTarget(ItemTypes.SHIP, cellTarget, collect)(Cell);