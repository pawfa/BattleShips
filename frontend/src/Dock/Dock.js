import React, { Component } from 'react';
import './Dock.css';
import ShortShip from "./ShortShip";

export default class Dock extends Component {

    render() {
        return <div className='dock'>
            <ShortShip shipLength = {2} dragging={this.props.dragging}/>
        </div>;
    }

}
