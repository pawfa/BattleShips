import React, {Component} from "react";
import {Col, Row} from 'react-materialize';
import './OpponentBoard.css'
export default class OpponentBoard extends Component {

    renderCell(i) {
        const x = i % 10;
        const y = Math.floor(i / 10);
        return (
            <div key={i} className='opponentBoardCell'>
                    {i}
            </div>
        )
    }
    render() {
        const cells = [];
        for (let i = 0; i < 100; i ++) {
            cells.push(this.renderCell(i))
        }
        return <div className="opponentBoard">{cells}</div>
    }
}