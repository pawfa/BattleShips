import React from 'react';
import PropTypes from 'prop-types';
import ItemsTemplate from './Template';
import { DragLayer } from 'react-dnd';

const layerStyles = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 100,
    left: 0,
    top: 0,
    width: '11%',
    height: '11%',
};


const getItemStyles = (props) => {
    const { currentOffset } = props;
    if (!currentOffset) {
        return {
            display: 'none',
        };
    }

    const { x, y } = currentOffset;

    const transform = `translate(${x}px, ${y}px)`;
    return {
        transform,
        WebkitTransform: transform,
    };
};

const collect = (monitor) => ({

    item: monitor.getItem(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
});

class FieldDragLayer extends React.Component {
    renderItem(item) {
                return (
                    <ItemsTemplate fields={item} />
                );
    }

    render() {
        const { item, isDragging } = this.props;

        if (!isDragging) {
            return null;
        }
        return (
            <div style={layerStyles}>
                <div style={getItemStyles(this.props)}>
                        {this.renderItem(item)}
                </div>
            </div>
        );
    }
}

FieldDragLayer.propTypes = {
    item: PropTypes.object,
    initialOffset: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    }),
    currentOffset: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    }),
    isDragging: PropTypes.bool.isRequired,
};
const dragLayer = DragLayer;
export default dragLayer(collect)(FieldDragLayer);