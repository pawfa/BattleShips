import React, {Component} from 'react';
import './App.css';
import {sendShipCoord, getSocket, sendShotCoord} from './api';
import Granim from 'granim';
import {Col, Row} from 'react-materialize';
import OpponentBoard from "./components/OpponentBoard/OpponentBoard";
import PlayerBoard from "./components/PlayerBoard/PlayerBoard";
import {observe} from "./Game";

class App extends Component {

    socket;
    opponentBoard = [];
    myBoard = [];

    constructor(props) {
        super(props);
        this.state = {};
        // this.state = {
        //     myBoard: [],
        //     opponentBoard: []
        // };
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

    componentWillUnmount() {
        this.unobserve()
    }

    componentDidMount() {

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
        /*
                        this.socket.on('emptyBoard', (data) => {
                            this.setState({
                                myBoard: data.emptyPlayerBoard,
                                opponentBoard: data.emptyOpponentBoard
                            });
                        });

                                        this.socket.on('opponentBoard', (data) => {
                                            const tmpBoard = this.state.opponentBoard;
                                            tmpBoard[data.msg[0]][data.msg[1]] = data.msg[2];
                                            this.setState({
                                                opponentBoard: tmpBoard
                                            });
                                        });

                                        this.socket.on('putShip', (data) => {
                                            console.log(data.msg);
                                            this.setState({
                                                myBoard: data.msg
                                            });
                                        });
                                        this.socket.on('opponentDisconnected', () => {
                                            console.log("disconnected opponent");
                                            this.socket.disconnect();
                                            alert('Opponent disconnected');
                                        });
                                */
    }

    render() {
        const {shipsPosition} = this.state;
        return (
            <div className="App">
                <Row className="mainRow">
                    {/*<Col className='mainCol l6'>*/}
                        {/*<OpponentBoard board={this.state.opponentBoard} shot={this.shot}/>*/}
                    {/*</Col>*/}
                    {/*<PlayerBoard shipPosition={shipPosition} />*/}
                    <Col className='mainCol l12'>
                        <PlayerBoard shipsPosition={shipsPosition}/>
                    </Col>
                </Row>

            </div>
        );
    }


}

export default App;

