import React, {Component} from "react";
import {Col, Row} from 'react-materialize';
import Cell from "../../components/Cell/Cell";
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Ship from "../Ship/Ship";
import PropTypes from 'prop-types';
import './PlayerBoard.css';

class PlayerBoard extends Component {
    static propTypes = {
        shipPosition: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    };

    renderCell(i) {
        const x = i % 8;
        console.log(x);
        const y = Math.floor(i / 8);
        console.log(y);
        return (
            <div key={i} style={{ width: '12.5%', height: '12.5%' }}>
                <Cell x={x} y={y}>
                    {this.renderPiece(x, y)}
                </Cell>
            </div>
        )
    }

    renderPiece(x, y) {
        const [knightX, knightY] = this.props.shipPosition;
        const isKnightHere = x === knightX && y === knightY;
        return isKnightHere ? <Ship /> : null
    }

    render() {

        const squares = [];
        for (let i = 0; i < 64; i ++) {
            console.log(i);
            squares.push(this.renderCell(i))
        }
        return <div className="Board">{squares}</div>
        // const cells = [];
        // for (let i = 0; i < 64; i++) {
        //     cells.push(this.renderCell(i));
        // }
        // return (
        //     <div style={{
        //         // width: '100%',
        //         // height: '100%',
        //         display: 'flex',
        //         flexWrap: 'wrap'
        //     }}>
        //         {cells}
        //     </div>
        // );



        // let tmpBoard = [];
        // let cells = [];
        // for (let i = 0; i < this.props.board.length; i++) {
        //     for (let j = 0; j < this.props.board[i].length; j++) {
        //         cells.push(<Cell cellClick={this.props.putShip.bind(this,this.props.board[i].length * i + j)}
        //                          key={this.props.board[i].length * i + j} value={this.props.board[i][j]}/>);
        //     }
        //     tmpBoard.push(<div className='container' key={i}><Row className='boardRow' key={i}>{cells}</Row></div>);
        //     cells = [];
        //
        // }
        // return <div><Col className="l6 player">{tmpBoard}</Col><Ship value={3}/></div>;
    }
}

export default DragDropContext(HTML5Backend)(PlayerBoard);