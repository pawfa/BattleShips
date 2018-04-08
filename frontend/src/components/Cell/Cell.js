import React, { Component } from 'react';
import {Col} from 'react-materialize';
import './Cell.css';
export default class Cell extends Component {

    render() {
        let btnClass = 'cell';
        if (this.props.value === 3) btnClass += ' hit';
        else if (this.props.value === 2) btnClass += ' miss';
        return <Col className={btnClass} onClick={this.props.cellClick}>{this.props.value}</Col>;
    }
}