import React, {Component} from 'react';
import './App.css';
import Granim from 'granim';
import {Col, Row} from 'react-materialize';
import OpponentBoard from "./components/OpponentBoard/OpponentBoard";
import PlayerBoard from "./components/PlayerBoard/PlayerBoard";
import {getSocket, observe} from "./Game";

class App extends Component {

    socket;
    opponentBoard = [];

    constructor(props) {
        super(props);
        this.state = {
            opponentBoardCellStatus: [],
            playerBoardCellStatus: [],
            gameStatus: 'Set ships on the board'
        };

        this.unobserve = observe(this.handleChange.bind(this));
    }

    handleChange(shipsPosition) {
        const nextState = this.state;
        nextState.shipsPosition = shipsPosition;
        if (this.state.shipsPosition) {
            this.setState(nextState);
        } else {
            this.state.push({shipsPosition: nextState})
        }
    }


    componentDidMount() {
        this.socket = getSocket();
        let granimInstance = new Granim({
            element: '#granim-canvas',
            name: 'granim',
            opacity: [1, 1],
            states: {
                "default-state": {
                    gradients: [
                        ['#834D9B', '#D04ED6'],
                        ['#1CD8D2', '#93EDC7']
                    ]
                }
            }
        });

        this.socket.on('shotStatus', (data) => {
            console.log(data.gameStatus);
            this.setState(
                {
                    opponentBoardCellStatus: data.msg,
                    gameStatus: data.gameStatus
                }
            );

        });

        this.socket.on('opponentShotStatus', (data) => {
            console.log(data);
            this.setState(
                {
                    playerBoardCellStatus: data.msg,
                    gameStatus: data.gameStatus
                }
            );

        });


        this.socket.on('waiting', () => {
            console.log('waiting for opponent');

            this.setState(
                {
                    gameStatus: 'Waiting for opponent'
                }
            );
        });

        this.socket.on('turnWaiting', () => {
            console.log('turnWaiting');

            this.setState(
                {
                    gameStatus: 'Waiting for opponent shot'
                }
            );
        });

        this.socket.on('turnActive', () => {
            console.log('turnActive');
            this.setState(
                {
                    gameStatus: 'Your turn'
                }
            );
        });
    }

    componentWillUnmount() {
        this.unobserve()
    }

    render() {
        const {shipsPosition} = this.state;
        const {gameStatus} = this.state;
        const {opponentBoardCellStatus} = this.state;
        const {playerBoardCellStatus} = this.state;
        return (
            <div className="App">
                {this.state.gameStatus}
                <Row className="mainRow">
                    <Col className='mainCol l6'>
                        <OpponentBoard gameStatus={gameStatus} opponentBoardCellStatus={opponentBoardCellStatus}/>
                    </Col>
                    <Col className='mainCol l6'>
                        <PlayerBoard shipsPosition={shipsPosition} playerBoardCellStatus={playerBoardCellStatus}/>
                    </Col>
                </Row>
            </div>
        );
    }


}

export default App;

