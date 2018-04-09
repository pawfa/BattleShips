import React, { Component } from 'react';
import './Ship.css';
import Cell from "../Cell/Cell";
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
        // let shipContainer = [];
        // console.log(this.props.value);
        // for(let i = 0; i <=this.props.value; i++){
        //     shipContainer.push(<Cell key={i}>{this.props.value}</Cell>)
        // }
        // console.log(shipContainer);
        // let btnClass = 'cell';
        // if (this.props.value === 3) btnClass += ' hit';
        // else if (this.props.value === 2) btnClass += ' miss';

        // return connectDragSource(<span>♘</span>);
        return connectDragSource(<div style={{
            // opacity: isDragging ? 0.5 : 1,
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