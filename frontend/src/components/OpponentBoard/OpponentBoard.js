import React, {Component} from "react";
import {Col, Row} from 'react-materialize';
import Cell from "../../components/Cell/Cell";
export default class OpponentBoard extends Component {

    render() {
        let tmpBoard = [];
        let cells = [];
        for (let i = 0; i < this.props.board.length; i++) {
            for (let j = 0; j < this.props.board[i].length; j++) {
                cells.push(<Cell cellClick={this.props.shot.bind(this,this.props.board[i].length * i + j)}
                                 key={this.props.board[i].length * i + j} value={this.props.board[i][j]}/>);
            }
            tmpBoard.push(<div className='container' key={i}><Row className='boardRow' key={i}>{cells}</Row></div>);
            cells = [];

        }
        return <Col className="l6 player">{tmpBoard}</Col>;
    }
}