import React, {Component} from 'react';
import Cell from '../../components/Cell/Cell';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Ship from '../Ship/Ship';
import PropTypes from 'prop-types';
import './PlayerBoard.css';
import {Button} from 'react-materialize';
import {shipsAreReady} from '../../Game';
import ItemsDragLayer from '../../dnd/ItemsDragLayer';

class PlayerBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blockedDragging: false,
    };
  }

  renderCell(i) {
    const x = i % 10;
    const y = Math.floor(i / 10);
    let shotClass = 'playerBoardCell ';
    let currentCell = this.props.playerBoardCellStatus.findIndex((e) => {
      return e[1] === i;
    });

    if (currentCell >= 0) {
      shotClass = this.props.playerBoardCellStatus[currentCell][0] === 0
          ? shotClass + 'miss'
          : shotClass + ' hit';
    }

    return (
        <div key={i} className={shotClass}>
          <Cell x={x} y={y}>
            {this.renderPiece(x, y)}
          </Cell>
        </div>
    );
  }

  renderPiece(x, y) {

    const {shipsPosition, blockedDragging} = this.props;
    //todo change to filter
    const shipName = function(x, y) {

      for (const key of Object.keys(shipsPosition)) {
        let index = shipsPosition[key].findIndex(
            (e) => e[0] === x && e[1] === y);
        if (index !== -1) {
          return [key, index];
        }
      }
      return '';
    };

    let shipData = shipName(x, y);
    if (shipData.length === 0) return null;
    let shipType = shipData[0];
    let shipPart = shipData[1];

    switch (shipType) {
      case 'cruiser':
        return <Ship shipLength={2} shipPart={shipPart}
                     blockedDragging={blockedDragging}/>;
      case 'destroyer':
        return <Ship shipLength={3} shipPart={shipPart}
                     blockedDragging={blockedDragging}/>;
      case 'battleship':
        return <Ship shipLength={4} shipPart={shipPart}
                     blockedDragging={blockedDragging}/>;
      case 'aircraftCarrier':
        return <Ship shipLength={5} shipPart={shipPart}
                     blockedDragging={blockedDragging}/>;
    }
  }

  render() {

    const cells = [];
    for (let i = 0; i < 100; i++) {
      cells.push(this.renderCell(i));
    }
    return <div className={'playerBoardWrapper'}>
      <div className={'playerBoard'}>
        <ItemsDragLayer/>
        {cells}
      </div>
    </div>;
  }
}

PlayerBoard.propTypes = {
  shipsPosition: PropTypes.object,
  playerBoardCellStatus: PropTypes.array.isRequired,
  blockedDragging: PropTypes.bool.isRequired,
};
export default DragDropContext(HTML5Backend)(PlayerBoard);