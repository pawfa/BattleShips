import React, {Component} from "react";
import './OpponentBoard.css'
import {sendShotCoord} from "../../Game";
import PropTypes from "prop-types";

export default class OpponentBoard extends Component {
    hits = {
        cruiser: 2,
        destroyer: 3,
        battleship: 4,
        aircraftCarrier: 5,
    };


    constructor(props) {
        super(props);
    }

    renderCell(i) {
        let shotClass = 'opponentBoardCell ';
        const {opponentBoardCellStatus} = this.props;
        let currentCell = opponentBoardCellStatus.findIndex((e) => {
            return e[1] === i;
        });

        if (currentCell >= 0) {
            if(opponentBoardCellStatus[currentCell][0] === 0){
                shotClass = shotClass+'miss';

            }else{
                shotClass = shotClass+'hit';
                this.hits[opponentBoardCellStatus[currentCell][0]]--;
            }
            console.log(this.hits);
        }

        return (
            <div key={i} onClick={() => {
                sendShotCoord(i)
            }} className={shotClass}>
                <div className='opponentBoardCellInterior'/>
            </div>
        )
    }

    render() {
        const cells = [];
        let startGame = this.props.gameStatus === 'Your turn' ? {}: {'pointerEvents': 'none'};
        for (let i = 0; i < 100; i++) {
            cells.push(this.renderCell(i))
        }
        return <div style={startGame} className="opponentBoard">{cells}</div>
    }

}
OpponentBoard.propTypes = {
    gameStatus: PropTypes.string.isRequired,
    opponentBoardCellStatus: PropTypes.array.isRequired
};