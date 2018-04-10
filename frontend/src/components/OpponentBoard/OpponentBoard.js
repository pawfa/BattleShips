import React, {Component} from "react";
import './OpponentBoard.css'
import {sendShotCoord} from "../../Game";
export default class OpponentBoard extends Component {
        constructor(props){
            super(props);
        }

    renderCell(i) {
        let shotClass = 'opponentBoardCell ';
        let currentCell = this.props.cellStatus.findIndex((e)=>{
            return e[1] === i;
        });

        if(currentCell >= 0){
            console.log('wbija');
            shotClass = this.props.cellStatus[currentCell][0] === 0 ? shotClass + 'miss': shotClass +' hit';
        }

        return (
            <div key={i} onClick={() =>{sendShotCoord(i)}} className={shotClass}>
                <div className='opponentBoardCellInterior'>{i}</div>
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