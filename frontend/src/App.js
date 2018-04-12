import React, {Component} from 'react';
import './App.css';
import {Button, Col, Row} from 'react-materialize';
import OpponentBoard from "./components/OpponentBoard/OpponentBoard";
import PlayerBoard from "./components/PlayerBoard/PlayerBoard";
import {getSocket, observe, shipsAreReady} from "./Game";

class App extends Component {

    socket;
    opponentBoard = [];

    constructor(props) {
        super(props);
        this.state = {
            opponentBoardCellStatus: [],
            playerBoardCellStatus: [],
            gameStatus: 'Set ships on the board',
            blockedDragging: false
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

    startGame = () => {
        this.setState({
                blockedDragging: true
            }
        );
        shipsAreReady();
    };


    componentDidMount() {
        this.socket = getSocket();
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
        this.socket.on('opponentDisconnected', () => {
            console.log("Przeciwnik sie rozlaczyl");
            this.setState(
                {
                    gameStatus: 'Opponent disconnected'
                }
            );
            this.socket.close();
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
        const {blockedDragging} = this.state;
        let disabledButton = this.state.blockedDragging ? 'disabled light-blue darken-1': 'light-blue darken-1';
        return (
            <div className="App">
                <Row>
                    <h2>BattleShips</h2>
                    <div className={'gameStatus'}>{this.state.gameStatus}</div>

                </Row>
                <Row className="mainRow">
                    <Col className='mainCol l5'>
                        <OpponentBoard gameStatus={gameStatus}  opponentBoardCellStatus={opponentBoardCellStatus}/>
                    </Col>
                    <Col className='l2'><Button className={disabledButton} onClick={this.startGame}> Start</Button></Col>
                    <Col className='mainCol l5'>
                        <PlayerBoard shipsPosition={shipsPosition} blockedDragging={blockedDragging} playerBoardCellStatus={playerBoardCellStatus}/>
                    </Col>
                </Row>
            </div>
        );
    }


}

export default App;

