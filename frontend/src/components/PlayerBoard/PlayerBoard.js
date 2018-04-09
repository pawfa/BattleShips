import React, {Component} from "react";
import Cell from "../../components/Cell/Cell";
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Ship from "../Ship/Ship";
import PropTypes from 'prop-types';
import './PlayerBoard.css';
import Dock from "../../Dock/Dock";



class PlayerBoard extends Component {
    static propTypes = {
        shipsPosition: PropTypes.object
    };

    collect = (shipData) => {
            console.log(shipData)
    };

    renderCell(i) {
        const x = i % 8;
        const y = Math.floor(i / 8);
        return (
            <div key={i} className='playerBoardCell'>
                <Cell x={x} y={y}>
                    {this.renderPiece(x, y)}
                </Cell>
            </div>
        )
    }

    renderPiece(x, y) {
        const [knightX, knightY] = this.props.shipsPosition.shortShip;
        const isKnightHere = (x === knightX && y === knightY) ||(x === knightX+1 && y === knightY);
        return isKnightHere ? <Ship /> : null
    }

    render() {

        const cells = [];
        for (let i = 0; i < 100; i ++) {
            cells.push(this.renderCell(i))
        }
        return <div className={'playerBoard'}>
            {cells}
            {/*<Dock dragging={this.collect}/>*/}
        </div>
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