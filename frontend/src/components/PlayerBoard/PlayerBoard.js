import React, {Component} from "react";
import Cell from "../../components/Cell/Cell";
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Ship from "../Ship/Ship";
import PropTypes from 'prop-types';
import './PlayerBoard.css';
import {Button} from "react-materialize";
import { shipsAreReady } from '../../Game';


class PlayerBoard extends Component {
    blockedDragging = false;
    static propTypes = {
        shipsPosition: PropTypes.object
    };

    constructor(props){
        super(props);
        this.state = {
            blockedDragging: false
        }
    }

    startGame = () => {
        this.setState({
                blockedDragging: true
            }
        );
        shipsAreReady();
    };

    renderCell(i) {
        const x = i % 10;
        const y = Math.floor(i / 10);
        return (
            <div key={i} className='playerBoardCell'>
                <Cell x={x} y={y} >
                    {this.renderPiece(x, y)}
                </Cell>
            </div>
        )
    }

    renderPiece(x, y) {

        const {shipsPosition} = this.props;
        const shipName = function(x,y){
            for (const key of Object.keys(shipsPosition)) {
                let index = shipsPosition[key].findIndex((e)=> e[0]===x && e[1] === y);
                if(index !== -1){
                    return [key, index];
                }
            }
            return '';
        };

        let shipData = shipName(x,y);
        let shipType = shipData[0];
        let shipPart = shipData[1];
        switch (shipType) {
            case 'cruiser':
                return <Ship shipLength={2} shipPart={shipPart} blockedDragging={this.state.blockedDragging}/>;
            case 'destroyer':
                return <Ship shipLength={3} shipPart={shipPart} blockedDragging={this.state.blockedDragging}/>;
            case 'battleship':
                return <Ship shipLength={4} shipPart={shipPart} blockedDragging={this.state.blockedDragging}/>;
            case 'aircraftCarrier':
                return <Ship shipLength={5} shipPart={shipPart} blockedDragging={this.state.blockedDragging}/>;
        }
        return null;
    }

    render() {

        const cells = [];
        for (let i = 0; i < 100; i ++) {
            cells.push(this.renderCell(i))
        }
        return <div><div className={'playerBoard'}>
            {cells}
        </div>
            <Button onClick={this.startGame}> Start</Button>
        </div>
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