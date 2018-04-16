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
            blockedDragging: false,
            buttonStatus: 'Start'
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
        if (this.state.buttonStatus === 'Start') {
            this.setState({
                    blockedDragging: true
                }
            );
            shipsAreReady();
        } else {
            this.socket.emit('newGame');
            this.setState({
                    opponentBoardCellStatus: [],
                    playerBoardCellStatus: [],
                    buttonStatus: 'Start',
                    gameStatus: 'Set ships on the board'
                }
            );
        }
    };


    componentDidMount() {
        this.socket = getSocket();
        this.socket.on('shotStatus', (data) => {
            this.setState(
                {
                    opponentBoardCellStatus: data.msg,
                    gameStatus: data.gameStatus
                }
            );

        });

        this.socket.on('opponentShotStatus', (data) => {
            this.setState(
                {
                    playerBoardCellStatus: data.msg,
                    gameStatus: data.gameStatus
                }
            );

        });

        this.socket.on('turnStatus', (data) => {
            if (data.msg === 'You won' || data.msg === 'You lost') {
                this.setState(
                    {
                        blockedDragging: false,
                        buttonStatus: 'Play again?'
                    }
                );
            }

            this.setState(
                {
                    gameStatus: data.msg
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
        const {buttonStatus} = this.state;
        let disabledButton = this.state.blockedDragging ? 'disabled light-blue darken-1' : 'light-blue darken-1';
        return (
            <div className="App">
                <Row>
                    <h2>BattleShips</h2>
                    <div className={'gameStatus valign-wrapper'}><h6
                        className={'center-block'}>{this.state.gameStatus}</h6></div>

                </Row>
                <Row className="mainRow">
                    <Col className='mainCol l5'>
                        <OpponentBoard gameStatus={gameStatus} opponentBoardCellStatus={opponentBoardCellStatus}/>
                    </Col>
                    <Col className='l2'><Button className={disabledButton}
                                                onClick={this.startGame}> {buttonStatus}</Button></Col>
                    <Col className='mainCol l5'>
                        <PlayerBoard shipsPosition={shipsPosition} blockedDragging={blockedDragging}
                                     playerBoardCellStatus={playerBoardCellStatus}/>
                    </Col>
                </Row>
            </div>
        );
    }


}

export default App;

