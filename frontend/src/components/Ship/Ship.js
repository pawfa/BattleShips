import React, { Component } from 'react';
import './Ship.css';
import { ItemTypes } from '../../Constants';
import { DragSource } from 'react-dnd';
import PropTypes from 'prop-types';
import {getEmptyImage} from "react-dnd-html5-backend";


const shipSource = {
    beginDrag(props) {
        return {...props};
    },

    canDrag(props) {
        return !props.blockedDragging;
    }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

class Ship extends Component {

    componentDidMount() {

        this.props.connectDragPreview(getEmptyImage(), {
            captureDraggingState: true,
        });
    }

    render() {
        const {connectDragSource,shipLength, shipPart} = this.props;
        let shipClass = shipLength-1 === shipPart ? 'shipEnd' : shipPart === 0 ? 'shipBeginning' : 'ship';
        return connectDragSource(<div style={{
            cursor: this.props.blockedDragging? 'pointer':'move'
        }} className={shipClass}>
        </div>);
    }
}
Ship.propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    shipLength: PropTypes.number.isRequired,
    shipPart: PropTypes.number.isRequired,
    blockedDragging: PropTypes.bool.isRequired
};
export default DragSource(ItemTypes.SHIP, shipSource, collect)(Ship);