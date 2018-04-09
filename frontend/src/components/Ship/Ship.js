import React, { Component } from 'react';
import './Ship.css';
import { ItemTypes } from '../../Constants';
import { DragSource } from 'react-dnd';
import PropTypes from 'prop-types';


const shipSource = {
    beginDrag(props) {
        return {};
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

        return connectDragSource(<div style={{
            fontSize: 25,
            fontWeight: 'bold',
            cursor: 'move'
        }}>
            ♘
        </div>);
    }
}
Ship.propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
};
export default DragSource(ItemTypes.SHIP, shipSource, collect)(Ship);