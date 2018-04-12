import React, { Component } from 'react';
import './Ship.css';
import { ItemTypes } from '../../Constants';
import { DragSource } from 'react-dnd';
import PropTypes from 'prop-types';


const shipSource = {
    beginDrag(props) {
        const { shipLength } = props;
        const { shipPart } = props;
        return {shipLength, shipPart};
    },

    canDrag(props) {
        // You can disallow drag based on props
        return !props.blockedDragging;
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}



class Ship extends Component {

    render() {
        const { connectDragSource, isDragging } = this.props;
        const {shipLength} = this.props;
        const {shipPart} = this.props;
        let shipClass = shipLength-1 === shipPart ? 'shipEnd' : shipPart === 0 ? 'shipBeginning' : 'ship';
        return connectDragSource(<div style={{
            cursor: this.props.blockedDragging? 'pointer':'move'
        }} className={shipClass}>
        </div>);
    }
}
Ship.propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    shipLength: PropTypes.number.isRequired,
    shipPart: PropTypes.number.isRequired,
    blockedDragging: PropTypes.bool.isRequired
};
export default DragSource(ItemTypes.SHIP, shipSource, collect)(Ship);